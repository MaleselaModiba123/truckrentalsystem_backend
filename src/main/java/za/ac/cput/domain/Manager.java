package za.ac.cput.domain;
import jakarta.persistence.Entity;

import java.util.Objects;

/**
 * Ayanda Phumzile Khoza (218057172)
 * Date: 23 May 2024
 * */

@Entity
public class Manager extends Employee {
    private double wages;
    private int hours;

    protected Manager() {

    }

    private Manager(Builder builder) {
        this.wages = builder.wages;
        this.hours = builder.hours;
        this.firstName =  builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.employeeNumber = builder.employeeNumber;
        this.employeeType = builder.employeeType;
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
        Manager manager = (Manager) o;
        return Double.compare(wages, manager.wages) == 0 && hours == manager.hours;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), wages, hours);
    }

    @Override
    public String toString() {
        return "Manager{" +
                "wages=" + wages +
                ", hours=" + hours +
                ", employeeNumber='" + employeeNumber + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", employeeType='" + employeeType + '\'' +
                '}';
    }

    public static class Builder {

        private double wages;
        private int hours;
        private String employeeNumber;
        private String firstName;
        private String lastName;
        private String email;
        private String employeeType;

        public Builder setWages(double wages) {
            this.wages = wages;
            return this;
        }

        public Builder setHours(int hours) {
            this.hours = hours;
            return this;
        }

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

        public Builder setEmployeeType(String employeeType) {
            this.employeeType = employeeType;
            return this;
        }

        public Builder copy(Manager manager) {
            this.wages = manager.wages;
            this.hours = manager.hours;
            this.employeeNumber = manager.employeeNumber;
            this.firstName = manager.firstName;
            this.lastName = manager.lastName;
            this.email = manager.email;
            this.employeeType = manager.employeeType;
            return this;

        }

        public Manager build() {
            return new Manager(this);
        }
    }
}





