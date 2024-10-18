package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.*;
import za.ac.cput.factory.AddressFactory;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Transactional
@TestMethodOrder(MethodOrderer.MethodName.class)
class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @Test
    void a_shouldCreateEmployeeSuccessfully() {
        // Define unique values for this test
        Name name = new Name("Sedi", "", "Modi");
        Contact contact = new Contact("SediM@gmail.com", "056799931");
        Address address = AddressFactory.createAddress("123 Adderly Street", "Cape Town", "Western Cape", "8001", "South Africa");
        String password = "Password@123";
        Role role = Role.HELP_DESK;

        try {
            Employee createdEmployee = employeeService.createEmployee(name, contact, address, password, role);
            assertNotNull(createdEmployee, "Created employee should not be null");
            assertNotNull(createdEmployee.getEmployeeNumber(), "Employee number should not be null");
            System.out.println("Created Employee: " + createdEmployee);
        } catch (Exception e) {
            System.err.println("Failed to create employee: " + e.getMessage());
            fail("Exception occurred while creating employee");
        }
    }

    @Test
    @Disabled
    void c_shouldReadEmployeeSuccessfully() {
        // Create an employee to test reading functionality
        Name name = new Name("Asimbonge", "", "Mbende");
        Contact contact = new Contact("asimbonge.read@example.com", "0712345679");
        Address address = AddressFactory.createAddress("456 Elm Street", "Cape Town", "Western Cape", "8002", "South Africa");
        String password = "password123";
        Role role = Role.ADMIN;
        Employee createdEmployee = null;
        String employeeNumber = null;

        try {
            createdEmployee = employeeService.createEmployee(name, contact, address, password, role);
            employeeNumber = createdEmployee.getEmployeeNumber();
        } catch (Exception e) {
            System.err.println("Failed to create employee for read test: " + e.getMessage());
            fail("Exception occurred while creating employee");
        }

        try {
            Employee foundEmployee = employeeService.read(employeeNumber);
            assertNotNull(foundEmployee, "Employee should be found");
            assertEquals(employeeNumber, foundEmployee.getEmployeeNumber(), "Employee number should match");
            System.out.println("Found Employee: " + foundEmployee);
        } catch (Exception e) {
            System.err.println("Failed to read employee: " + e.getMessage());
            fail("Exception occurred while reading employee");
        }
    }

    @Test
    @Disabled
    void c_shouldUpdateEmployeeSuccessfully() {
        // Create an employee first
        Name name = new Name("Asimbonge", "", "Mbende");
        Contact contact = new Contact("asimbonge.update@example.com", "0712345680");
        Address address = AddressFactory.createAddress("789 Oak Street", "Cape Town", "Western Cape", "8003", "South Africa");
        String password = "password123";
        Role role = Role.ADMIN;
        Employee createdEmployee = null;
        String employeeNumber = null;

        try {
            createdEmployee = employeeService.createEmployee(name, contact, address, password, role);
            employeeNumber = createdEmployee.getEmployeeNumber();
        } catch (Exception e) {
            System.err.println("Failed to create employee for update test: " + e.getMessage());
            fail("Exception occurred while creating employee");
        }

        // Define updated values
        Name updatedName = new Name("John", "D.", "Smith");
        Contact updatedContact = new Contact("john.smith@example.com", "0612345679");
        Address updatedAddress = AddressFactory.createAddress("321 Pine Street", "Cape Town", "Western Cape", "8004", "South Africa");
        String updatedPassword = "updatedpassword";
        Role updatedRole = Role.ADMIN;

        try {
            Employee updatedEmployee = employeeService.updateEmployee(employeeNumber, updatedName, updatedContact, updatedAddress, updatedPassword, updatedRole);
            assertNotNull(updatedEmployee, "Updated employee should not be null");
            assertEquals(updatedName, updatedEmployee.getName(), "Name should match");
            assertEquals(updatedContact, updatedEmployee.getContact(), "Contact should match");
            assertEquals(updatedAddress, updatedEmployee.getAddress(), "Address should match");
            assertEquals(updatedPassword, updatedEmployee.getPassword(), "Password should match");
            assertEquals(updatedRole, updatedEmployee.getRole(), "Role should match");
            System.out.println("Updated Employee: " + updatedEmployee);
        } catch (Exception e) {
            System.err.println("Failed to update employee: " + e.getMessage());
            fail("Exception occurred while updating employee");
        }
    }

    @Test
    @Disabled
    void d_shouldThrowExceptionForDuplicateEmail() {
        // Create an initial employee
        Name name = new Name("Asimbonge", "", "Mbende");
        Contact contact = new Contact("unique.email@example.com", "0712345678");
        Address address = AddressFactory.createAddress("123 Hanover Road", "Cape Town", "Western Cape", "8001", "South Africa");
        String password = "password123";
        Role role = Role.ADMIN;

        try {
            employeeService.createEmployee(name, contact, address, password, role);
        } catch (Exception e) {
            System.err.println("Failed to create initial employee for duplicate email test: " + e.getMessage());
            fail("Exception occurred while creating initial employee");
        }

        // Attempt to create another employee with the same email
        Name newName = new Name("Jane", "", "Doe");
        Contact newContact = new Contact("unique.email@example.com", "0812345678"); // Duplicate email
        Address newAddress = AddressFactory.createAddress("456 Elm Street", "Cape Town", "Western Cape", "8002", "South Africa");
        String newPassword = "password456";
        Role newRole = Role.HELP_DESK;

        try {
            employeeService.createEmployee(newName, newContact, newAddress, newPassword, newRole);
            fail("Expected exception not thrown for duplicate email");
        } catch (Exception e) {
            System.err.println("Expected exception for duplicate email: " + e.getMessage());
            assertTrue(e.getMessage().contains("Email already exists"), "Exception message should contain 'Email already exists'");
        }
    }

    @Test
    @Disabled
    void e_shouldThrowExceptionForDuplicateCellNumber() {
        // Create an initial employee
        Name name = new Name("Asimbonge", "", "Mbende");
        Contact contact = new Contact("asimbonge.cell@example.com", "0712345678");
        Address address = AddressFactory.createAddress("123 Hanover Road", "Cape Town", "Western Cape", "8001", "South Africa");
        String password = "password123";
        Role role = Role.ADMIN;

        try {
            employeeService.createEmployee(name, contact, address, password, role);
        } catch (Exception e) {
            System.err.println("Failed to create initial employee for duplicate cell number test: " + e.getMessage());
            fail("Exception occurred while creating initial employee");
        }

        // Attempt to create another employee with the same cell number
        Name newName = new Name("Mike", "", "Jones");
        Contact newContact = new Contact("mike.jones@example.com", "0712345678"); // Duplicate cell number
        Address newAddress = AddressFactory.createAddress("789 Oak Street", "Cape Town", "Western Cape", "8002", "South Africa");
        String newPassword = "password456";
        Role newRole = Role.MECHANIC;

        try {
            employeeService.createEmployee(newName, newContact, newAddress, newPassword, newRole);
            fail("Expected exception not thrown for duplicate cell number");
        } catch (Exception e) {
            System.err.println("Expected exception for duplicate cell number: " + e.getMessage());
            assertTrue(e.getMessage().contains("Cell number already exists"), "Exception message should contain 'Cell number already exists'");
        }
    }

    @Test
    @Disabled
    void e_shouldThrowExceptionForDuplicateAddress() {
        // Create an initial employee
        Name name = new Name("Asimbonge", "", "Mbende");
        Contact contact = new Contact("asimbonge.address@example.com", "0712345678");
        Address address = AddressFactory.createAddress("123 Unique Street", "Cape Town", "Western Cape", "8001", "South Africa");
        String password = "password123";
        Role role = Role.ADMIN;

        try {
            employeeService.createEmployee(name, contact, address, password, role);
        } catch (Exception e) {
            System.err.println("Failed to create initial employee for duplicate address test: " + e.getMessage());
            fail("Exception occurred while creating initial employee");
        }

        // Attempt to create another employee with the same address
        Name newName = new Name("Emily", "", "Clark");
        Contact newContact = new Contact("emily.clark@example.com", "0812345679");
        Address newAddress = AddressFactory.createAddress("123 Unique Street", "Cape Town", "Western Cape", "8001", "South Africa"); // Duplicate address
        String newPassword = "password101";
        Role newRole = Role.HELP_DESK;

        try {
            employeeService.createEmployee(newName, newContact, newAddress, newPassword, newRole);
            fail("Expected exception not thrown for duplicate address");
        } catch (Exception e) {
            System.err.println("Expected exception for duplicate address: " + e.getMessage());
            assertTrue(e.getMessage().contains("Address already exists"), "Exception message should contain 'Address already exists'");
        }
    }
}
