package com.example.demo.service;

import com.example.demo.entity.ClientEntity;
import com.example.demo.entity.LoanEntity;
import com.example.demo.entity.ReportDTO;
import com.example.demo.entity.StockToolsEntity;
import com.example.demo.entity.enums.StateClient;
import com.example.demo.entity.enums.StateLoan;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.LoanRepository;
import com.example.demo.repository.StockToolsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private RestTemplate restTemplate; // @LoadBalanced

    // RF6.1 préstamos activos y estado (vigente/atrasado)
    public List<LoanReportItemDTO> listStateLoan(String state) {

        // 1) pedir préstamos al loan-service
        LoanDTO[] loans = restTemplate.getForObject(
                "http://loan-service/loans?state=" + state,
                LoanDTO[].class
        );

        if (loans == null) return List.of();

        LocalDate today = LocalDate.now();

        return java.util.Arrays.stream(loans).map(loan -> {
            // 2) pedir nombre cliente a client-service
            ClientDTO client = restTemplate.getForObject(
                    "http://client-service/clients/" + loan.clientId(),
                    ClientDTO.class
            );

            // 3) pedir nombre herramienta a tool-service
            ToolDTO tool = restTemplate.getForObject(
                    "http://tool-service/tools/" + loan.toolId(),
                    ToolDTO.class
            );

            String detalle = loan.loanDateFinish().isBefore(today) ? "Atrasado" : "Vigente";

            return new LoanReportItemDTO(
                    loan.loanId(),
                    client != null ? client.clientName() : "N/A",
                    tool != null ? tool.toolName() : "N/A",
                    loan.loanState(),
                    loan.loanDateInit(),
                    loan.loanDateFinish(),
                    detalle
            );
        }).toList();
    }

    // RF6.2 listar clientes con atrasos (restringidos)
    public List<ClientDTO> listOverdueCustomers() {
        ClientDTO[] clients = restTemplate.getForObject(
                "http://client-service/clients?state=Restringido",
                ClientDTO[].class
        );
        return clients == null ? List.of() : java.util.Arrays.asList(clients);
    }

    // RF6.3 ranking herramientas (lo ideal es que tool-service entregue este ranking)
    public Object[] rankingTools() {
        return restTemplate.getForObject(
                "http://tool-service/tools/ranking",
                Object[].class
        );
    }
}
