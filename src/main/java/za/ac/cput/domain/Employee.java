package za.ac.cput.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import java.util.Objects;

/**
 * Employee.java
 * This is the Domain program
 * @aurthor Asimbonge Mbende (221090754)
 * Date: 03 May 2024
 */
@MappedSuperclass
public class Employee {
    @Id
    protected String employeeNumber;
    protected String firstName;
    protected String lastName;
    @Column(unique = true)
    protected String email;
    protected String employeeType;

    protected Employee() {
    }


    public String getEmployeeNumber() {
        return employeeNumber;
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

    public String getEmployeeType() {
        return employeeType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(employeeNumber, employee.employeeNumber) && Objects.equals(firstName, employee.firstName) && Objects.equals(lastName, employee.lastName) && Objects.equals(email, employee.email) && Objects.equals(employeeType, employee.employeeType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeNumber, firstName, lastName, email, employeeType);
    }

    @Override
    public String toString() {
        return String.format(
                "Employee Details:\n" +
                        "Employee Number: %s\n" +
                        "First Name: %s\n" +
                        "Last Name: %s\n" +
                        "Email: %s\n" +
                        "Employee Type: %s\n",
                employeeNumber, firstName, lastName, email, employeeType
        );
    }

}
