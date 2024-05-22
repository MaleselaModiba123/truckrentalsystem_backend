package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Insurance;

/**
 * InsuranceRepository.java
 * This is the repository interface
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 17 May 2024
 */
@Repository
public interface InsuranceRepository extends JpaRepository<Insurance,Integer> {
}
