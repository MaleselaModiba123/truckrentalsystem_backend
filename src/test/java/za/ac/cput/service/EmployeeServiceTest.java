package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.*;
import za.ac.cput.factory.AddressFactory;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
//@Transactional
class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    private Employee createdEmployee;
    private String employeeNumber;

    @BeforeEach
    void setUp() {
        Name name = new Name("Sipho", "M.", "Ngcobo");
        Contact contact = new Contact("sipho.ngcobo@example.co.za", "0712345678");
        Address address = AddressFactory.createAddress("123 Main Road", "Durban", "KwaZulu-Natal", "4001", "South Africa");
        String password = "password123";
        Role role = Role.MANAGER;

        // Create an employee
        createdEmployee = employeeService.createEmployee(name, contact, address, password, role);
        employeeNumber = createdEmployee.getEmployeeNumber();

        assertNotNull(createdEmployee, "Employee should be created and not null");
        assertNotNull(employeeNumber, "Employee number should be generated and not null");
    }

    @Test
    void a_createEmployee() {
        assertNotNull(createdEmployee);
        assertNotNull(createdEmployee.getEmployeeNumber());
        System.out.println("Created Employee: " + createdEmployee);
    }

    @Test
    void b_readEmployee() {
        Employee foundEmployee = employeeService.read(employeeNumber);
        assertNotNull(foundEmployee, "Employee should be found");
        assertEquals(employeeNumber, foundEmployee.getEmployeeNumber());
        System.out.println("Found Employee: " + foundEmployee);
    }

    @Test
    void c_updateEmployee() {
        Name updatedName = new Name("John", "D.", "Smith");
        Contact updatedContact = new Contact("john.smith@example.com", "0612345679");
        Address updatedAddress = AddressFactory.createAddress("789 Maple Avenue", "Cape Town", "Western Cape", "8002", "South Africa");
        String updatedPassword = "updatedpassword";
        Role updatedRole = Role.MANAGER;

        Employee updatedEmployee = employeeService.updateEmployee(employeeNumber, updatedName, updatedContact, updatedAddress, updatedPassword, updatedRole);

        assertNotNull(updatedEmployee, "Updated employee should not be null");
        assertEquals(updatedName, updatedEmployee.getName());
        assertEquals(updatedContact, updatedEmployee.getContact());
        assertEquals(updatedAddress, updatedEmployee.getAddress());
        assertEquals(updatedPassword, updatedEmployee.getPassword());
        assertEquals(updatedRole, updatedEmployee.getRole());
        System.out.println("Updated Employee: " + updatedEmployee);
    }

    @Test
    @Disabled
    void d_deleteEmployee() {
        employeeService.delete(employeeNumber);
        Employee deletedEmployee = employeeService.read(employeeNumber);
        assertNull(deletedEmployee, "Deleted employee should be null");
        System.out.println("Successfully deleted employee");
    }

    @Test
    void e_getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        assertNotNull(employees, "Employees list should not be null");
        System.out.println("All Employees: " + employees);
    }
}
