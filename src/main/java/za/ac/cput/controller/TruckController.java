package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Truck;
import za.ac.cput.service.TruckService;

import java.io.IOException;
import java.util.List;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/truck")
public class TruckController {

    @Autowired
    private TruckService truckService;

    @PostMapping("/create")
    public ResponseEntity<Truck> createTruck(
            @RequestPart("truck") Truck truck,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        try {
            Truck createdTruck = truckService.create(truck, photo);
            return ResponseEntity.ok(createdTruck);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/read/{truckId}")
    public ResponseEntity<Truck> getTruckById(@PathVariable String truckId) {
        try {
            Truck truck = truckService.read(truckId);
            return ResponseEntity.ok(truck);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/update/{truckId}")
    public ResponseEntity<Truck> updateTruck(
            @PathVariable String truckId,
            @RequestPart("truck") Truck updatedTruck,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        try {
            Truck updated = truckService.update(truckId, updatedTruck, photo);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/delete/{truckId}")
    public ResponseEntity<String> deleteTruck(@PathVariable String truckId) {
        try {
            truckService.delete(truckId);
            return ResponseEntity.ok("Truck deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Truck>> getAllTrucks() {
        List<Truck> trucks = truckService.getAll();
        return ResponseEntity.ok(trucks);
    }
}