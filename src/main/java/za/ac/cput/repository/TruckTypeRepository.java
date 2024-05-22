package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.TruckType;

/**
 * TruckTypeRepository.java
 * This is the repository interface
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@Repository
public interface TruckTypeRepository extends JpaRepository<TruckType, Integer> {
}
