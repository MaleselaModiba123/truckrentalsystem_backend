package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Mechanic;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * CustomerFactoryTest.java
 * This is the factory test class
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 16 May 2024
 **/
  class MechanicFactoryTest {

     @Test
      void buildMechanic() {
          Mechanic mechanic = MechanicFactory.buildMechanic("001","Zukhanye", "Mene", "bennie@gmail.com", "Mechanic", "Engen" , true);
          assertNotNull(mechanic);
          System.out.println(mechanic.toString());
      }

     @Test
     void buildMechanicWithFail() {
         Mechanic mechanic = MechanicFactory.buildMechanic("001","Zukhanye", "Mene", "bennie8gmail.om", "Mechanic", "" , true);
         assertNotNull(mechanic);
         System.out.println(mechanic.toString());
    }
}



