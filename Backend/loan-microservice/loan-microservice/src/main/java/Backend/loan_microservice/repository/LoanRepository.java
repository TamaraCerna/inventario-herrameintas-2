package Backend.loan_microservice.repository;

import Backend.loan_microservice.entity.LoanEntity;
import Backend.loan_microservice.entity.StateLoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

    List<LoanEntity> findByLoanState(StateLoan state);

    List<LoanEntity> findByClientIdAndLoanState(Long clientId, StateLoan loanState);

    List<LoanEntity> findByClientId(Long clientId);
}
