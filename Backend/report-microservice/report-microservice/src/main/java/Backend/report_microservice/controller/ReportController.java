package Backend.report_microservice.controller;

import Backend.report_microservice.entity.ReportEntity;
import Backend.report_microservice.DTO.ClientDTO;
import Backend.report_microservice.DTO.ReportSnapshotDTO;
import Backend.report_microservice.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // RF6.1 (PERSISTE)
    // POST /reports/loans?state=Activo&createdBy=admin
    @PostMapping("/loans")
    public ResponseEntity<ReportEntity> createLoansReport(
            @RequestParam(defaultValue = "Activo") String state,
            @RequestParam(defaultValue = "system") String createdBy
    ) {
        return ResponseEntity.ok(reportService.createStateLoanReport(state, createdBy));
    }

    // GET /reports/{id} -> devuelve el snapshot guardado
    @GetMapping("/{id}")
    public ResponseEntity<ReportSnapshotDTO> getReport(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getReportSnapshot(id));
    }

    // RF6.2
    @GetMapping("/overdue-customers")
    public ResponseEntity<List<ClientDTO>> getOverdueCustomers() {
        return ResponseEntity.ok(reportService.listOverdueCustomers());
    }

    // RF6.3
    @GetMapping("/ranking-tools")
    public ResponseEntity<Object[]> getRankingTools() {
        return ResponseEntity.ok(reportService.rankingTools());
    }
}

