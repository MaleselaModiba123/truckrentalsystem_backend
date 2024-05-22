package za.ac.cput.service;

import za.ac.cput.domain.TruckType;

import java.util.List;

/**
 * ITruckTypeService.java
 * This is the service interface
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
public interface ITruckTypeService extends IService<TruckType, Integer> {
    List<TruckType> getAll();
}
