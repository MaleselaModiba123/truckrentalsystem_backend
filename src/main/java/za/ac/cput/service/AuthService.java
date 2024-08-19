package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.Manager;
import za.ac.cput.domain.auth.UserDetails;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.ManagerRepository;

import javax.naming.AuthenticationException;

@Service
public class AuthService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public UserDetails authenticate(String email, String password) throws AuthenticationException {
        Manager manager = managerRepository.findByEmailAndPassword(email, password);
        if (manager != null) {
            return new UserDetails(manager.getEmail(), "MANAGER");
        }

        Customer customer = customerRepository.findByEmailAndPassword(email, password);
        if (customer != null) {
            return new UserDetails(customer.getEmail(), "CUSTOMER");
        }

        throw new AuthenticationException("Invalid email or password");
    }
}
