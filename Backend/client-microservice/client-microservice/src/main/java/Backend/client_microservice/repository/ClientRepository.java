package Backend.client_miroservice.repository;

import Backend.client_miroservice.entity.ClientEntity;
import Backend.client_miroservice.entity.StateClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<ClientEntity, Long> {

    Optional<ClientEntity> findByClientRut(String clientRut);

    List<ClientEntity> findByClientState(StateClient state);
}
