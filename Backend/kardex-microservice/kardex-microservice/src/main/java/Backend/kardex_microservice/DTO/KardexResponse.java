package Backend.kardex_microservice.dto;

import Backend.kardex_microservice.entity.Move;
import java.time.LocalDate;

public record KardexResponse(
        Long kardexId,
        Move kardexName,
        LocalDate kardexDate,
        Long toolId,
        Long userId,
        Long clientId,
        Integer kardexRegisteredMoney
) {}
