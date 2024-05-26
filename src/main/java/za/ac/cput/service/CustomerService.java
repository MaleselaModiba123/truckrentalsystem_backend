package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.CustomerRepository;

import java.util.Set;
import java.util.stream.Collectors;

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

    @Override
    public Customer update(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public void delete(Integer customerID) {
        customerRepository.deleteById(customerID);
    }

    @Override
    public Set<Customer> getAll() {
        return customerRepository.findAll().stream().collect(Collectors.toSet());
    }
}