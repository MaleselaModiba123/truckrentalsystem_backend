package za.ac.cput.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.*;
import za.ac.cput.repository.BranchRepository;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.RentTruckRepository;
import za.ac.cput.repository.TruckRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RentTruckService implements IRentTruckService {

    @Override
    public RentTruck create(RentTruck rentTruck) {
        return null;
    }

    @Override
    public RentTruck update(RentTruck rentTruck) {
        return rentTruckRepository.save(rentTruck);
    }

    @Override
    public void delete(Integer integer) {

    }

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
                                     int customerId, String truckVin, int pickUpBranchId, int dropOffBranchId, RentalStatus status) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid customer ID"));
        // Check if the customer has any unreturned rentals
        if (rentTruckRepository.existsByCustomerIDAndIsReturnedFalseAndStatus(customer, RentalStatus.ACTIVE)) {
            throw new IllegalStateException("Customer has an unreturned rental with ACTIVE status. Please return it before renting another truck.");
        }
        Truck truck = truckRepository.findById(truckVin)
                .orElseThrow(() -> new IllegalArgumentException("Invalid truck VIN"));
        Branch pickUpBranch = branchRepository.findById(pickUpBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid pickup branch ID"));
        Branch dropOffBranch = branchRepository.findById(dropOffBranchId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid dropoff branch ID"));

        if (!truck.isAvailability()) {
            throw new IllegalStateException("Truck is not available for rent");
        }
        // Check for discount
        customer.incrementRentalCount();
        if (customer.getRentalCount() % 5 == 0) {
            totalCost *= 0.90; // Apply 10% discount
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
                .setStatus(RentalStatus.ACTIVE)
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
    @Transactional
    public List<RentTruck> getRentalsByCustomerId(int customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        // Fetching rentals associated with the customer
        return rentTruckRepository.findByCustomerID(customer);
    }

    @Transactional
    public List<RentTruck> getRentalsByCustomerEmail(String email) {
        Customer customer = customerRepository.findByEmail(email);

        if (customer == null) {
            throw new IllegalArgumentException("Customer not found with email: " + email);
        }

        // Fetching rentals associated with the customer
        return rentTruckRepository.findByCustomerID(customer);
    }
    @Transactional
    public RentTruck markAsReturned(int rentId) {
        RentTruck rentTruck = rentTruckRepository.findById(rentId)
                .orElseThrow(() -> new EntityNotFoundException("Rent truck not found"));
        System.out.println("Marking rentTruck as returned: " + rentTruck);
        if (rentTruck.isReturned()) {
            throw new IllegalStateException("Truck is already marked as returned");
        }

        // Mark the truck as returned
        RentTruck updatedRentTruck = new RentTruck.Builder()
                .copy(rentTruck)
                .setReturned(true)
                .setStatus(RentalStatus.COMPLETED)
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

        @Override
    public List<RentTruck> getAll() {
        return rentTruckRepository.findAll();
    }

    @Override
    public RentTruck read(Integer integer) {
        return rentTruckRepository.findById(integer)
                .orElseThrow(() -> new EntityNotFoundException("RentTruck not found"));
    }
}
