package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.service.RentTruckService;
import java.util.List;

/**
 * RentTruckController.java
 * This is the Controller class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 27 May 2024
 */

@RestController
@RequestMapping("/rentTruck")
public class RentTruckController {
        @Autowired
        private RentTruckService rentTruckService;
        @PostMapping("/create")
        public RentTruck create(@RequestBody RentTruck rentTruck){
            return rentTruckService.create(rentTruck);
        }
        @GetMapping("/read/{insuranceID}")
        public RentTruck read(@PathVariable int rentTruckID){
            return rentTruckService.read(rentTruckID);
        }
        @DeleteMapping("/delete/{insuranceID}")
        public void delete(@PathVariable int rentTruckID){
            rentTruckService.delete(rentTruckID);
        }
        @PostMapping("/update")
        public RentTruck update(@RequestBody RentTruck rentTruck){
            return rentTruckService.update(rentTruck);
        }
        @GetMapping("/getAll")
        public List<RentTruck> getAll(){
            return rentTruckService.getAll();
        }
    }
