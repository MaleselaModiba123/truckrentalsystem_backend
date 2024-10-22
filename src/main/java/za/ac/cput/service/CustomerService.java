package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.service.jwt.JwtService;

import java.util.List;

@Service
public class CustomerService implements ICustomerService {
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    CustomerService(CustomerRepository customerRepository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;

    }

    private boolean emailExists(String email) {
        return customerRepository.findByEmail(email) != null;
    }

    private boolean cellNoExists(String cellNo) {
        return customerRepository.findByCellNo(cellNo) != null;
    }

    @Override
    public Customer create(Customer customer) {
        // Check if the email or cell number already exists
        if (emailExists(customer.getEmail()) || cellNoExists(customer.getCellNo())) {
            throw new RuntimeException("Email or Cell Number already registered");
        }
        // Ensure role is set to "CUSTOMER" by default
        if (customer.getRole() == null) {
            customer = new Customer.Builder().copy(customer).setRole("CUSTOMER").build();
        }
        // Create a new Customer instance with the encoded password
        Customer newCustomer = new Customer.Builder()
                .copy(customer) // Copy existing fields
                .setPassword(bCryptPasswordEncoder.encode(customer.getPassword())) // Encode password directly
                .build();
        return customerRepository.save(newCustomer);
    }

    @Override
    public Customer read(Integer customerID) {
        return this.customerRepository.findById(customerID).orElse(null);
    }

    public Customer update(Integer customerID, Customer customer) {
        Customer existingCustomer = read(customerID);
        if (existingCustomer != null) {
            String updatedPassword = customer.getPassword();
            if (!existingCustomer.getPassword().equals(updatedPassword)) {
                updatedPassword = bCryptPasswordEncoder.encode(updatedPassword);
            }
           Customer updatedCustomer = new Customer.Builder()
                    .copy(existingCustomer)
                    .setFirstName(customer.getFirstName())
                    .setLastName(customer.getLastName())
                    .setEmail(customer.getEmail())
                   .setPassword(updatedPassword)
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


    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }


    public String authenticateUser(Customer customer) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(customer.getEmail(), customer.getPassword()));
        if (authentication.isAuthenticated())
            return jwtService.generateToken(customer.getEmail());
        return "Failed to log in";
    }

}