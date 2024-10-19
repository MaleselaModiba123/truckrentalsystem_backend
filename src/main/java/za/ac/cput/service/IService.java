package za.ac.cput.service;

public interface IService<T, ID> {

    T read(ID id);

    void delete(ID id);
}
