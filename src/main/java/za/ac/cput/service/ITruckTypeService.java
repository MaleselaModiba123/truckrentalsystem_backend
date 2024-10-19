package za.ac.cput.service;

import za.ac.cput.domain.TruckType;

import java.util.List;

public interface ITruckTypeService extends IService<TruckType, Integer> {
    TruckType create(TruckType truckType);

    TruckType update(Integer truckTypeId, TruckType truckType);

    List<TruckType> getAll();
}
