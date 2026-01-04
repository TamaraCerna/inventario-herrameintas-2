package Backend.tool_microservice.entity;

import Backend.tool_microservice.entity.State;
import Backend.tool_microservice.entity.StateTool;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tools")
public class ToolEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tool")
    private Integer idTool;

    @Column(name = "name_tool", nullable = false)
    private String nameTool;

    @Enumerated(EnumType.STRING)
    @Column(name = "category_tool", nullable = false)
    private StateTool categoryTool;

    @Enumerated(EnumType.STRING)
    @Column(name = "initial_state_tool", nullable = false)
    private State initialStateTool;

    @Column(name = "replacement_value_tool", nullable = false)
    private Integer replacementValueTool;

    @Column(name = "stock_tool_id")
    private Integer stockToolId;
}

