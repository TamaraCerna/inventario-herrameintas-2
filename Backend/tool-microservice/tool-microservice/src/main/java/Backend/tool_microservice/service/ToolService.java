package Backend.tool_microservice.service;

import Backend.tool_microservice.entity.ToolEntity;
import Backend.tool_microservice.entity.State;
import Backend.tool_microservice.entity.StateTool;
import Backend.tool_microservice.repository.ToolRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class ToolService {

    @Autowired private ToolRepository toolRepository;
    @Autowired private RestTemplate restTemplate;

    // Idealmente en application.yml (lo dejo así para que compile y pruebes)
    private final String STOCK_SERVICE = "http://localhost:8082";

    // RF1.1 Crear nueva herramienta
    @Transactional
    public ToolEntity registerNewTool(String nameTool,
                                      StateTool categoryTool,
                                      int replacementValueTool,
                                      int userId) {

        if (nameTool == null || nameTool.isBlank() || categoryTool == null || replacementValueTool <= 0) {
            throw new IllegalArgumentException("Datos inválidos");
        }

        ToolEntity tool = new ToolEntity();
        tool.setNameTool(nameTool);
        tool.setCategoryTool(categoryTool);          // enum
        tool.setInitialStateTool(State.Disponible);  // enum
        tool.setReplacementValueTool(replacementValueTool);

        tool = toolRepository.save(tool);

        // Stock service (INC)
        String incStockUrl = UriComponentsBuilder
                .fromUriString(STOCK_SERVICE + "/stock/increase")
                .queryParam("category", tool.getCategoryTool().name())
                .queryParam("amount", 1)
                .build()
                .toUriString();

        restTemplate.postForEntity(incStockUrl, null, Void.class);

        return tool;
    }

    // RF1.2 Dar de baja herramienta
    @Transactional
    public void deleteToolById(int id) {
        ToolEntity tool = toolRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Herramienta no encontrada con id: " + id));

        String decStockUrl = UriComponentsBuilder
                .fromUriString(STOCK_SERVICE + "/stock/decrease")
                .queryParam("category", tool.getCategoryTool().name())
                .queryParam("amount", 1)
                .build()
                .toUriString();

        restTemplate.postForEntity(decStockUrl, null, Void.class);

        toolRepository.delete(tool);
    }

    public List<ToolEntity> findAll() {
        return toolRepository.findAll();
    }
}



