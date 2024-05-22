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
    @Autowired
    private TruckTypeRepository truckTypeRepository;

    @Override
    public TruckType create(TruckType truckType) {
        return truckTypeRepository.save(truckType);
    }

    @Override
    public TruckType read(Integer truckTypeId) {
        return this.truckTypeRepository.findById(truckTypeId).orElse(null);
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
