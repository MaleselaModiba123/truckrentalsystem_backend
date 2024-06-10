package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Truck;
import za.ac.cput.repository.InsuranceRepository;
import za.ac.cput.repository.TruckRepository;

import java.util.List;
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
    public Truck create(Truck truck) {

        return truckRepository.save(truck);
    }

    @Override
    public Truck read(String truckID) {
        return this.truckRepository.findById(truckID).orElse(null);
    }

    @Override
    public Truck update(Truck truck) {
        return truckRepository.save(truck);
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
