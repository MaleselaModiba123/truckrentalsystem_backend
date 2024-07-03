package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Mechanic;
import za.ac.cput.service.MechanicService;

import java.util.Set;


/**
 * MechanicController.java
 * This is the Mechanic Controller program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 25 May 2024
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mechanic")
public class MechanicController {
    @Autowired
    private MechanicService  mechanicService;

    @PostMapping("/create")
    public Mechanic create(@RequestBody Mechanic mechanic){
        return mechanicService.create(mechanic);
    }
    @GetMapping("/read/{employeeNumber}")
    public Mechanic read(@PathVariable String employeeNumber){
        return mechanicService.read(employeeNumber);
    }
    @DeleteMapping("/delete/{employeeNumber}")
    public void delete(@PathVariable String employeeNumber){
        mechanicService.delete(employeeNumber);
    }
    @PostMapping("/update")
    public Mechanic update(@RequestBody Mechanic mechanic){
        return mechanicService.update(mechanic);
    }
    @GetMapping("/getAll")
    public Set<Mechanic> getAll(){
        return mechanicService.getAll();
    }
}