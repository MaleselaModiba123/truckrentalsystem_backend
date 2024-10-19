package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
}
