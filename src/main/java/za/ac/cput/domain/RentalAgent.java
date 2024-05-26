package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;
/*  Completed By Malesela Modiba
    23 May 2024
 */
@Entity
public class RentalAgent extends Employee{
    private double wages;
    private int hours;

    @OneToMany(mappedBy = "customerID",cascade = CascadeType.ALL, orphanRemoval = true)
    private List < Customer> customerID;

    protected RentalAgent(){

    }
    private RentalAgent(Builder builder) {
        this.employeeNumber = builder.employeeNumber;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.wages = builder.wages;
        this.hours = builder.hours;
    }

    public double getWages() {
        return wages;
    }

    public int getHours() {
        return hours;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        RentalAgent that = (RentalAgent) o;
        return Double.compare(wages, that.wages) == 0 && hours == that.hours;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), wages, hours);
    }

    @Override
    public String toString() {
        return "RentalAgent{" +
                "wages=" + wages +
                ", hours=" + hours +
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

        public Builder copy(RentalAgent rentalAgent) {
            this.employeeNumber = rentalAgent.employeeNumber;
            this.firstName = rentalAgent.firstName;
            this.lastName = rentalAgent.lastName;
            this.email = rentalAgent.email;
            this.wages = rentalAgent.wages;
            this.hours = rentalAgent.hours;
            return this;
        }
        public RentalAgent build(){
            return new RentalAgent(this);
        }
    }
}
