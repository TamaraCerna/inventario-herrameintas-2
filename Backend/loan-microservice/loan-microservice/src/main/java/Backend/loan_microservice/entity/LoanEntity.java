package Backend.loan_microservice.entity;

import Backend.loan_microservice.entity.enums.StateLoan;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "loans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "loan_id")
    private Long loanId;

    @Column(name = "client_id", nullable = false)
    private Long clientId;      // SOLO ID

    @Column(name = "tool_id", nullable = false)
    private Long toolId;        // SOLO ID

    @Enumerated(EnumType.STRING)
    @Column(name = "loan_state", nullable = false, length = 20)
    private StateLoan loanState;

    @Column(name = "loan_date_init", nullable = false)
    private LocalDate loanDateInit;

    @Column(name = "loan_date_finish", nullable = false)
    private LocalDate loanDateFinish;
}


