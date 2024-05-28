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

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class BranchServiceTest {
    @Autowired
    private BranchService branchService;
    static Branch branch1;
    static Branch branch2;


    @Order(1)
    @BeforeAll
    static void a_setUp() {
        branch1 = BranchFactory.buildBranch(371,
                "WiggleTrucksWC", "10 Main St, Cape Town, South Africa, 7972");
        System.out.println(branch1);

        branch2 = BranchFactory.buildBranch(372,
                "WiggleTrucksKZN", "10 Dorset St, Durban, South Africa, 7972");
        System.out.println(branch2);
    }

    @Order(2)
    @Test
    void b_create() {
        System.out.println("branch 1:" + branch1.getBranchId());
        Branch savedBranch1 = branchService.create(branch1);
        System.out.println(savedBranch1);
        assertNotNull(savedBranch1);

        System.out.println("branch 2:" + branch2.getBranchId());
        Branch savedBranch2 = branchService.create(branch2);
        System.out.println(savedBranch2);
        assertNotNull(savedBranch2);
    }

    @Order(3)
    @Test
    void c_read() {
        Branch read1 = branchService.read(branch1.getBranchId());
        assertNotNull(read1);
        System.out.println("read: " + read1);

        Branch read2 = branchService.read(branch1.getBranchId());
        assertNotNull(read2);
        System.out.println("read: " + read2);
    }

    @Order(4)
    @Test
    @Disabled
    void d_delete() {
    }

    @Order(5)
    @Test
    void e_getAll() {
        branchService.getAll();
    }
}
