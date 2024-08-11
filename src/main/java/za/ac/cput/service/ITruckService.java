package za.ac.cput.service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Truck;

import java.util.List;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 18 May 2024
 * */

public interface ITruckService extends IService<Truck,String>{

    Truck create(Truck truck);

    Truck update(Truck truck);

    List<Truck> getAll();
}
