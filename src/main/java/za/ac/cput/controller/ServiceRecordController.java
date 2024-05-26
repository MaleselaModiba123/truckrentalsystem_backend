package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.ServiceRecord;
import za.ac.cput.service.ServiceRecordService;

import java.util.List;

@RestController
@RequestMapping("/serviceRecord")
public class ServiceRecordController {
    @Autowired
    private ServiceRecordService serviceRecordService;

    @PostMapping("/create")
    public ServiceRecord create(@RequestBody ServiceRecord serviceRecord){
        return serviceRecordService.create(serviceRecord);
    }
    @GetMapping("/read/{serviceRecord}")
    public ServiceRecord read(@PathVariable int serviceID){
       return serviceRecordService.read(serviceID);
    }
    @PostMapping("/update{serviceID}")
    public ServiceRecord update(@RequestBody ServiceRecord serviceRecord){
        return serviceRecordService.update(serviceRecord);
    }
    @DeleteMapping("/delete{serviceID}")
    public void delete(@PathVariable int serviceID){
        serviceRecordService.delete(serviceID);
    }
    @GetMapping("/getAll")
    public List<ServiceRecord> getAll(){
        return serviceRecordService.getAll();
    }

}
