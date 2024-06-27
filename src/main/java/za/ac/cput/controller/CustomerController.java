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

@CrossOrigin("*")
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
    public ResponseEntity<Customer> update(@PathVariable Integer customerID, @RequestBody Customer customer) {
        Customer existingCustomer = customerService.read(customerID);
        if (existingCustomer == null) {
            return ResponseEntity.notFound().build();
        }
        Customer updatedCustomer = new Customer.Builder()
                .copy(existingCustomer)
                .setFirstName(customer.getFirstName())
                .setLastName(customer.getLastName())
                .setEmail(customer.getEmail())
                .setLicense(customer.getLicense())
                .setCellNo(customer.getCellNo())
                .build();
        updatedCustomer = customerService.update(updatedCustomer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @GetMapping("/getAll")
    public List<Customer> getAll(){
        return customerService.getAll();
    }
}
