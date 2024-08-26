package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Address;

import static org.junit.jupiter.api.Assertions.*;

class AddressFactoryTest {

    @Test
    void createAddressValid() {
        // Example of a valid Cape Town address
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "Western Cape", "8001", "South Africa");
        assertNotNull(address, "Address should be created with valid inputs.");
        assertEquals("123 Long Street", address.getStreet());
        assertEquals("Cape Town", address.getCity());
        assertEquals("Western Cape", address.getProvince());
        assertEquals("8001", address.getPostalCode());
        assertEquals("South Africa", address.getCountry());
        System.out.println(address);
    }

    @Test
    void createAddressValidAbbreviation() {
        // Example of a valid address using province abbreviation
        Address address = AddressFactory.createAddress("456 Short Street", "Durban", "KZN", "4001", "South Africa");
        assertNotNull(address, "Address should be created with valid inputs using abbreviation.");
        assertEquals("456 Short Street", address.getStreet());
        assertEquals("Durban", address.getCity());
        assertEquals("KZN", address.getProvince());
        assertEquals("4001", address.getPostalCode());
        assertEquals("South Africa", address.getCountry());
        System.out.println(address);
    }

    @Test
    void createAddressInvalidProvinceNumeric() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "1234", "8001", "South Africa");
        assertNull(address, "Address should be null with a numeric province.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidProvinceSpecialChars() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "West@Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with special characters in the province.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidProvinceInvalidName() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "East Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with an invalid province name.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidStreet() {
        Address address = AddressFactory.createAddress("", "Cape Town", "Western Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with an empty street.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidCity() {
        Address address = AddressFactory.createAddress("123 Long Street", "1234", "Western Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with an invalid city.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidPostalCode() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "Western Cape", "INVALID", "South Africa");
        assertNull(address, "Address should be null with an invalid postal code.");
        System.out.println(address);
    }

    @Test
    void createAddressInvalidCountry() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "Western Cape", "8001", "");
        assertNull(address, "Address should be null with an empty country.");
        System.out.println(address);
    }

    @Test
    void createAddressWithNullStreet() {
        Address address = AddressFactory.createAddress(null, "Cape Town", "Western Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with a null street.");
        System.out.println(address);
    }

    @Test
    void createAddressWithNullCity() {
        Address address = AddressFactory.createAddress("123 Long Street", null, "Western Cape", "8001", "South Africa");
        assertNull(address, "Address should be null with a null city.");
        System.out.println(address);
    }

    @Test
    void createAddressWithNullProvince() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", null, "8001", "South Africa");
        assertNull(address, "Address should be null with a null province.");
        System.out.println(address);
    }

    @Test
    void createAddressWithNullPostalCode() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "Western Cape", null, "South Africa");
        assertNull(address, "Address should be null with a null postal code.");
        System.out.println(address);
    }

    @Test
    void createAddressWithNullCountry() {
        Address address = AddressFactory.createAddress("123 Long Street", "Cape Town", "Western Cape", "8001", null);
        assertNull(address, "Address should be null with a null country.");
        System.out.println(address);
    }
}
