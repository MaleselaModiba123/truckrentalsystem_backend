package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.domain.TruckType;
import za.ac.cput.service.TruckTypeService;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/truckType")
public class TruckTypeController {
    @Autowired
    private TruckTypeService truckTypeService;
    @PostMapping("/create")
    public TruckType create(@RequestBody TruckType truckType){
        return truckTypeService.create(truckType);
    }
    @GetMapping("/read/{truckTypeId}")
    public TruckType read(@PathVariable int truckTypeId){
        return truckTypeService.read(truckTypeId);
    }
    @DeleteMapping("/delete/{truckTypeId}")
    public void delete(@PathVariable int truckTypeId){
        truckTypeService.delete(truckTypeId);
    }

    @GetMapping("/getAll")
    public List<TruckType> getAll(){
        return truckTypeService.getAll();
    }
}
