package Backend.report_microservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "report")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant createdAt;

    private String createdBy;

    // opcional: filtros usados para generar el reporte (texto/json)
    @Lob
    private String filtersJson;
}
