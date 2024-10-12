package za.ac.cput.dto;

import za.ac.cput.domain.Address;
import za.ac.cput.domain.Contact;
import za.ac.cput.domain.Name;
import za.ac.cput.domain.Role;

public class EmployeeRequest {
    private Name name;
    private Contact contact;
    private Address address;
    private String password;
    private Role role;

    // Getters and Setters
    public Name getName() { return name; }
    public void setName(Name name) { this.name = name; }

    public Contact getContact() { return contact; }
    public void setContact(Contact contact) { this.contact = contact; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

}
