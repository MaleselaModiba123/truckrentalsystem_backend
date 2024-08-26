package za.ac.cput.domain;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class Contact implements Serializable {
    private String email;
    private String cellNumber;

    protected Contact() {}

    public Contact(String email, String cellNumber) {
        this.email = email;
        this.cellNumber = cellNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getCellNumber() {
        return cellNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return Objects.equals(email, contact.email) &&
                Objects.equals(cellNumber, contact.cellNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, cellNumber);
    }

    @Override
    public String toString() {
        return String.format("Email: %s, Cell Number: %s", email, cellNumber);
    }
}
