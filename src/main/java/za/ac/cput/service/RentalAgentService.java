package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.repository.RentalAgentRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@Service
public class RentalAgentService implements IRentalAgentService {
    private RentalAgentRepository rentalAgentAgentRepository;

    @Autowired
    RentalAgentService(RentalAgentRepository rentalAgentAgentRepository){
        this.rentalAgentAgentRepository = rentalAgentAgentRepository;
    }
    @Override
    public RentalAgent create (RentalAgent rentalAgentAgent){
        return rentalAgentAgentRepository.save(rentalAgentAgent);
    }
    @Override
    public RentalAgent read(String EmployeeNumber){
        return this.rentalAgentAgentRepository.findById(EmployeeNumber).orElse(null);

    }
    @Override
    public RentalAgent update(RentalAgent rentalAgentAgent){
        return rentalAgentAgentRepository.save(rentalAgentAgent);
    }
    @Override
    public void delete(String EmplyoeeNumber){
        rentalAgentAgentRepository.deleteById(EmplyoeeNumber);
    }
    @Override
    public List<RentalAgent> getAll(){
        return rentalAgentAgentRepository.findAll().stream().collect(Collectors.toList());
    }
}
