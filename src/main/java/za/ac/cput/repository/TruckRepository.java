package za.ac.cput.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Truck;

import java.util.List;
import java.util.Optional;

@Repository
public  interface TruckRepository extends JpaRepository<Truck, String> {
    @Query("SELECT t FROM Truck t WHERE t.vin NOT IN (SELECT r.vin.vin FROM RentTruck r WHERE r.isReturned = false)")
    List<Truck> findAvailableTrucks();
    Optional<Truck> findByLicensePlate(String licensePlate);
}



