package za.ac.cput.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Customer;
import za.ac.cput.factory.CustomerFactory;

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
    private Customer customer = CustomerFactory.buildCustomer(1, "Khanye", "West"
            , "khanye@gmail.com","CY 6468" , "084 654 6878");


    @Test
    void a_create() {
        Customer createdCustomer = customerService.create(customer);
        assertEquals(customer.getCustomerID(), createdCustomer.getCustomerID());
        System.out.println("Created Customer: " + createdCustomer);
    }

    @Test
    void b_read() {
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
