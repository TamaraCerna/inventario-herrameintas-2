package Backend.report_microservice.repository;

import Backend.report_microservice.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<ReportEntity, Long> {}

