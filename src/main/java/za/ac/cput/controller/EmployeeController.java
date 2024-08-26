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
}


//package za.ac.cput.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import za.ac.cput.domain.*;
//import za.ac.cput.service.EmployeeService;
//import za.ac.cput.service.IEmployeeService;
//
//import java.util.List;
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/employees")
//public class EmployeeController {
//
//    private final EmployeeService employeeService;
//
//    @Autowired
//    public EmployeeController(EmployeeService employeeService) {
//        this.employeeService = employeeService;
//    }
//
//    @PostMapping("create")
//    public ResponseEntity<Employee> createEmployee(
//            @RequestBody Name name,
//            @RequestBody Contact contact,
//            @RequestBody Address address,
//            @RequestParam String password,
//            @RequestParam Role role) {
//
//        Employee employee = employeeService.createEmployee(name, contact, address, password, role);
//        return ResponseEntity.ok(employee);
//    }
//
//    @GetMapping("/read/{employeeNumber}")
//    public ResponseEntity<Employee> getEmployee(@PathVariable String employeeNumber) {
//        Employee employee = employeeService.read(employeeNumber);
//        return ResponseEntity.ok(employee);
//    }
//
//    @PutMapping("/update/{employeeNumber}")
//    public ResponseEntity<Employee> updateEmployee(
//            @PathVariable String employeeNumber,
//            @RequestBody Name name,
//            @RequestBody Contact contact,
//            @RequestBody Address address,
//            @RequestParam String password,
//            @RequestParam Role role) {
//
//        Employee employee = employeeService.updateEmployee(employeeNumber, name, contact, address, password, role);
//        return ResponseEntity.ok(employee);
//    }
//
//    @DeleteMapping("/delete/{employeeNumber}")
//    public ResponseEntity<Void> deleteEmployee(@PathVariable String employeeNumber) {
//        employeeService.delete(employeeNumber);
//        return ResponseEntity.noContent().build();
//    }
//
//    @GetMapping("getAllEmployees")
//    public ResponseEntity<List<Employee>> getAllEmployees() {
//        List<Employee> employees = employeeService.getAllEmployees();
//        return ResponseEntity.ok(employees);
//    }
//}

