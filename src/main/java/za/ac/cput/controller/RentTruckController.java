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

    @GetMapping("/read/{rentTruckID}")
    public ResponseEntity<RentTruck> read(@PathVariable int rentTruckID) {
        Optional<RentTruck> rentTruck = rentTruckService.getRentTruckById(rentTruckID);
        return rentTruck.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/delete/{rentTruckID}")
    public ResponseEntity<Void> delete(@PathVariable int rentTruckID) {
        try {
            rentTruckService.deleteRentTruck(rentTruckID);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/update/{rentTruckID}")
    public ResponseEntity<RentTruck> update(@PathVariable int rentTruckID, @RequestBody RentTruckRequest request) {
        try {
            RentTruck updatedRentTruck = rentTruckService.updateRentTruck(
                    rentTruckID,
                    request.getRentDate(),
                    request.getReturnDate(),
                    request.getTotalCost(),
                    request.isPaymentMade(),
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

}

