package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Branch;

import static org.junit.jupiter.api.Assertions.*;

/**
 * BranchFactoryTest.java
 * This is the FactoryTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 16 May 2024
 */

class BranchFactoryTest {
    private Branch branch1;
    private Branch branch2;
    private Branch branch3;

    @BeforeEach
    void setUp() {
        branch1 = BranchFactory.buildBranch(7834, "WiggleCPT",
                "10 Dorset St, Cape Town, South Africa, 8987");

        branch2 = BranchFactory.buildBranch(7674, "WiggleKZN",
                "11 Darling St ,KwaZulu-Natal,South Africa");

        branch3 = branch1;

    }

    @Test
    void buildBranch() {
        assertNotNull(branch1);
        System.out.println(branch1);

        assertNotNull(branch2);
        System.out.println(branch2);
    }
    @Test
    void buildBranchIdentity() {
        assertSame(branch1, branch3);
    }
}