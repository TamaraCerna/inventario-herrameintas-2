package Backend.user_microservice.service;

import Backend.user_microservice.entity.Roler;
import Backend.user_microservice.entity.UserEntity;
import Backend.user_microservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // RF7.1 Registrar usuarios del sistema con credenciales de acceso
    public UserEntity registerUser(String name, String email, String password) {

        // (mínimo) evitar duplicados
        userRepository.findByUserName(name).ifPresent(u -> {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        });
        userRepository.findByUserEmail(email).ifPresent(u -> {
            throw new IllegalArgumentException("El email ya está registrado");
        });

        UserEntity user = new UserEntity();
        user.setUserName(name);
        user.setUserEmail(email);
        user.setUserPassword(password); // ⚠️ en prod sería hash
        user.setUserType(Roler.USER);   // por defecto

        return userRepository.save(user);
    }

    // RF7.2 Asignar roles (solo admin debería poder hacerlo: validación se hace en controller o auth)
    public UserEntity assignRole(Long userId, Roler role) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + userId));

        user.setUserType(role);
        return userRepository.save(user);
    }

    // RF7.4 Login (devuelve el usuario si credenciales correctas)
    public Optional<UserEntity> login(String name, String password) {
        return userRepository.findByUserNameAndUserPassword(name, password);
    }

    // Utilidad
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // RF7.3 Validar permisos según rol
    public boolean isAdmin(UserEntity user) {
        return user != null && user.getUserType() == Roler.ADMIN;
    }
}
