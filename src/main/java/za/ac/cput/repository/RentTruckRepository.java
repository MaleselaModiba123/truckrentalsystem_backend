package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.RentTruck;

/**
 * RentTruckRepository.java
 * This is the iRepository class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 03 May 2024
 */

@Repository
public interface RentTruckRepository extends JpaRepository<RentTruck, Integer> {


}
