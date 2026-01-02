package com.example.demo.dto;

import com.example.demo.entity.enums.StateLoan;
import java.time.LocalDate;

public class LoanReportItemDTO {

    private Long loanId;
    private String clientName;
    private String toolName;
    private StateLoan loanState;
    private LocalDate loanDateInit;
    private LocalDate loanDateFinish;
    private String estadoDetalle; // Vigente / Atrasado
}







