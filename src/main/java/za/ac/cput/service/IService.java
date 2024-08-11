package za.ac.cput.service;

import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Truck;

public interface IService<T, ID> {

    T read(ID id);

    void delete(ID id);
}
