package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.repository.RentTruckRepository;

import java.util.List;

/**
 * RentTruckService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 18 May 2024
 */

@Service
public class RentTruckService implements IRentTruckService{

    @Autowired
    private RentTruckRepository rentTruckRepository;

//    @Autowired
//    RentTruckService(RentTruckRepository rentTruckRepository){
//        this.rentTruckRepository = rentTruckRepository;
//    }


    @Override
    public RentTruck create(RentTruck rentTruck) {
        return rentTruckRepository.save(rentTruck);
    }

    @Override
    public RentTruck read(Integer rentTruckId) {
        return this.rentTruckRepository.findById(rentTruckId).orElse(null);
    }

    @Override
    public RentTruck update(RentTruck rentTruck) {
        return rentTruckRepository.save(rentTruck);
    }


    @Override
    public void delete(Integer rentTruckId) {
        rentTruckRepository.deleteById(rentTruckId);

    }

    @Override
    public List<RentTruck> getAll() {
        return rentTruckRepository.findAll();
    }
}
