package za.ac.cput.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;
import java.util.Objects;
/**
 * Customer.java
 * This is the Customer Domain program
 * @aurthor Zukhanye Anele Mene (219404275)
 * Date: 03 May 2024
 */
@Entity
public class Customer {
    @Id
    private int customerID;

    private String firstName;
    private String lastName;
    private String email;
    private String license;

    private String cellNo;

    private int rentalID;

    private String rentalAgentEmpNo;

    @OneToMany(mappedBy = "customer")
    private List<RentTruck> rentedTruck;

    @OneToOne (mappedBy = "customer")
    private List <Login> logins;
    protected Customer() {
    }

    public Customer(Builder builder) {
        this.customerID = builder.customerID;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.license = builder.license;
        this.cellNo = builder.cellNo;
        this.rentalID = builder.rentalID;
        this.rentalAgentEmpNo = builder.rentalAgentEmpNo;
        this.rentedTruck=builder.rentedTruck;
        this.logins=builder.logins;
    }

    public int getCustomerID() {
        return customerID;
    }

    public String getFirstName() {

        return firstName;
    }

    public String getLastName() {

        return lastName;
    }

    public String getEmail() {

        return email;
    }

    public String getLicense() {

        return license;
    }

    public String getCellNo() {

        return cellNo;
    }

    public int getRentalID() {

        return rentalID;
    }

    public String getRentalAgentEmpNo() {

        return rentalAgentEmpNo;
    }

    public List<RentTruck> getRentedTruck() {
        return rentedTruck;
    }

    public List<Login> getLogins() {
        return logins;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(customerID, customer.customerID) && Objects.equals(firstName, customer.firstName) && Objects.equals(lastName, customer.lastName) && Objects.equals(email, customer.email) && Objects.equals(license, customer.license) && Objects.equals(cellNo, customer.cellNo) && Objects.equals(rentalID,customer.rentalID) && Objects.equals(rentalAgentEmpNo, customer.rentalAgentEmpNo) && Objects.equals(rentedTruck, customer.rentedTruck)  && Objects.equals(logins, customer.logins);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerID, firstName, lastName, email, license, cellNo, rentalID, rentalAgentEmpNo, rentedTruck, logins);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerID='" + customerID + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", license='" + license + '\'' +
                ", cellNo='" + cellNo + '\'' +
                ", rentalID='" + rentalID + '\'' +
                ", rentalAgentEmpNo='" + rentalAgentEmpNo + '\'' +
                ", rentedTruck='" + rentedTruck + '\'' +
                ", login='" + logins + '\'' +
                '}';
    }

    public static class Builder {
        private int customerID;
        private String firstName;
        private String lastName;
        private String email;
        private String license;

        private String cellNo;

        private int rentalID;

        private String rentalAgentEmpNo;

        private List<RentTruck> rentedTruck;

        private List<Login> logins;

        public Builder setCustomerID(int customerID) {
            this.customerID = customerID;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setLicense(String license) {
            this.license = license;
            return this;
        }

        public Builder setCellNo(String cellNo) {
            this.cellNo = cellNo;
            return this;
        }

        public Builder setRentalID(int rentalID) {
            this.rentalID = rentalID;
            return this;
        }

        public Builder setRentalAgentEmpNo(String rentalAgentEmpNo) {
            this.rentalAgentEmpNo = rentalAgentEmpNo;
            return this;
        }

        public Builder setRentedTruck(List<RentTruck> rentedTruck ) {
            this.rentedTruck = rentedTruck;
            return this;
        }

        public Builder setLogin(List<Login> logins ) {
            this.logins = logins;
            return this;
        }

        public Builder copy(Customer customer) {
            this.customerID = customer.customerID;
            this.firstName = customer.firstName;
            this.lastName = customer.lastName;
            this.email = customer.email;
            this.license = customer.license;
            this.cellNo = customer.cellNo;
            this.rentalID = customer.rentalID;
            this.rentalAgentEmpNo = customer.rentalAgentEmpNo;
            this.rentedTruck = customer.rentedTruck;
            this.logins = customer.logins;
            return this;
        }

        public Customer build() {
            return new Customer(this);
        }
    }
}


