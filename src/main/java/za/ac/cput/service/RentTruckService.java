package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public RentTruck createRentTruck(LocalDate rentDate, LocalDate returnDate, double totalCost, boolean isPaymentMade,
                                     int customerId, String truckVin, int pickUpBranchId, int dropOffBranchId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        Optional<Truck> truck = truckRepository.findById(truckVin);
        Optional<Branch> pickUpBranch = branchRepository.findById(pickUpBranchId);
        Optional<Branch> dropOffBranch = branchRepository.findById(dropOffBranchId);

        if (customer.isEmpty() || truck.isEmpty() || pickUpBranch.isEmpty() || dropOffBranch.isEmpty()) {
            throw new IllegalArgumentException("Invalid data provided.");
        }

        RentTruck rentTruck = new RentTruck.Builder()
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPaymentMade(isPaymentMade)
                .setCustomerID(customer.get())
                .setVin(truck.get())
                .setPickUp(pickUpBranch.get())
                .setDropOff(dropOffBranch.get())
                .build();
        System.out.println("RentTruck before saving: " + rentTruck);
        RentTruck savedRentTruck = rentTruckRepository.save(rentTruck);
        System.out.println("Saved RentTruck: " + savedRentTruck);

        return savedRentTruck;

    }

    public Optional<RentTruck> getRentTruckById(int id) {
        return rentTruckRepository.findById(id);
    }


    public List<RentTruck> getAllRentTrucks() {
        return rentTruckRepository.findAll();
    }

    // Update Operation
    public RentTruck updateRentTruck(int id, LocalDate rentDate, LocalDate returnDate, double totalCost, boolean isPaymentMade,
                                     int customerId, String truckVin, int pickUpBranchId, int dropOffBranchId) {
        Optional<RentTruck> existingRentTruck = rentTruckRepository.findById(id);
        if (existingRentTruck.isEmpty()) {
            throw new IllegalArgumentException("RentTruck not found.");
        }

        RentTruck rentTruck = existingRentTruck.get();
        rentTruck = new RentTruck.Builder()
                .setRentId(rentTruck.getRentId()) // Keep the existing ID
                .setRentDate(rentDate)
                .setReturnDate(returnDate)
                .setTotalCost(totalCost)
                .setPaymentMade(isPaymentMade)
                .setCustomerID(customerRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Invalid customer ID")))
                .setVin(truckRepository.findById(truckVin).orElseThrow(() -> new IllegalArgumentException("Invalid truck VIN")))
                .setPickUp(branchRepository.findById(pickUpBranchId).orElseThrow(() -> new IllegalArgumentException("Invalid pickup branch ID")))
                .setDropOff(branchRepository.findById(dropOffBranchId).orElseThrow(() -> new IllegalArgumentException("Invalid dropoff branch ID")))
                .build();

        return rentTruckRepository.save(rentTruck);
    }


    public void deleteRentTruck(int id) {
        if (!rentTruckRepository.existsById(id)) {
            throw new IllegalArgumentException("RentTruck not found.");
        }
        rentTruckRepository.deleteById(id);
    }

    public List<RentTruck> getRentalsByCustomerId(int customerId) {
        // Fetch the customer entity
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        // Use the customer entity to fetch rentals
        return rentTruckRepository.findByCustomerID(customer);
    }
}
