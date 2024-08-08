package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Customer;
import za.ac.cput.service.CustomerService;

import java.util.List;

/**
 * CustomerController.java
 * This is the Customer Controller program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 25 May 2024
 */

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/create")
    public Customer create(@RequestBody Customer customer){
        return customerService.create(customer);
    }
    @GetMapping("/read/{customerID}")
    public Customer read(@PathVariable int customerID){
        return customerService.read(customerID);
    }
    @DeleteMapping("/delete/{customerID}")
    public void delete(@PathVariable int customerID){
        customerService.delete(customerID);
    }

    @PutMapping("/update/{customerID}")
    public Customer update(@PathVariable int customerID, @RequestBody Customer customer) {
        return customerService.update(customerID, customer);

    }

    @GetMapping("/getAll")
    public List<Customer> getAll(){
        return customerService.getAll();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Customer customer) {
        Customer authenticatedCustomer = customerService.authenticate(customer.getEmail(), customer.getPassword());
        if (authenticatedCustomer != null) {
            return ResponseEntity.ok(authenticatedCustomer);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
