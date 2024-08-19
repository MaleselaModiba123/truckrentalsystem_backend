package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Truck;
import za.ac.cput.repository.TruckRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 *Truck.java
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */

@Service
public class TruckService implements ITruckService {
    private TruckRepository truckRepository;

    @Autowired
    TruckService(TruckRepository truckRepository) {
        this.truckRepository = truckRepository;
    }

    @Override
    public Truck create(Truck truck, MultipartFile photo) throws IOException {
        // Handle photo if provided
        if (photo != null && !photo.isEmpty()) {
            truck = new Truck.Builder()
                    .copy(truck)
                    .setPhoto(photo.getBytes())
                    .build();
        }
        return truckRepository.save(truck);
    }

    @Override
    public Truck read(String truckID) {
        return this.truckRepository.findById(truckID).orElse(null);
    }

    @Override
    public Truck update(String truckId, Truck updatedTruck, MultipartFile photo) throws IOException {
        Optional<Truck> optionalExistingTruck = truckRepository.findById(truckId);
        if (optionalExistingTruck.isEmpty()) {
            return null; // Truck not found
        }

        Truck existingTruck = optionalExistingTruck.get();
        Truck.Builder builder = new Truck.Builder()
                .copy(existingTruck)
                .setModel(updatedTruck.getModel())
                .setAvailability(updatedTruck.isAvailability())
                .setLicensePlate(updatedTruck.getLicensePlate())
                .setCurrentMileage(updatedTruck.getCurrentMileage())
                .setTruckType(updatedTruck.getTruckType())
                .setInsurance(updatedTruck.getInsurance());

        // Handle photo if provided
        if (photo != null && !photo.isEmpty()) {
            builder.setPhoto(photo.getBytes());
        }

        return truckRepository.save(builder.build());
    }
    @Override
    public void delete(String truckID) {
        truckRepository.deleteById(truckID);
    }

    @Override
    public List<Truck> getAll() {
        return truckRepository.findAll();
    }
}