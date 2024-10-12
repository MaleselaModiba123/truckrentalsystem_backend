package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.domain.Customer;
import za.ac.cput.service.CustomerService;

import java.util.List;

/**
 * CustomerController.java
 * This is the Customer Controller program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 25 May 2024
 */

@CrossOrigin(origins="*",exposedHeaders = "token")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
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
    public String authenticateUser(@RequestBody Customer customer) {
        return customerService.authenticateUser(customer);
    }
    @GetMapping("/findByEmail")
    public ResponseEntity<Customer> getCustomerByEmail(@RequestParam String email) {
        Customer customer = customerService.findByEmail(email);
        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }
    @GetMapping("/profile")
    public ResponseEntity<Customer> getCustomerProfile(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String email = authentication.getName(); // Get email from the authentication object
        Customer customer = customerService.findByEmail(email);

        if (customer != null) {
            return ResponseEntity.ok(customer); // Return the customer profile
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Customer not found
        }
    }

}
