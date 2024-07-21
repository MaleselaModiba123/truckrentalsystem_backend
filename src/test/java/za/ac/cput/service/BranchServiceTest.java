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
    static Branch branch3;
    static Branch branch4;
    static Branch branch5;
    static Branch branch6;
    static Branch branch7;
    static Branch branch8;
    static Branch branch9;




    @Order(1)
    @BeforeAll
    static void a_setUp() {
        branch1 = BranchFactory.buildBranch(371,
                "WiggleTrucksWC", "10 Main St, Cape Town, South Africa, 7971");
        System.out.println(branch1);

        branch2 = BranchFactory.buildBranch(372,
                "WiggleTrucksKZN", "10 Dorset St, Durban, South Africa, 7972");
        System.out.println(branch2);

        branch3 = BranchFactory.buildBranch(373,
                "WiggleTrucksLIM", "10 Dorset St, Limpopo, South Africa, 7973");
        System.out.println(branch3);

        branch4 = BranchFactory.buildBranch(374,
                "WiggleTrucksMPU", "10 Dorset St, Mpumalanga, South Africa, 7974");
        System.out.println(branch4);

        branch5 = BranchFactory.buildBranch(375,
                "WiggleTrucksGP", "10 Dorset St, Pretoria, South Africa, 7975");
        System.out.println(branch5);

        branch6 = BranchFactory.buildBranch(376,
                "WiggleTrucksNW", "10 Main St, Bloem, South Africa, 7976");
        System.out.println(branch6);

        branch7 = BranchFactory.buildBranch(377,
                "WiggleTrucksNC", "10 Dorset St, Kimberly, South Africa, 7977");
        System.out.println(branch7);

        branch8 = BranchFactory.buildBranch(378,
                "WiggleTrucksESC", "10 Dorset St, Port Elizabeth, South Africa, 7978");
        System.out.println(branch8);

        branch9 = BranchFactory.buildBranch(379,
                "WiggleTrucksFS", "10 Dorset St, Free State, South Africa, 7979");
        System.out.println(branch9);

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

        System.out.println("branch 3:" + branch3.getBranchId());
        Branch savedBranch3 = branchService.create(branch3);
        System.out.println(savedBranch3);
        assertNotNull(savedBranch3);

        System.out.println("branch 4:" + branch4.getBranchId());
        Branch savedBranch4 = branchService.create(branch4);
        System.out.println(savedBranch4);
        assertNotNull(savedBranch4);

        System.out.println("branch 5:" + branch5.getBranchId());
        Branch savedBranch5 = branchService.create(branch5);
        System.out.println(savedBranch5);
        assertNotNull(savedBranch5);

        System.out.println("branch 6:" + branch6.getBranchId());
        Branch savedBranch6 = branchService.create(branch6);
        System.out.println(savedBranch6);
        assertNotNull(savedBranch6);

        System.out.println("branch 7:" + branch7.getBranchId());
        Branch savedBranch7 = branchService.create(branch7);
        System.out.println(savedBranch7);
        assertNotNull(savedBranch7);

        System.out.println("branch 8:" + branch8.getBranchId());
        Branch savedBranch8 = branchService.create(branch8);
        System.out.println(savedBranch8);
        assertNotNull(savedBranch8);

        System.out.println("branch 9:" + branch9.getBranchId());
        Branch savedBranch9 = branchService.create(branch9);
        System.out.println(savedBranch9);
        assertNotNull(savedBranch9);

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

        Branch read3 = branchService.read(branch3.getBranchId());
        assertNotNull(read3);
        System.out.println("read: " + read3);

        Branch read4 = branchService.read(branch4.getBranchId());
        assertNotNull(read4);
        System.out.println("read: " + read4);

        Branch read5 = branchService.read(branch5.getBranchId());
        assertNotNull(read5);
        System.out.println("read: " + read5);

        Branch read6 = branchService.read(branch6.getBranchId());
        assertNotNull(read6);
        System.out.println("read: " + read6);

        Branch read7 = branchService.read(branch7.getBranchId());
        assertNotNull(read7);
        System.out.println("read: " + read7);

        Branch read8 = branchService.read(branch8.getBranchId());
        assertNotNull(read8);
        System.out.println("read: " + read8);

        Branch read9 = branchService.read(branch9.getBranchId());
        assertNotNull(read9);
        System.out.println("read: " + read9);
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
