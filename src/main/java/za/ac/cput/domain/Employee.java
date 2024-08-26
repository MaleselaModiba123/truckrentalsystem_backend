package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Employee.java
 * This is the Domain program
 * @author Asimbonge Mbende (221090754)
 * Date: 03 May 2024
 */
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @Column(name = "employee_number", length = 10)
    private String employeeNumber;

    @Embedded
    private Name name;

    @Embedded
    private Contact contact;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    protected Employee() {
    }

    private Employee(Builder builder) {
        this.employeeNumber = builder.employeeNumber;
        this.name = builder.name;
        this.contact = builder.contact;
        this.address = builder.address;
        this.password = builder.password;
        this.role = builder.role;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public Name getName() {
        return name;
    }

    public Contact getContact() {
        return contact;
    }

    public Address getAddress() {
        return address;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(employeeNumber, employee.employeeNumber) &&
                Objects.equals(name, employee.name) &&
                Objects.equals(contact, employee.contact) &&
                Objects.equals(address, employee.address) &&
                Objects.equals(password, employee.password) &&
                role == employee.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeNumber, name, contact, address, password, role);
    }

    @Override
    public String toString() {
        return String.format(
                "Employee Details:\n" +
                        "Employee Number: %s\n" +
                        "Name: %s\n" +
                        "Contact: %s\n" +
                        "Address: %s\n" +
                        "Role: %s\n",
                employeeNumber, name, contact, address, role
        );
    }

    public static class Builder {
        private String employeeNumber;
        private Name name;
        private Contact contact;
        private Address address;
        private String password;
        private Role role;

        public Builder setEmployeeNumber(String employeeNumber) {
            this.employeeNumber = employeeNumber;
            return this;
        }

        public Builder setName(Name name) {
            this.name = name;
            return this;
        }

        public Builder setContact(Contact contact) {
            this.contact = contact;
            return this;
        }

        public Builder setAddress(Address address) {
            this.address = address;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setRole(Role role) {
            this.role = role;
            return this;
        }

        public Builder copy(Employee employee) {
            this.employeeNumber = employee.employeeNumber;
            this.name = employee.name;
            this.contact = employee.contact;
            this.address = employee.address;
            this.password = employee.password;
            this.role = employee.role;
            return this;
        }

        public Employee build() {
            return new Employee(this);
        }
    }
}
