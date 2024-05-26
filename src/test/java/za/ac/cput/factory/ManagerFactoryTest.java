package za.ac.cput.factory;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Manager;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @aurthor Ayanda Phumzile Khoza (218057172)
 * Date: 07 May 2024
 * */

class ManagerFactoryTest {
    @Test
    void createManager() {
        Manager createManager = ManagerFactory.buildManager("667745", 4300, 6);
        assertNotNull(createManager);
        System.out.println("Created: " + createManager);
    }
}

