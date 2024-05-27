package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Branch;
import za.ac.cput.domain.RentTruck;
import za.ac.cput.factory.BranchFactory;

import static org.junit.jupiter.api.Assertions.*;

/**
 * BranchServiceTest.java
 * This is the ServiceTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 18 May 2024
 */

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BranchServiceTest {
    @Autowired
    private BranchService branchService;
    private Branch branch1;
    private Branch branch2;

    @Order(1)
    @BeforeEach
    void setUp() {
        branch1 = BranchFactory.buildBranch(371,
                "WiggleTrucksWC", "10 Main St, Cape Town, South Africa 7972");
        assertNotNull(branch1);

        branch2 = BranchFactory.buildBranch(372,
                "WiggleTrucksKZN", "10 Dorset St, Durban, South Africa 7972");
        assertNotNull(branch2);
    }

    @Order(2)
    @Test
    void create() {
        Branch created1 = branchService.create(branch1);
        assertNotNull(created1);
        System.out.println(created1);

        Branch created2 = branchService.create(branch2);
        assertNotNull(created2);
        System.out.println(created2);
    }

    @Order(3)
    @Test
    void read() {
        Branch read = branchService.read(branch1.getBranchId());
        assertNotNull(read);
        System.out.println("read: " + read);
    }

    @Order(4)
    @Test
    @Disabled
    void delete() {
    }

    @Order(5)
    @Test
    void getAll() {
        branchService.getAll();
    }
}
