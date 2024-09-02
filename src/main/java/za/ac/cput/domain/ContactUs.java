package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;


@Entity
public class ContactUs {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contactUs_seq")
    @SequenceGenerator(name = "contactUs_seq", sequenceName = "contactUs_seq", allocationSize = 1, initialValue = 100)
    private int contactUsId;
    private String email;
    private String phone;
    private String address;
    private String businessHours;

    protected ContactUs() {
    }

    public ContactUs(Builder builder) {
        this.contactUsId = builder.contactUsId;
        this.email = builder.email;
        this.phone = builder.phone;
        this.businessHours = builder.businessHours;
        this.address = builder.address;
    }


    public int getContactUsId() {
        return contactUsId;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBusinessHours() {
        return businessHours;
    }

    public String getAddress() { return address; }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactUs contactUs = (ContactUs) o;
        return contactUsId == contactUs.contactUsId && Objects.equals(email, contactUs.email) && Objects.equals(phone, contactUs.phone) && Objects.equals(businessHours, contactUs.businessHours) && Objects.equals(address, contactUs.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(contactUsId, email, phone,businessHours , address);
    }

    @Override
    public String toString() {
        return "ContactUs{" +
                "contactUsId=" + contactUsId +
                "email=" + email +
                ", phone='" + phone + '\'' +
                ", businessHours='" + businessHours + '\'' +
                ", address='" + address + '\'' +
                '}';
    }


    public static class Builder{
        private int contactUsId;
        private String email;
        private String phone;
        private String businessHours;
        private String address;


        public Builder setContactUsId(int contactUsId) {
            this.contactUsId = contactUsId;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setAddress(String address) {
            this.address = address;
            return this;
        }

        public Builder setPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder setBusinessHours(String businessHours) {
            this.businessHours = businessHours;
            return this;
        }

        public Builder copy(ContactUs contactUs){
            this.contactUsId = contactUs.contactUsId;
            this.email = contactUs.email;
            this.phone = contactUs.phone;
            this.address = contactUs.address;
            this.businessHours = contactUs.businessHours;
            return this;
        }

        public ContactUs build() {
            return new ContactUs(this);
        }

    }
}