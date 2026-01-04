package Backend.tool_microservice.repository;

import Backend.tool_microservice.entity.StockToolsEntity;
import Backend.tool_microservice.entity.StateTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockToolsRepository extends JpaRepository<StockToolsEntity, Integer> {

    Optional<StockToolsEntity> findById(Integer id);

    StockToolsEntity findByStockTool(StateTool stockTool);

    // 👇 OJO: este ranking depende de LoanEntity. Solo déjalo si LoanEntity existe en ESTE microservicio.
}


