package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.RentTruckRequest;
import za.ac.cput.service.RentTruckService;

import java.util.List;
import java.util.Optional;

/**
 * RentTruckController.java
 * This is the Controller class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 27 May 2024
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rentTruck")
public class RentTruckController {
    private final RentTruckService rentTruckService;

    @Autowired
    public RentTruckController(RentTruckService rentTruckService) {
        this.rentTruckService = rentTruckService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody RentTruckRequest request) {
        try {
            RentTruck rentTruck = rentTruckService.createRentTruck(
                    request.getRentDate(),
                    request.getReturnDate(),
                    request.getTotalCost(),
                    request.isPaymentMade(),
                    request.isReturned(),
                    request.getCustomerID(),
                    request.getVin(),
                    request.getPickUpBranchId(),
                    request.getDropOffBranchId()
            );
            return ResponseEntity.ok("RentTruck created successfully:" + rentTruck);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error creating RentTruck: " + e.getMessage());
        }
    }

    @GetMapping("/read/{rentId}")
    public ResponseEntity<RentTruck> read(@PathVariable int rentId) {
        Optional<RentTruck> rentTruck = rentTruckService.getRentTruckById(rentId);
        return rentTruck.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/delete/{rentId}")
    public ResponseEntity<Void> delete(@PathVariable int rentId) {
        try {
            rentTruckService.deleteRentTruck(rentId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/update/{rentId}")
    public ResponseEntity<RentTruck> update(@PathVariable int rentId, @RequestBody RentTruckRequest request) {
        try {
            RentTruck updatedRentTruck = rentTruckService.updateRentTruck(
                    rentId,
                    request.getRentDate(),
                    request.getReturnDate(),
                    request.getTotalCost(),
                    request.isPaymentMade(),
                    request.isReturned(),
                    request.getCustomerID(),
                    request.getVin(),
                    request.getPickUpBranchId(),
                    request.getDropOffBranchId()
            );
            return ResponseEntity.ok(updatedRentTruck);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<RentTruck>> getAll() {
        List<RentTruck> rentTrucks = rentTruckService.getAllRentTrucks();
        return ResponseEntity.ok(rentTrucks);
    }
    @GetMapping("/history/{customerID}")
    public ResponseEntity<List<RentTruck>> getRentalsByCustomerId(@PathVariable int customerID) {
        List<RentTruck> rentals = rentTruckService.getRentalsByCustomerId(customerID);
        return ResponseEntity.ok(rentals);
    }
    @PatchMapping("/markAsReturned/{rentId}")
    public ResponseEntity<?> markAsReturned(@PathVariable int rentId) {
        try {
            RentTruck updatedRentTruck = rentTruckService.markAsReturned(rentId);
            return ResponseEntity.ok(updatedRentTruck);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error marking rent truck as returned: " + e.getMessage());
        }
    }

    @GetMapping("/not returned")
    public ResponseEntity<List<RentTruck>> getAvailableTrucks() {
        List<RentTruck> availableTrucks = rentTruckService.getAvailableRentTrucks();
        return ResponseEntity.ok(availableTrucks);
    }

}

