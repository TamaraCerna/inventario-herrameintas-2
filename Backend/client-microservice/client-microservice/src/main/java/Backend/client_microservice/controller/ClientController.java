package Backend.client_miroservice.controller;

import Backend.client_miroservice.DTO.*;
import Backend.client_miroservice.entity.ClientEntity;
import Backend.client_miroservice.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClientResponse create(@RequestBody @Valid ClientCreateRequest req) {
        ClientEntity c = clientService.create(req);
        return toResponse(c);
    }

    @GetMapping("/{id}")
    public ClientResponse getById(@PathVariable Long id) {
        return toResponse(clientService.getById(id));
    }

    @PutMapping("/{id}/state")
    public ClientResponse updateState(@PathVariable Long id,
                                      @RequestBody @Valid UpdateClientStateRequest req) {
        return toResponse(clientService.updateState(id, req.state()));
    }

    private ClientResponse toResponse(ClientEntity c) {
        return new ClientResponse(
                c.getClientId(),
                c.getClientName(),
                c.getClientRut(),
                c.getClientPhone(),
                c.getClientEmail(),
                c.getClientState().name()
        );
    }
}

