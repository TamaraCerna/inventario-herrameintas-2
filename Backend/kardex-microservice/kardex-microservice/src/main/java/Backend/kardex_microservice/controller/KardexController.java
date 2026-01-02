package Backend.kardex_microservice.controller;

import Backend.kardex_microservice.entity.KardexEntity;
import Backend.kardex_microservice.entity.Move;
import Backend.kardex_microservice.service.KardexService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/kardex")
public class KardexController {

    private final KardexService kardexService;

    public KardexController(KardexService kardexService) {
        this.kardexService = kardexService;
    }

    // ✅ RF5.1 Registrar movimiento (lo llamarán loan-service / tool-service)
    @PostMapping
    public ResponseEntity<KardexEntity> register(@RequestBody KardexRequest request) {
        KardexEntity saved = kardexService.registerMovement(
                request.kardexName(),
                request.kardexDate(),
                request.toolId(),
                request.userId(),
                request.clientId(),
                request.kardexRegisteredMoney()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ RF5.2 Historial por herramienta (ya NO buscamos ToolEntity)
    @GetMapping("/history/{toolId}")
    public ResponseEntity<List<KardexEntity>> getToolHistory(@PathVariable Long toolId) {
        List<KardexEntity> history = kardexService.getHistoryByTool(toolId);
        return ResponseEntity.ok(history);
    }

    // ✅ RF5.3 Listado por rango de fechas
    @GetMapping("/search")
    public ResponseEntity<List<KardexEntity>> searchKardex(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate init,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        List<KardexEntity> result = kardexService.getHistoryByDateRange(init, end);
        return ResponseEntity.ok(result);
    }

    // (Opcional útil) Historial por cliente
    @GetMapping("/history/client/{clientId}")
    public ResponseEntity<List<KardexEntity>> getClientHistory(@PathVariable Long clientId) {
        return ResponseEntity.ok(kardexService.getHistoryByClient(clientId));
    }

    // ✅ Request DTO interno del microservicio (no es entity)
    public record KardexRequest(
            Move kardexName,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate kardexDate,
            Long toolId,
            Long userId,
            Long clientId,
            Integer kardexRegisteredMoney
    ) {}
}
