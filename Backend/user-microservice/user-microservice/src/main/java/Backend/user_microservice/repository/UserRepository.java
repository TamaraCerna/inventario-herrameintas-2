package Backend.user_microservice.repository;

import Backend.user_microservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUserName(String userName);

    Optional<UserEntity> findByUserEmail(String userEmail);

    Optional<UserEntity> findByUserNameAndUserPassword(String userName, String userPassword);
}
