public record LoanReportItemDTO(
        Long loanId,
        String clientName,
        String toolName,
        String loanState,
        LocalDate loanDateInit,
        LocalDate loanDateFinish,
        String estadoDetalle
) {}