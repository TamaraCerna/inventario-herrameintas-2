package Backend.client_microservice.entity;

import Backend.client_microservice.entity.StateClient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "client_name", nullable = false, length = 100)
    private String clientName;

    @Column(name = "client_rut", nullable = false, unique = true, length = 20)
    private String clientRut;

    @Column(name = "client_phone", length = 20)
    private String clientPhone;

    @Column(name = "client_email", nullable = false, unique = true, length = 150)
    private String clientEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "client_state", nullable = false, length = 20)
    private StateClient clientState;

}

