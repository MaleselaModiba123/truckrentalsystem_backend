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
        return TruckService.create(Truck);
    }
    @GetMapping("/read/{TruckID}")
    public Truck read(@PathVariable int TruckID){
        return TruckService.read(TruckID);
    }
    @DeleteMapping("/delete/{TruckID}")
    public void delete(@PathVariable int TruckID){
        TruckService.delete(TruckID);
    }
    @PostMapping("/update")
    public Truck update(@RequestBody Truck Truck){
        return TruckService.update(Truck);
    }
    @GetMapping("/getAll")
    public List<Truck> getAll(){
        return TruckService.getAll();
    }
}
