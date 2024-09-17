package za.ac.cput.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Employee;
import za.ac.cput.domain.EmployeeRequest;
import za.ac.cput.service.EmployeeService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeRequest request) {
        try {
            Employee employee = employeeService.createEmployee(
                    request.getName(),
                    request.getContact(),
                    request.getAddress(),
                    request.getPassword(),
                    request.getRole()
            );
            return ResponseEntity.ok(employee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Handle exceptions as needed
        }
    }

    @GetMapping("/read/{employeeNumber}")
    public ResponseEntity<Employee> getEmployee(@PathVariable String employeeNumber) {
        try {
            Employee employee = employeeService.read(employeeNumber);
            return ResponseEntity.ok(employee);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{employeeNumber}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable String employeeNumber,
            @RequestBody EmployeeRequest request) {
        try {
            Employee employee = employeeService.updateEmployee(
                    employeeNumber,
                    request.getName(),
                    request.getContact(),
                    request.getAddress(),
                    request.getPassword(),
                    request.getRole()
            );
            return ResponseEntity.ok(employee);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{employeeNumber}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String employeeNumber) {
        try {
            employeeService.delete(employeeNumber);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email) {
        try {
            Employee employee = employeeService.getEmployeeByEmail(email);
            return ResponseEntity.ok(employee);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
