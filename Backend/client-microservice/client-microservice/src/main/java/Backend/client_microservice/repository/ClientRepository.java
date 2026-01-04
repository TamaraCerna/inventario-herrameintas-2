package Backend.client_microservice.repository;

import Backend.client_microservice.entity.ClientEntity;
import Backend.client_microservice.entity.StateClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<ClientEntity, Long> {

    Optional<ClientEntity> findByClientRut(String clientRut);

    Optional<ClientEntity> findByClientEmail(String clientEmail);

    List<ClientEntity> findByClientState(StateClient state);
}
