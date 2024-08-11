package za.ac.cput.service;

import za.ac.cput.domain.RentTruck;

import java.util.List;


/**
 * IRentTruckService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 18 May 2024
 */

public interface IRentTruckService extends IService<RentTruck, Integer>{
    RentTruck create(RentTruck rentTruck);

    RentTruck update(RentTruck rentTruck);
    List<RentTruck> getAll();
}
