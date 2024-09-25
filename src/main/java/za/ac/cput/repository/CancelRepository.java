package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Cancellation;

@Repository
public interface CancelRepository extends JpaRepository<Cancellation,Integer> {
}
