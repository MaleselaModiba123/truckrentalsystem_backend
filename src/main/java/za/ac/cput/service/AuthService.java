package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.Employee;
import za.ac.cput.domain.Role;
import za.ac.cput.domain.auth.UserDetails;
import za.ac.cput.repository.CustomerRepository;
import za.ac.cput.repository.EmployeeRepository;

import javax.naming.AuthenticationException;
import java.util.Optional;
@Service
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public AuthService(EmployeeRepository employeeRepository, CustomerRepository customerRepository) {
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
    }

    public UserDetails authenticate(String email, String password) throws AuthenticationException {
        // Authenticate Employee
        Optional<Employee> employeeOpt = employeeRepository.findByEmailAndPassword(email, password);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Role role = employee.getRole();
            if (role == Role.ADMIN || role == Role.HELP_DESK) {
                return new UserDetails(employee.getContact().getEmail(), employee.getPassword(), role.name());
            } else {
                throw new AuthenticationException("Access denied for role: " + role.name());
            }
        }


        Customer customer = customerRepository.findByEmailAndPassword(email, password);
       if (customer != null) {
           return new UserDetails(customer.getEmail(), customer.getPassword(), "CUSTOMER");
        }

        throw new AuthenticationException("Invalid email or password");
    }
}

