package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Mechanic;
import za.ac.cput.repository.MechanicRepository;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * MechanicService.java
 * This is the service class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 18 May 2024
 */

@Service
public class MechanicService implements IMechanicService {
    private MechanicRepository  mechanicRepository;

    @Autowired
    MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    @Override
    public Mechanic create(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    @Override
    public Mechanic read(String employeeNumber) {
        return this.mechanicRepository.findById(employeeNumber).orElse(null);
    }

    @Override
    public Mechanic update(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    @Override
    public void delete(String employeeNumber) {
        mechanicRepository.deleteById(employeeNumber);
    }

    @Override
    public Set<Mechanic> getAll() {
        return mechanicRepository.findAll().stream().collect(Collectors.toSet());
    }
}
