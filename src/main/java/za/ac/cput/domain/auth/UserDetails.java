package za.ac.cput.domain.auth;

public class UserDetails {
    private String email;
    private String role;

    public UserDetails(String email, String role) {
        this.email = email;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}

