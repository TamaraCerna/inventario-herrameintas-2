package Backend.client_miroservice.entity;

import Backend.client_miroservice.StateClient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import java.util.List;

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

    @OneToMany(mappedBy = "loanClient", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanEntity> clientLoanActive;
}
