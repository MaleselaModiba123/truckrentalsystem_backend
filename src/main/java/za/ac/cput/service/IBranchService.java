package za.ac.cput.service;

import za.ac.cput.domain.Branch;

import java.util.List;

public interface IBranchService extends IService<Branch, Integer>{
    Branch create(Branch branch);

    Branch update(Integer branchId, Branch branch);
    List<Branch> getAll();
}
