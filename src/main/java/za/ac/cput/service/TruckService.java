package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Insurance;
import za.ac.cput.domain.Truck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.repository.InsuranceRepository;
import za.ac.cput.repository.TruckRepository;
import za.ac.cput.repository.TruckTypeRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 *Truck.java
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */

@Service
public class TruckService {
    private final TruckRepository truckRepository;
    private final TruckTypeRepository truckTypeRepository;
    private final InsuranceRepository insuranceRepository;

    @Autowired
    TruckService(TruckRepository truckRepository, TruckTypeRepository truckTypeRepository,
                 InsuranceRepository insuranceRepository) {
        this.truckRepository = truckRepository;
        this.truckTypeRepository = truckTypeRepository;
        this.insuranceRepository = insuranceRepository;
    }

    public List<Truck> getAllTrucks() {
        return truckRepository.findAll();
    }

    public Optional<Truck> getTruckByVin(String vin) {
        return truckRepository.findById(vin);
    }

    public Truck saveOrUpdateTruck(Truck truck) {
        return truckRepository.save(truck);
    }

    public boolean deleteTruck(String vin) {
        if (truckRepository.existsById(vin)) {
            truckRepository.deleteById(vin);
            return true;
        }
        return false;
    }

    public Optional<TruckType> getTruckTypeById(int id) {
        return truckTypeRepository.findById(id);
    }

    public Optional<Insurance> getInsuranceById(int id) {
        return insuranceRepository.findById(id);
    }

    public Truck createTruck(String model, MultipartFile truckImage, boolean availability, String licensePlate, double currentMileage, int truckTypeId, int insuranceId) throws IOException {
        Optional<TruckType> truckType = getTruckTypeById(truckTypeId);
        Optional<Insurance> insurance = getInsuranceById(insuranceId);

        if (truckType.isEmpty() || insurance.isEmpty()) {
            return null;
        }

        Truck truck = new Truck.Builder()
                .setModel(model)
                .setTruckImage(truckImage.getBytes())
                .setAvailability(availability)
                .setLicensePlate(licensePlate)
                .setCurrentMileage(currentMileage)
                .setTruckType(truckType.get())
                .setInsurance(insurance.get())
                .build();

        return saveOrUpdateTruck(truck);
    }

    public Truck updateTruck(String vin, String model, MultipartFile truckImage, boolean availability, String licensePlate, double currentMileage, int truckTypeId, int insuranceId) throws IOException {
        Optional<TruckType> truckType = getTruckTypeById(truckTypeId);
        Optional<Insurance> insurance = getInsuranceById(insuranceId);

        if (truckType.isEmpty() || insurance.isEmpty()) {
            return null;
        }

        Truck truck = getTruckByVin(vin).orElse(null);
        if (truck == null) {
            return null;
        }

        truck = new Truck.Builder()
                .setVin(vin)
                .setModel(model)
                .setTruckImage(truckImage != null ? truckImage.getBytes() : truck.getTruckImage())
                .setAvailability(availability)
                .setLicensePlate(licensePlate)
                .setCurrentMileage(currentMileage)
                .setTruckType(truckType.get())
                .setInsurance(insurance.get())
                .build();

        return saveOrUpdateTruck(truck);
    }

    public Optional<byte[]> getTruckImageByVin(String vin) {
        return getTruckByVin(vin).map(Truck::getTruckImage);
    }
}
