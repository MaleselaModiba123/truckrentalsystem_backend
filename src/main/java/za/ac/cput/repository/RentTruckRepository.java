package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.RentalStatus;

import java.util.List;

@Repository
public interface RentTruckRepository extends JpaRepository<RentTruck, Integer> {
    List<RentTruck> findByCustomerID(Customer customerID);

    List<RentTruck> findByIsReturnedFalse();

    boolean existsByCustomerIDAndIsReturnedFalseAndStatus(Customer customer, RentalStatus status);
}
