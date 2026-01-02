package Backend.kardex_microservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "kardex")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class KardexEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "kardex_id")
    private Long kardexId;

    @Enumerated(EnumType.STRING)
    @Column(name = "kardex_move", nullable = false, length = 30)
    private Move kardexName;  // Préstamo / Devolución / etc.

    @Column(name = "kardex_date", nullable = false)
    private LocalDate kardexDate;

    // ✅ En microservicios: solo IDs, sin @ManyToOne
    @Column(name = "tool_id")
    private Long toolId;     // puede ser null según tu caso

    @Column(name = "user_id")
    private Long userId;     // puede ser null

    @Column(name = "client_id")
    private Long clientId;   // puede ser null

    @Column(name = "kardex_registered_money", nullable = false)
    private Integer kardexRegisteredMoney; // 0 si no aplica
}
