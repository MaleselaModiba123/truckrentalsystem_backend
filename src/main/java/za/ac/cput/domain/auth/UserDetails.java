package za.ac.cput.domain.auth;

public class UserDetails {
    private final String email;
    private final String password;
    private final String role;

    public UserDetails(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    @Override
    public String toString() {
        return String.format("Email: %s, Role: %s", email, role);
    }
}
