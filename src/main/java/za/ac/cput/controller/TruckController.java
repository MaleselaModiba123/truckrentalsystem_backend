package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

@CrossOrigin(origins = "*",exposedHeaders = "token")
@RestController
@RequestMapping("/truck")
public class TruckController {


    private final TruckService truckService;
    @Autowired
    public TruckController(TruckService truckService) {
        this.truckService = truckService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Truck>> getAllTrucks() {
        return ResponseEntity.ok(truckService.getAllTrucks());
    }

    @GetMapping("/{vin}")
    public ResponseEntity<Truck> getTruckByVin(@PathVariable String vin) {
        return truckService.getTruckByVin(vin)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Truck> createTruck(
            @RequestParam("model") String model,
            @RequestParam("truckImage") MultipartFile truckImage,
            @RequestParam("availability") boolean availability,
            @RequestParam("licensePlate") String licensePlate,
            @RequestParam("currentMileage") double currentMileage,
            @RequestParam("truckTypeId") int truckTypeId,
            @RequestParam("insuranceId") int insuranceId) throws IOException {

        Truck truck = truckService.createTruck(model, truckImage, availability, licensePlate, currentMileage, truckTypeId, insuranceId);
        if (truck == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(truck);
    }

    @PutMapping("/update")
    public ResponseEntity<Truck> updateTruck(
            @RequestParam("vin") String vin,
            @RequestParam("model") String model,
            @RequestParam(value = "truckImage", required = false) MultipartFile truckImage,
            @RequestParam("availability") boolean availability,
            @RequestParam("licensePlate") String licensePlate,
            @RequestParam("currentMileage") double currentMileage,
            @RequestParam("truckTypeId") int truckTypeId,
            @RequestParam("insuranceId") int insuranceId) throws IOException {

        Truck truck = truckService.updateTruck(vin, model, truckImage, availability, licensePlate, currentMileage, truckTypeId, insuranceId);
        if (truck == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(truck);
    }

    @DeleteMapping("/{vin}")
    public ResponseEntity<Void> deleteTruck(@PathVariable String vin) {
        if (truckService.deleteTruck(vin)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/image/{vin}")
    public ResponseEntity<byte[]> getTruckImage(@PathVariable String vin) {
        return truckService.getTruckImageByVin(vin)
                .map(imageBytes -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust MIME type as needed
                        .body(imageBytes))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/available")
    public ResponseEntity<List<Truck>> getAvailableTrucks() {
        return ResponseEntity.ok(truckService.getAvailableTrucks());
    }
}
