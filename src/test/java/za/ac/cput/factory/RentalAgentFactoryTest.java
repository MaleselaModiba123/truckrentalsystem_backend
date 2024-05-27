package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.RentalAgent;

import static org.junit.jupiter.api.Assertions.assertNotNull;
/*  Completed By Malesela Modiba
    23 May 2024
 */
class RentalAgentFactoryTest {
    @Test
    void buildRentalAgent() {
        RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Malesela", "Modiba", "Modiba@gmail.com", 750.50, 8);
        assertNotNull(rentalAgent);
        System.out.println(rentalAgent);
    }
    @Test
    void buildRentalAgentWithFail(){
        RentalAgent rentalAgent = RentalAgentFactory.buildRentalAgent("10", "Malesela", "Modiba", "Modibagmail.com", 750.50, 8);
        assertNotNull(rentalAgent);
        System.out.println(rentalAgent);
    }
}
