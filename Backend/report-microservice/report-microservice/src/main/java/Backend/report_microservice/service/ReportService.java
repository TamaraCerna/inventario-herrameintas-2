package Backend.report_microservice.service;

import Backend.report_microservice.entity.ReportEntity;
import Backend.report_microservice.DTO.*;
import Backend.report_microservice.repository.ReportRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final RestTemplate restTemplate;     // ideal: @LoadBalanced con Eureka
    private final ReportRepository reportRepository;
    private final ObjectMapper objectMapper;

    // RF6.1: genera snapshot y lo guarda en ReportEntity.filtersJson
    public ReportEntity createStateLoanReport(String state, String createdBy) {

        LoanDTO[] loans = restTemplate.getForObject(
                "http://loan-service/loans?state=" + state,
                LoanDTO[].class
        );

        LocalDate today = LocalDate.now();

        List<LoanReportItemDTO> items = (loans == null) ? List.of()
                : Arrays.stream(loans).map(loan -> {

            ClientDTO client = restTemplate.getForObject(
                    "http://client-service/clients/" + loan.clientId(),
                    ClientDTO.class
            );

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

        ReportSnapshotDTO snapshot = new ReportSnapshotDTO(
                "RF6_1_STATE_LOAN",
                "state=" + state,
                Instant.now(),
                items
        );

        String json;
        try {
            json = objectMapper.writeValueAsString(snapshot);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("No se pudo serializar el snapshot del reporte", e);
        }

        ReportEntity report = ReportEntity.builder()
                .createdAt(Instant.now())
                .createdBy(createdBy)
                .filtersJson(json)
                .build();

        return reportRepository.save(report);
    }

    // Leer el reporte persistido y devolver el snapshot parseado
    public ReportSnapshotDTO getReportSnapshot(Long reportId) {
        ReportEntity report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado: " + reportId));

        try {
            return objectMapper.readValue(report.getFiltersJson(), ReportSnapshotDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("filtersJson no corresponde a ReportSnapshotDTO", e);
        }
    }

    // RF6.2: en vivo
    public List<ClientDTO> listOverdueCustomers() {
        ClientDTO[] clients = restTemplate.getForObject(
                "http://client-service/clients?state=Restringido",
                ClientDTO[].class
        );
        return clients == null ? List.of() : Arrays.asList(clients);
    }

    // RF6.3: en vivo (si tu endpoint devuelve Object[])
    public Object[] rankingTools() {
        return restTemplate.getForObject(
                "http://tool-service/tools/ranking",
                Object[].class
        );
    }
}


