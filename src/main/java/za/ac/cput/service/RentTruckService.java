package za.ac.cput.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.Branch;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.Truck;
import za.ac.cput.repository.BranchRepository;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.RentTruckRepository;
import za.ac.cput.repository.TruckRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RentTruckService {

    private final RentTruckRepository rentTruckRepository;
    private final CustomerRepository customerRepository;
    private final TruckRepository truckRepository;
    private final BranchRepository branchRepository;

    @Autowired
    public RentTruckService(RentTruckRepository rentTruckRepository,
                            CustomerRepository customerRepository,
                            TruckRepository truckRepository,
                            BranchRepository branchRepository) {
        this.rentTruckRepository = rentTruckRepository;
        this.customerRepository = customerRepository;
        this.truckRepository = truckRepository;
        this.branchRepository = branchRepository;
    }

    @Transactional
    public RentTruck createRentTruck(LocalDate rentDate, LocalDate returnDate, double totalCost, boolean isPaymentMade, boolean isReturned,
                                     int customerId, String truckVin, int pickUpBranchId, int dropOffBranchId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid customer ID"));
        Truck truck = truckRepository.findById(truckVin)
                .orElseThrow(() -> new IllegalArgumentException("Invalid truck VIN"));
        Branch pickUpBranch = branchRepository.findById(pickUpBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid pickup branch ID"));
        Branch dropOffBranch = branchRepository.findById(dropOffBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid dropoff branch ID"));

        if (!truck.isAvailability()) {
            throw new IllegalStateException("Truck is not available for rent");
        }

        // Create RentTruck instance
        RentTruck rentTruck = new RentTruck.Builder()
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPaymentMade(isPaymentMade)
                .setReturned(isReturned)
                .setCustomerID(customer)
                .setVin(truck)
                .setPickUp(pickUpBranch)
                .setDropOff(dropOffBranch)
                .build();

        // Save RentTruck instance
        RentTruck savedRentTruck = rentTruckRepository.save(rentTruck);

        // Update truck availability
        Truck updatedTruck = new Truck.Builder()
                .copy(truck)
                .setAvailability(false)
                .build();
        truckRepository.save(updatedTruck);

        return savedRentTruck;
    }
    public Optional<RentTruck> getRentTruckById(int id) {
        return rentTruckRepository.findById(id);
    }


    public List<RentTruck> getAllRentTrucks() {
        return rentTruckRepository.findAll();
    }
    @Transactional
    public RentTruck updateRentTruck(int id, LocalDate rentDate, LocalDate returnDate, double totalCost, boolean isPaymentMade, boolean isReturned,
                                     int customerId, String truckVin, int pickUpBranchId, int dropOffBranchId) {
        RentTruck existingRentTruck = rentTruckRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("RentTruck not found"));

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid customer ID"));
        Truck truck = truckRepository.findById(truckVin)
                .orElseThrow(() -> new IllegalArgumentException("Invalid truck VIN"));
        Branch pickUpBranch = branchRepository.findById(pickUpBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid pickup branch ID"));
        Branch dropOffBranch = branchRepository.findById(dropOffBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid dropoff branch ID"));

        if (existingRentTruck.isReturned()) {
            throw new IllegalStateException("Cannot update a returned rental");
        }

        // Update RentTruck instance
        RentTruck updatedRentTruck = new RentTruck.Builder()
                .copy(existingRentTruck)
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPaymentMade(isPaymentMade)
                .setReturned(isReturned)
                .setCustomerID(customer)
                .setVin(truck)
                .setPickUp(pickUpBranch)
                .setDropOff(dropOffBranch)
                .build();

        return rentTruckRepository.save(updatedRentTruck);
    }

    @Transactional
    public void deleteRentTruck(int id) {
        RentTruck rentTruck = rentTruckRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("RentTruck not found"));

        if (!rentTruck.isReturned()) {
            throw new IllegalStateException("Cannot delete a non-returned rental");
        }

        rentTruckRepository.deleteById(id);

        // Make the truck available again
        Truck truck = rentTruck.getVin();
        Truck updatedTruck = new Truck.Builder()
                .copy(truck)
                .setAvailability(true)
                .build();
        truckRepository.save(updatedTruck);
    }

    public List<RentTruck> getRentalsByCustomerId(int customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return rentTruckRepository.findByCustomerID(customer);
    }

    @Transactional
    public RentTruck markAsReturned(int rentId) {
        RentTruck rentTruck = rentTruckRepository.findById(rentId)
                .orElseThrow(() -> new EntityNotFoundException("Rent truck not found"));

        if (rentTruck.isReturned()) {
            throw new IllegalStateException("Truck is already marked as returned");
        }

        // Mark the truck as returned
        RentTruck updatedRentTruck = new RentTruck.Builder()
                .copy(rentTruck)
                .setReturned(true)
                .build();
        RentTruck savedRentTruck = rentTruckRepository.save(updatedRentTruck);

        // Make the truck available again
        Truck truck = rentTruck.getVin();
        Truck updatedTruck = new Truck.Builder()
                .copy(truck)
                .setAvailability(true)
                .build();
        truckRepository.save(updatedTruck);

        return savedRentTruck;
    }

    public List<RentTruck> getAvailableRentTrucks() {
        return rentTruckRepository.findByIsReturnedFalse();
    }
}
