package Backend.user_microservice.controller;

import Backend.user_microservice.entity.UserEntity;
import Backend.user_microservice.entity.Roler;
import Backend.user_microservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // RF7.1 - Registrar usuario (acceso libre)
    record UserResponse(long id, String name, String email, Roler role) {}

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password) {

        UserEntity user = userService.registerUser(name, email, password);
        return ResponseEntity.ok(new UserResponse(
                user.getUserId(),
                user.getUserName(),
                user.getUserEmail(),
                user.getUserType()
        ));
    }

    // RF7.2 - Asignar rol (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role")
    public ResponseEntity<String> assignRole(
            @PathVariable long id,
            @RequestParam Roler role) {

        userService.assignRole(id, role);
        return ResponseEntity.ok("✅ Rol asignado correctamente.");
    }

    // RF7.3 - Verificar rol de usuario (ADMIN o USER)
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}/check")
    public ResponseEntity<Boolean> checkUserRole(@PathVariable long id) {
        UserEntity user = userService.getUserById(id);
        return ResponseEntity.ok(userService.isAdmin(user));
    }

    // RF7.4 - Login (si lo sigues usando)
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String name,
            @RequestParam String password) {

        return userService.login(name, password)
                .<ResponseEntity<?>>map(user ->
                        ResponseEntity.ok(new LoginResponse(
                                user.getUserId(),
                                user.getUserName(),
                                user.getUserEmail()
                        )))
                .orElse(ResponseEntity.badRequest().body("Usuario o contraseña incorrectos."));

    }

    record LoginResponse(long id, String name, String email) {}
}
