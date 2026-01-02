package Backend.user_microservice.entity;

import Backend.user_microservice.entity.Roler;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 100)
    private String userName;

    @Column(nullable = false, unique = true, length = 150)
    private String userEmail;

    @Column(nullable = false, length = 255)
    private String userPassword;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Roler userType;
}

