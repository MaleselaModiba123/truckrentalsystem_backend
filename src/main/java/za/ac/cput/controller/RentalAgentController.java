package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.service.RentalAgentService;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rentalAgent")
public class RentalAgentController {
    @Autowired
    private RentalAgentService rentalAgentService;

    @PostMapping("/create")
    public RentalAgent create(@RequestBody RentalAgent rentalAgent) {
        return rentalAgentService.create(rentalAgent);
    }
    @GetMapping("/read/{employeeNumber}")
    public RentalAgent read(@PathVariable String employeeNumber){
        return rentalAgentService.read(employeeNumber);
    }
    @DeleteMapping("/delete{employeeNumber}")
    public void delete(@PathVariable String employeeNumber){
        rentalAgentService.delete(employeeNumber);
    }
    @PostMapping("/update")
    public RentalAgent update(@RequestBody RentalAgent rentalAgent){
        return rentalAgentService.update(rentalAgent);
    }
    @GetMapping("/getAll")
    public List<RentalAgent> getAll(){
        return rentalAgentService.getAll();
    }
}
