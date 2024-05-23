package za.ac.cput.domain;

import jakarta.persistence.Entity;

import java.util.Objects;

@Entity
public class RentalAgent extends Employee{
    private double wages;
    private int hours;
    private int customerID;

    protected RentalAgent(){

    }
    private RentalAgent(Builder builder) {
        this.employeeNumber = builder.employeeNumber;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.wages = builder.wages;
        this.hours = builder.hours;
        this.customerID = builder.customerID;
    }

    public double getWages() {
        return wages;
    }

    public int getHours() {
        return hours;
    }

    public int getCustomerID() {
        return customerID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        RentalAgent that = (RentalAgent) o;
        return Double.compare(wages, that.wages) == 0 && hours == that.hours && customerID == that.customerID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), wages, hours, customerID);
    }

    @Override
    public String toString() {
        return "RentalAgent{" +
                "wages=" + wages +
                ", hours=" + hours +
                ", customerID=" + customerID +
                ", employeeNumber='" + employeeNumber + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", employeeType='" + employeeType + '\'' +
                '}';
    }
    public static class Builder{
        private String employeeNumber;
        private String firstName;
        private String lastName;
        private String email;
        private double wages;
        private int hours;
        private int customerID;

        public Builder setEmployeeNumber(String employeeNumber) {
            this.employeeNumber = employeeNumber;
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

        public Builder setWages(double wages) {
            this.wages = wages;
            return this;
        }

        public Builder setHours(int hours) {
            this.hours = hours;
            return this;
        }

        public Builder setCustomerID(int customerID) {
            this.customerID = customerID;
            return this;
        }
        public Builder copy(RentalAgent rentalAgent) {
            this.employeeNumber = rentalAgent.employeeNumber;
            this.firstName = rentalAgent.firstName;
            this.lastName = rentalAgent.lastName;
            this.email = rentalAgent.email;
            this.wages = rentalAgent.wages;
            this.hours = rentalAgent.hours;
            this.customerID = rentalAgent.customerID;
            return this;
        }
        public RentalAgent build(){
            return new RentalAgent(this);
        }
    }
}
