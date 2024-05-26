package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Customer;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * CustomerFactoryTest.java
 * This is the factory test class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 03 May 2024
 */
class CustomerFactoryTest {

    @Test
    void buildCustomer() {
        Customer customer = CustomerFactory.buildCustomer(1, "Zukhanye", "Mene",
                "bennie@gmail.com", "CY 739 28" , "0847466836");
        assertNotNull(customer);
        System.out.println(customer.toString());
    }

    @Test
    void buildCustomerWithFail() {
        Customer customer = CustomerFactory.buildCustomer(12, " ", "Mennne",
                "bennie@gmail.om", " " , "084746686" );
        assertNotNull(customer);
        System.out.println(customer.toString());
    }
}


