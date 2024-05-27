package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.service.RentalAgentService;

import java.util.List;

@RestController
@RequestMapping("/rentalAgent")
public class RentalAgentController {
    @Autowired
    private RentalAgentService rentalAgentService;

    @PostMapping("/create")
    public RentalAgent create(@RequestBody RentalAgent rentalAgent) {
        return rentalAgentService.create(rentalAgent);
    }
    @GetMapping("/read/{EmployeeNumber}")
    public RentalAgent read(@RequestBody String EmployeeNumber){
        return rentalAgentService.read(EmployeeNumber);
    }
    @DeleteMapping("/delete{EmployeeNumber}")
    public void delete(@PathVariable String EmployeeNumber){
        rentalAgentService.delete(EmployeeNumber);
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
