package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Mechanic;


/**
 * MechanicRepository.java
 * This is the repository interface
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 16 May 2024
 */
@Repository
public interface MechanicRepository extends JpaRepository<Mechanic,String> {
}