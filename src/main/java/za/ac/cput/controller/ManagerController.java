package za.ac.cput.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Manager;
import za.ac.cput.service.ManagerService;
import java.util.List;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 25 May 2024
 * */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/manager")
public class ManagerController {
    @Autowired
    private ManagerService ManagerService;
    @PostMapping("/create")
    public Manager create(@RequestBody Manager Manager){
        return ManagerService.create(Manager);
    }
    @GetMapping("/read/{empNum}")
    public Manager read(@PathVariable String empNum){
        return ManagerService.read(empNum);
    }
    @DeleteMapping("/delete/{EmployeeNumber}")
    public void delete(@PathVariable String empNum){
        ManagerService.delete(empNum);
    }
    @PostMapping("/update")
    public Manager update(@RequestBody Manager Manager){
        return ManagerService.update(Manager);
    }
    @GetMapping("/getAll")
    public List<Manager> getAll(){
        return ManagerService.getAll();
    }
}
