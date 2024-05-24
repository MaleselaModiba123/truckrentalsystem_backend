package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.ServiceRecord;
@Repository
public interface ServiceRecordRepository extends JpaRepository<ServiceRecord,Integer> {
}
