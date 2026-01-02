package Backend.loan_microservice.DTO;

import Backend.loan_microservice.entity.enums.StateLoan;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {

    private Long loanId;
    private String clientName;
    private String toolName;
    private StateLoan loanState;
    private LocalDate loanDateInit;
    private LocalDate loanDateFinish;

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getToolName() {
        return toolName;
    }

    public void setToolName(String toolName) {
        this.toolName = toolName;
    }

    public StateLoan getLoanState() {
        return loanState;
    }

    public void setLoanState(StateLoan loanState) {
        this.loanState = loanState;
    }

    public LocalDate getLoanDateInit() {
        return loanDateInit;
    }

    public void setLoanDateInit(LocalDate loanDateInit) {
        this.loanDateInit = loanDateInit;
    }

    public LocalDate getLoanDateFinish() {
        return loanDateFinish;
    }

    public void setLoanDateFinish(LocalDate loanDateFinish) {
        this.loanDateFinish = loanDateFinish;
    }
}
