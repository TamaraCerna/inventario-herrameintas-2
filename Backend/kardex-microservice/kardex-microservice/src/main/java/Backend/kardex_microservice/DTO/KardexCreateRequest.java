package Backend.kardex_microservice.dto;

import Backend.kardex_microservice.entity.Move;
import java.time.LocalDate;

public record KardexCreateRequest(
        Move kardexName,
        LocalDate kardexDate,
        Long toolId,
        Long userId,     // puede ser null
        Long clientId,   // puede ser null
        Integer kardexRegisteredMoney
) {}
