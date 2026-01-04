package Backend.report_microservice.DTO;

import java.time.Instant;
import java.util.List;

public record ReportSnapshotDTO(
        String type,          // "RF6_1_STATE_LOAN"
        String params,        // "state=Activo"
        Instant generatedAt,
        List<LoanReportItemDTO> items
) {}








