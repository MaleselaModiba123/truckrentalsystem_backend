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

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public UserDetails authenticate(String email, String password) throws AuthenticationException {
        // Authenticate Employee
        Optional<Employee> employeeOpt = employeeRepository.findByEmailAndPassword(email, password);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Role role = employee.getRole();
            // Check if the role is allowed
            if (role == Role.MANAGER || role == Role.HELP_DESK) {
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
