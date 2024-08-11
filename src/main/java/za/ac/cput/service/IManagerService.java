package za.ac.cput.service;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Manager;

import java.util.List;
import java.util.Set;
/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */
@Repository
public interface IManagerService extends IService<Manager,String>{

    Manager create(Manager manager);

    Manager update(Manager manager);

    List<Manager> getAll();
}
