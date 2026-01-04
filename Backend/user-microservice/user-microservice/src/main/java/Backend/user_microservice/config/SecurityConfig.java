package Backend.user_microservice.config;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    /**
     * ✅ CHAIN #1 (prioridad alta): Actuator SIN JWT
     * Esto evita que /actuator/** quede protegido por el resource server.
     *
     * Si quieres exponer SOLO health/info (y no todo actuator),
     * dime y lo ajusto.
     */
    @Bean
    @Order(1)
    public SecurityFilterChain actuatorChain(HttpSecurity http) throws Exception {
        return http
                .securityMatcher(EndpointRequest.toAnyEndpoint())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .build();
    }

    /**
     * ✅ CHAIN #2: Resto de la app con JWT (Keycloak)
     */
    @Bean
    @Order(2)
    public SecurityFilterChain appChain(HttpSecurity http) throws Exception {

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(keycloakRolesConverter("sisgr-back"));

        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Públicos
                        .requestMatchers("/users/login", "/users/register").permitAll()
                        .requestMatchers("/public/**").permitAll()

                        // Por rol
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")

                        // Todo lo demás con JWT
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
                )
                .build();
    }

    /**
     * Lee roles desde Keycloak:
     * resource_access.{clientId}.roles
     * y los transforma a ROLE_X para que funcione hasRole('X')
     */
    private Converter<Jwt, Collection<GrantedAuthority>> keycloakRolesConverter(String clientId) {
        return jwt -> {
            Collection<GrantedAuthority> authorities = new ArrayList<>();

            Object resourceAccessObj = jwt.getClaim("resource_access");
            if (!(resourceAccessObj instanceof Map<?, ?> resourceAccess)) {
                return authorities;
            }

            Object clientObj = resourceAccess.get(clientId);
            if (!(clientObj instanceof Map<?, ?> clientMap)) {
                return authorities;
            }

            Object rolesObj = clientMap.get("roles");
            if (!(rolesObj instanceof Collection<?> roles)) {
                return authorities;
            }

            for (Object role : roles) {
                if (role != null) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString()));
                }
            }

            return authorities;
        };
    }
}


