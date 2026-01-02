package Backend.kardex_microservice.service;

import Backend.kardex_microservice.entity.KardexEntity;
import Backend.kardex_microservice.entity.Move;
import Backend.kardex_microservice.repository.KardexRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class KardexService {

    private final KardexRepository kardexRepository;

    public KardexService(KardexRepository kardexRepository) {
        this.kardexRepository = kardexRepository;
    }

    // RF5.1 Registrar automáticamente en el kardex cada movimiento
    public KardexEntity registerMovement(
            Move move,
            LocalDate date,
            Long toolId,
            Long userId,
            Long clientId,
            Integer registeredMoney
    ) {
        KardexEntity kardex = new KardexEntity();
        kardex.setKardexName(move);
        kardex.setKardexDate(date);
        kardex.setToolId(toolId);
        kardex.setUserId(userId);
        kardex.setClientId(clientId);
        kardex.setKardexRegisteredMoney(
                registeredMoney != null ? registeredMoney : 0
        );

        return kardexRepository.save(kardex);
    }

    // RF5.2 Consultar historial de movimientos por herramienta
    public List<KardexEntity> getHistoryByTool(Long toolId) {
        return kardexRepository.findByToolIdOrderByKardexDateAsc(toolId);
    }

    // RF5.3 Generar listado de movimientos por rango de fechas
    public List<KardexEntity> getHistoryByDateRange(LocalDate init, LocalDate end) {
        return kardexRepository
                .findByKardexDateBetweenOrderByKardexDateAsc(init, end);
    }

    // (opcional) historial por cliente
    public List<KardexEntity> getHistoryByClient(Long clientId) {
        return kardexRepository.findByClientIdOrderByKardexDateAsc(clientId);
    }
}
