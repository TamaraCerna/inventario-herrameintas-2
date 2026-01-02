package Backend.client_miroservice.service;

import Backend.client_miroservice.DTO.ClientCreateRequest;
import Backend.client_miroservice.entity.ClientEntity;
import Backend.client_miroservice.entity.StateClient;
import Backend.client_miroservice.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@FeignClient(name = "client-service")
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping("/clients/{id}")

    ClientDTO getClientById(@PathVariable Long id);

    @Transactional
    public ClientEntity create(ClientCreateRequest req) {
        // evitar duplicados por RUT o email (opcional pero recomendado)
        clientRepository.findByClientRut(req.clientRut()).ifPresent(c -> {
            throw new IllegalArgumentException("Ya existe un cliente con ese RUT");
        });

        ClientEntity client = new ClientEntity();
        client.setClientName(req.clientName());
        client.setClientRut(req.clientRut());
        client.setClientPhone(req.clientPhone());
        client.setClientEmail(req.clientEmail());
        client.setClientState(StateClient.Activo);
        return clientRepository.save(client);
    }

    @Transactional(readOnly = true)
    public ClientEntity getById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
    }

    @Transactional
    public ClientEntity updateState(Long id, StateClient state) {
        ClientEntity client = getById(id);
        client.setClientState(state);
        return clientRepository.save(client);
    }
}
