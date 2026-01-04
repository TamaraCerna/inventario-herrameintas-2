package Backend.tool_microservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class KardexMoveDTO {
    private String move;
    private LocalDate date;
    private Integer toolId;
    private Integer userId;
    private Integer replacementValue;
}
