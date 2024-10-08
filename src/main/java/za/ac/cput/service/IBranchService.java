package za.ac.cput.service;

import za.ac.cput.domain.Branch;

import java.util.List;


/**
 * IBranchService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 18 May 2024
 */

public interface IBranchService extends IService<Branch, Integer>{
    Branch create(Branch branch);

    Branch update(Integer branchId, Branch branch);
    List<Branch> getAll();
}
