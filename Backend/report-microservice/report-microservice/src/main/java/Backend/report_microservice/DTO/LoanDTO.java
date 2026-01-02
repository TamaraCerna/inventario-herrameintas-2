public record LoanDTO(
        Long loanId,
        Long clientId,
        Long toolId,
        String loanState,
        LocalDate loanDateInit,
        LocalDate loanDateFinish
) {}