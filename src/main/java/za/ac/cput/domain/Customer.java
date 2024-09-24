package za.ac.cput.domain;


import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_seq")
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_seq", allocationSize = 1, initialValue = 1000)
    private int customerID;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    private String license;
    @Column(unique = true)
    private String cellNo;
    private String role = "CUSTOMER";
    private int rentalCount = 0;
    @OneToMany(mappedBy = "rentId",cascade = CascadeType.ALL)
    private List<RentTruck> rentedTruck;
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<AccidentReport> accidentReports;
//    @ManyToOne
//    @JoinColumn(name = "rentalAgentEmpNo", updatable = false)
//    private RentalAgent rentalAgent;

    protected Customer() {
    }

    public Customer(Builder builder) {
        this.customerID = builder.customerID;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.password=builder.password;
        this.license = builder.license;
        this.cellNo = builder.cellNo;
        this.rentalCount = builder.rentalCount;
        this.role = builder.role;
        this.accidentReports = builder.accidentReports;
        //this.rentedTruck=builder.rentedTruck;
//        this.rentalAgent=builder.rentalAgent;
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

    public String getPassword() {
        return password;
    }

    public String getLicense() {

        return license;
    }

    public String getCellNo() {

        return cellNo;
    }
    public String getRole() { // Getter for role
        return role;
    }
    public int getRentalCount() {
        return rentalCount;
    }

    public void incrementRentalCount() {
        this.rentalCount++;
    }
    public List<AccidentReport> getAccidentReports() {
        return accidentReports;
    }
//    public List<RentTruck> getRentedTruck() {
//        return rentedTruck;
//    }

//    public RentalAgent getRentalAgent() {
//        return rentalAgent;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return customerID == customer.customerID && Objects.equals(firstName, customer.firstName) && Objects.equals(lastName, customer.lastName) && Objects.equals(email, customer.email) && Objects.equals(password, customer.password) && Objects.equals(license, customer.license) && Objects.equals(cellNo, customer.cellNo) &&
                rentalCount == customer.rentalCount && Objects.equals(role, customer.role) && Objects.equals(rentedTruck, customer.rentedTruck) && Objects.equals(accidentReports, customer.accidentReports);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerID, firstName, lastName, email, password, license, cellNo, rentalCount,role, accidentReports, rentedTruck);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerID='" + customerID + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", license='" + license + '\'' +
                ", cellNo='" + cellNo + '\'' +
                ", rentalCount=" + rentalCount +
                ", role='" + role + '\'' +
                ", accidentReports=" + accidentReports +
             //   ", rentedTruck='" + rentedTruck + '\'' +
//                ", rentalAgent='" + rentalAgent.getEmployeeNumber() + '\'' +
                '}';
    }

    public static class Builder {
        private int customerID;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String license;
        private String cellNo;
        private int rentalCount = 0;
        private String role = "CUSTOMER";
        private List<AccidentReport> accidentReports;
       // private List<RentTruck> rentedTruck;

//        private RentalAgent rentalAgent;

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
        public Builder setPassword(String password) {
            this.password = password;
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
        public Builder setRentalCount(int rentalCount) {
            this.rentalCount = rentalCount;
            return this;
        }
        public Builder setRole(String role) { // Optional setter for role
            this.role = role;
            return this;
        }
        public Builder setAccidentReports(List<AccidentReport> accidentReports) {
            this.accidentReports = accidentReports;
            return this;
        }
//        public Builder setRentedTruck(List<RentTruck> rentedTruck ) {
//            this.rentedTruck = rentedTruck;
//            return this;
//        }

//        public Builder setRentalAgent(RentalAgent rentalAgent ) {
//            this.rentalAgent = rentalAgent;
//            return this;
//        }

        public Builder copy(Customer customer) {
            this.customerID = customer.customerID;
            this.firstName = customer.firstName;
            this.lastName = customer.lastName;
            this.email = customer.email;
            this.password = customer.password;
            this.license = customer.license;
            this.cellNo = customer.cellNo;
            this.rentalCount = customer.rentalCount;
            this.role = customer.role;
            this.accidentReports = customer.accidentReports;
            //  this.rentedTruck = customer.rentedTruck;
//            this.rentalAgent = customer.rentalAgent;
            return this;
        }

        public Customer build() {
            return new Customer(this);
        }
    }
}


