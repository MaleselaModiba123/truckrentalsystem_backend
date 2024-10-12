package za.ac.cput.domain.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import za.ac.cput.domain.Employee;
import za.ac.cput.domain.Role;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class EmpUserPrincipal implements UserDetails {

    private final Employee employee;

    public EmpUserPrincipal(Employee employee) {
        this.employee = employee;
    }

//        @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(new SimpleGrantedAuthority("ADMIN"));
//    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();

        // Check the employee's role directly
        if (employee.getContact() != null) {
            if (employee.getRole() == Role.ADMIN) {
                authorities.add(new SimpleGrantedAuthority("ADMIN"));
            }
            if (employee.getRole() == Role.HELP_DESK) {
                authorities.add(new SimpleGrantedAuthority("HELP_DESK"));
            }
        }

        return authorities;
    }


    @Override
    public String getPassword() {
        return employee.getPassword();
    }

    @Override
    public String getUsername() {
        return employee.getContact().getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

