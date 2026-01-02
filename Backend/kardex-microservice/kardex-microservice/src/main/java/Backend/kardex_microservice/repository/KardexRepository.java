package Backend.kardex_microservice.repository;

import Backend.kardex_microservice.entity.KardexEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface KardexRepository extends JpaRepository<KardexEntity, Long> {

    List<KardexEntity> findByKardexDateBetweenOrderByKardexDateAsc(LocalDate init, LocalDate end);

    List<KardexEntity> findByToolIdOrderByKardexDateAsc(Long toolId);

    List<KardexEntity> findByClientIdOrderByKardexDateAsc(Long clientId);
    List<KardexEntity> findByUserIdOrderByKardexDateAsc(Long userId);
}
