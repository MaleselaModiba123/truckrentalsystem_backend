package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.TruckType;
import za.ac.cput.repository.TruckTypeRepository;

import java.util.List;

/**
 * TruckTypeService.java
 * This is the service class
 *
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 22 May 2024
 */
@Service
public class TruckTypeService implements ITruckTypeService {

    private final TruckTypeRepository truckTypeRepository;
    @Autowired
    public TruckTypeService(TruckTypeRepository truckTypeRepository) {
        this.truckTypeRepository = truckTypeRepository;
    }

    @Override
    public TruckType create(TruckType truckType) {
        return truckTypeRepository.save(truckType);
    }

    @Override
    public TruckType read(Integer truckTypeId) {
        return this.truckTypeRepository.findById(truckTypeId).orElse(null);
    }
    @Override
//    public Insurance update(Insurance insurance) {
//        return insuranceRepository.save(insurance);
//    }
    public TruckType update(Integer truckTypeId, TruckType truckType) {
        TruckType existingTruckType= read(truckTypeId);
        if (existingTruckType != null) {
            TruckType updatedTrucktype= new TruckType.Builder()
                    .copy(existingTruckType)
                    .setTypeName(truckType.getTypeName())
                    .setDescription(truckType.getDescription())
                    .setDimensions(truckType.getDimensions())
                    .setCapacity(truckType.getCapacity())
                    .setTransmission(truckType.getTransmission())
                    .setFuelConsumption(truckType.getFuelConsumption())
                    .setFuelType(truckType.getFuelType())
                    .build();
            return truckTypeRepository.save(updatedTrucktype);
        }
        return null;
    }
    @Override
    public void delete(Integer truckTypeId) {
        truckTypeRepository.deleteById(truckTypeId);

    }

    @Override
    public List<TruckType> getAll() {
        return truckTypeRepository.findAll();
    }
}
