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

@RestController
@RequestMapping("/truck")
public class TruckController {
    @Autowired
    private TruckService truckService;

    @PostMapping("/create")
    public Truck create(@RequestBody Truck Truck){
        return truckService.create(Truck);
    }
    @GetMapping("/read/{TruckID}")
    public Truck read(@PathVariable int TruckID){
        return truckService.read(TruckID);
    }
    @DeleteMapping("/delete/{TruckID}")
    public void delete(@PathVariable int TruckID){
        truckService.delete(TruckID);
    }
    @PostMapping("/update")
    public Truck update(@RequestBody Truck Truck){
        return truckService.update(Truck);
    }
    @GetMapping("/getAll")
    public List<Truck> getAll(){
        return truckService.getAll();
    }
}
