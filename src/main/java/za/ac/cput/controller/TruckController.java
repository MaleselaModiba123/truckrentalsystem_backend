package za.ac.cput.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Truck;
import za.ac.cput.service.TruckService;
import java.util.List;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/truck")
public class TruckController {
    @Autowired
    private TruckService truckService;

    @PostMapping("/create")
    public Truck create(@RequestBody Truck truck){
        return truckService.create(truck);
    }
    @GetMapping("/read/{truckID}")
    public Truck read(@PathVariable String truckID){
        return truckService.read(truckID);
    }
    @DeleteMapping("/delete/{truckID}")
    public void delete(@PathVariable String truckID){
        truckService.delete(truckID);
    }
    @PostMapping("/update")
    public Truck update(@RequestBody Truck truck){
        return truckService.update(truck);
    }
    @GetMapping("/getAll")
    public List<Truck> getAll(){
        return truckService.getAll();
    }
}
