package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.CustomerRepository;

import java.util.List;

/**
 * CustomerService.java
 * This is the service class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 18 May 2024
 */

@Service
public class CustomerService implements ICustomerService {
    private CustomerRepository customerRepository;

    @Autowired
    CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer create(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer read(Integer customerID) {
        return this.customerRepository.findById(customerID).orElse(null);
    }

    public Customer update(Integer customerID, Customer customer) {
        Customer existingCustomer = read(customerID);
        if (existingCustomer != null) {
           Customer updatedCustomer = new Customer.Builder()
                    .copy(existingCustomer)
                    .setFirstName(customer.getFirstName())
                    .setLastName(customer.getLastName())
                    .setEmail(customer.getEmail())
                    .setPassword(customer.getPassword())
                    .setLicense(customer.getLicense())
                    .setCellNo(customer.getCellNo())
                    .build();
            return customerRepository.save(updatedCustomer);
        }
        return null;
    }
    @Override
    public void delete(Integer customerID) {
        customerRepository.deleteById(customerID);
    }

    @Override
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    public Customer authenticate(String email, String password) {
        return customerRepository.findByEmailAndPassword(email, password);
    }
}