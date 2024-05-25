package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Insurance;
import za.ac.cput.service.InsuranceService;

import java.util.List;

@RestController
@RequestMapping("/insurance")
public class InsuranceController {
    @Autowired
    private InsuranceService insuranceService;

    @PostMapping("/create")
    public Insurance create(@RequestBody Insurance insurance){
        return insuranceService.create(insurance);
    }
    @GetMapping("/read/{insuranceID}")
    public Insurance read(@PathVariable int insuranceID){
        return insuranceService.read(insuranceID);
    }
    @DeleteMapping("/delete/{insuranceID}")
    public void delete(@PathVariable int insuranceID){
        insuranceService.delete(insuranceID);
    }
    @PostMapping("/update")
    public Insurance update(@RequestBody Insurance insurance){
        return insuranceService.update(insurance);
    }
    @GetMapping("/getAll")
    public List<Insurance> getAll(){
        return insuranceService.getAll();
    }
}
