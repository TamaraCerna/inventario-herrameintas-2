package Backend.client_microservice.service;

import Backend.client_microservice.DTO.ClientCreateRequest;
import Backend.client_microservice.entity.ClientEntity;
import Backend.client_microservice.entity.StateClient;
import Backend.client_microservice.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final RestTemplate restTemplate;

    public ClientService(ClientRepository clientRepository, RestTemplate restTemplate) {
        this.clientRepository = clientRepository;
        this.restTemplate = restTemplate;
    }

    @Transactional
    public ClientEntity create(ClientCreateRequest req) {
        // Evitar duplicados por RUT o email
        clientRepository.findByClientRut(req.clientRut()).ifPresent(c -> {
            throw new IllegalArgumentException("Ya existe un cliente con ese RUT");
        });
        clientRepository.findByClientEmail(req.clientEmail()).ifPresent(c -> {
            throw new IllegalArgumentException("Ya existe un cliente con ese email");
        });

        ClientEntity client = new ClientEntity();
        client.setClientName(req.clientName());
        client.setClientRut(req.clientRut());
        client.setClientPhone(req.clientPhone());
        client.setClientEmail(req.clientEmail());
        client.setClientState(StateClient.ACTIVO);

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

    /**
     * Ejemplo de llamado a otro microservicio con RestTemplate + Eureka:
     * (ajusta el endpoint según tu loan-service real)
     */
    @Transactional(readOnly = true)
    public Object getLoansByClientId(Long clientId) {
        return restTemplate.getForObject(
                "http://loan-service/loans/client/" + clientId,
                Object.class
        );
    }
}

