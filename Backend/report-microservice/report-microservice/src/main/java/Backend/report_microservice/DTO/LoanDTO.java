package Backend.report_microservice.DTO;

import java.time.LocalDate;

public record LoanDTO(
        Long loanId,
        Long clientId,
        Long toolId,
        String loanState,
        LocalDate loanDateInit,
        LocalDate loanDateFinish
) {}
