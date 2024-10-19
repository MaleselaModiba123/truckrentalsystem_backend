package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.TruckType;

@Repository
public interface TruckTypeRepository extends JpaRepository<TruckType, Integer> {
}
