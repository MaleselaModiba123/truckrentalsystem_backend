package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.RentalAgent;
import za.ac.cput.factory.CustomerFactory;
import za.ac.cput.factory.RentalAgentFactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


/**
 * CustomerServiceTest.java
 * This is the service class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 18 May 2024
 */

@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest
class CustomerServiceTest {

    @Autowired
    private CustomerService  customerService ;
    @Autowired
    private RentalAgentService rentalAgentService;
    private RentalAgent rentalAgent;
    private Customer customer;
@BeforeEach
void setUp(){

    rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Malesela", "Modiba", "Modiba@gmail.com", "Rental Agent", 750.50, 8);
    rentalAgent = rentalAgentService.create(rentalAgent);
    assertNotNull(rentalAgent, "RentalAgent should be created and not null");

    customer = CustomerFactory.buildCustomer(1, "Khanye", "West", "khanye@gmail.com", "12345","Code 10", "084 654 6878", rentalAgent);
    customer = customerService.create(customer);
    assertNotNull(customer, "Customer should be created and not null");
}
    @Test
    void a_create() {
//        Customer createdCustomer = customerService.create(customer);
        assertNotNull(customer);
        System.out.println("Created Customer: " + customer);
    }

    @Test
    void b_read() {
        //System.out.println("Customer ID:" + customer.getCustomerID());
        Customer read = customerService.read(customer.getCustomerID());
        assertNotNull(read);
        System.out.println("Read: " + read);
    }

    @Test
    void c_update() {
        Customer newCustomer = new Customer.Builder().copy(customer).setFirstName("Nito").build();
        Customer updated = customerService.update(newCustomer);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    @Disabled
    void e_delete() {
        customerService.delete(customer.getCustomerID());
        System.out.println("Successfully deleted customer");
    }

    @Test
    void d_getAll() {
        System.out.println(customerService.getAll());
    }
}
