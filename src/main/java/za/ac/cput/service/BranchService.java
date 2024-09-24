package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Branch;
import za.ac.cput.repository.BranchRepository;

import java.util.List;

/**
 * BranchService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 18 May 2024
 */

@Service
public class BranchService implements IBranchService{
    private BranchRepository branchRepository;
    @Autowired
    BranchService(BranchRepository branchRepository){
        this.branchRepository = branchRepository;
    }

    @Override
    public Branch create(Branch branch) {
        return branchRepository.save(branch);
    }

    @Override
    public Branch read(Integer branchId) {
        return this.branchRepository.findById(branchId).orElse(null);
    }

    @Override
    public void delete(Integer branchId) {
        branchRepository.deleteById(branchId);

    }

    @Override
    public Branch update(Integer branchId, Branch branchDetails) {
        Branch existingBranch = read(branchId);
        if (existingBranch != null) {
            Branch updatedBranch = new Branch.Builder()
                    .copy(existingBranch)
                    .setBranchName(branchDetails.getBranchName())
                    .setAddress(branchDetails.getAddress())
                    .build();
            return branchRepository.save(updatedBranch);
        }
        return null;
    }

    @Override
    public List<Branch> getAll() {
        return branchRepository.findAll();
    }
}
