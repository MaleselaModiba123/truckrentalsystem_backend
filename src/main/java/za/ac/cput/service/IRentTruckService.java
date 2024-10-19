package za.ac.cput.service;

import za.ac.cput.domain.RentTruck;

import java.util.List;

public interface IRentTruckService extends IService<RentTruck, Integer>{
    RentTruck create(RentTruck rentTruck);

    RentTruck update(RentTruck rentTruck);
    List<RentTruck> getAll();
}
