package za.ac.cput.util;

import java.security.SecureRandom;
import java.util.UUID;


public class Helper {
    private static final SecureRandom random = new SecureRandom();
    public static boolean isNullOrEmpty(String s) {
        if (s == null || s.isEmpty())
            return true;
        return false;
    }

    public static boolean isIntNotValid(int i) {    //checks int
        if (i < 0)
            return true;
        return false;
    }

    public static boolean isDoubleNotValid(double d) {    //checks double
        if (d < 0)
            return true;
        return false;
    }

    public static boolean isValidEmail(String email) {
        String emailRegex = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        if (email == null) {
            return false;
        }
        return email.matches(emailRegex);
    }


    public static String generateVin() {
        // Generate a VIN with 18 characters (alphanumeric)
        return UUID.randomUUID().toString().substring(0, 18).toUpperCase();
    }
    public static String generateEmployeeNumber() {
        return String.format("%010d", random.nextInt(1000000000)); // Generates a 10-digit number
    }

    public static boolean isValidAddress(String address) {
        // Define regex patterns for validation
        String streetPattern = "^[a-zA-Z0-9\\s,.-]{1,50}$";  // Allowing a variety of street names
        String cityPattern = "^[a-zA-Z\\s]{1,50}$";         // Allowing city names with spaces
        String provincePattern = "^(Western Cape|WC|KwaZulu-Natal|KZN|Gauteng|GP|Mpumalanga|MP|Limpopo|LP|Free State|FS|North West|NW|Northern Cape|NC)$";
        String postalCodePattern = "^\\d{4}$";               // Exactly 4 digits for postal code
        String countryPattern = "^[a-zA-Z\\s]{1,50}$";       // Allowing country names with spaces

        // Split the address into components
        String[] addressComponents = address.split(",");
        if (addressComponents.length != 5) {
            return false;  // Must have exactly 5 components
        }

        // Validate each component
        return addressComponents[0].trim().matches(streetPattern) &&
                addressComponents[1].trim().matches(cityPattern) &&
                addressComponents[2].trim().matches(provincePattern) &&
                addressComponents[3].trim().matches(postalCodePattern) &&
                addressComponents[4].trim().matches(countryPattern);
    }

}
