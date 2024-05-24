package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Branch;

/**
 * Branch Repository.java
 * This is the iRepository class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 16 May 2024
 */

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
}
