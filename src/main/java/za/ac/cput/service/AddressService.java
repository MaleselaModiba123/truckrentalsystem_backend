package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Address;
import za.ac.cput.repository.AddressRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }

    public Optional<Address> findById(Long id) {
        return addressRepository.findById(id);
    }

    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    public void deleteById(Long id) {
        addressRepository.deleteById(id);
    }

    public Address update(Long id, Address address) {
        // Check if the Address with the given ID exists
        Optional<Address> existingAddressOpt = addressRepository.findById(id);
        if (existingAddressOpt.isEmpty()) {
            // Handle the case where the Address with the given ID does not exist
            return null;
        }
        // Get the existing Address
        Address existingAddress = existingAddressOpt.get();
        // Create a new Address with updated details
        Address updatedAddress = new Address.Builder()
                .setId(existingAddress.getId())  // Keep the existing ID
                .setStreet(address.getStreet())
                .setCity(address.getCity())
                .setProvince(address.getProvince())
                .setPostalCode(address.getPostalCode())
                .setCountry(address.getCountry())
                .build();
        return addressRepository.save(updatedAddress);
    }
}
