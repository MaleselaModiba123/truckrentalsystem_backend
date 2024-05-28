package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.repository.ServiceRecordRepository;

import java.util.List;
import java.util.stream.Collectors;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@Service
public class ServiceRecordService implements IServiceRecordService {

    private ServiceRecordRepository serviceRecordRepository;

    @Autowired
    ServiceRecordService(ServiceRecordRepository serviceRecordRepository){
        this.serviceRecordRepository = serviceRecordRepository;
    }

    @Override
    public ServiceRecord create(ServiceRecord serviceRecord){
        return serviceRecordRepository.save(serviceRecord);
    }

    @Override
    public ServiceRecord read(Integer serviceID){
        return this.serviceRecordRepository.findById(serviceID).orElse(null);

    }
    @Override
    public ServiceRecord update(ServiceRecord serviceRecord){
        return serviceRecordRepository.save(serviceRecord);
    }
    @Override
    public void delete(Integer serviceRecord){
        serviceRecordRepository.deleteById(serviceRecord);
    }
    public List<ServiceRecord> getAll(){
        return serviceRecordRepository.findAll();
    }


}
