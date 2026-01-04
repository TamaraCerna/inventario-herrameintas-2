package Backend.tool_microservice.controller;

import Backend.tool_microservice.entity.ToolEntity;
import Backend.tool_microservice.entity.StateTool;
import Backend.tool_microservice.service.ToolService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tools")
@CrossOrigin(origins = "http://localhost:5173")
public class ToolController {

    @Autowired
    private ToolService toolService;

    // Obtener todas las herramientas
    @GetMapping
    public List<ToolEntity> getAllTools() {
        return toolService.findAll();
    }

    // RF1.1 Registrar herramienta
    @PostMapping("/register")
    public ResponseEntity<ToolEntity> registerTool(
            @RequestParam String nameTool,
            @RequestParam StateTool categoryTool,
            @RequestParam int replacementValueTool,
            @RequestParam int userId) {

        ToolEntity tool = toolService.registerNewTool(
                nameTool,
                categoryTool,
                replacementValueTool,
                userId
        );

        return ResponseEntity.ok(tool);
    }

    // RF1.2 Eliminar herramienta (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable int id) {
        toolService.deleteToolById(id);
        return ResponseEntity.noContent().build();
    }
}