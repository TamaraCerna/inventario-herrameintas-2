package Backend.report_microservice.DTO;

import java.time.LocalDate;

public record LoanReportItemDTO(
        Long loanId,
        String clientName,
        String toolName,
        String loanState,
        LocalDate loanDateInit,
        LocalDate loanDateFinish,
        String detalle
) {}
