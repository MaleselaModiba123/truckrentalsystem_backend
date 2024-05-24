package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.ServiceRecord;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
/*  Completed By Malesela Modiba
    23 May 2024
 */
class ServiceRecordFactoryTest {
    @Test
    void BuildServiceRecord(){
        ServiceRecord serviceRecord = ServiceRecordFactory.buildServiceRecord(001,
                LocalDate.of(2024,3,25),
                "Normal Service",
                3500.99,
                "03",
                LocalDate.of(2024,6,25));
        assertNotNull(serviceRecord);
        System.out.println(serviceRecord);
    }
    @Test
    void BuildServiceRecordWithFail(){
        ServiceRecord serviceRecord = ServiceRecordFactory.buildServiceRecord(001,
                LocalDate.of(2024,3,25),
                "Normal Service",
                3500.99,
                "",
                LocalDate.of(2024,6,25));
        assertNotNull(serviceRecord);
        System.out.println(serviceRecord);
    }
}
