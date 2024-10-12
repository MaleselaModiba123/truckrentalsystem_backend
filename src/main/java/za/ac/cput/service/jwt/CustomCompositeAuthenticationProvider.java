package za.ac.cput.service.jwt;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class CustomCompositeAuthenticationProvider implements AuthenticationProvider {
    private final AuthenticationProvider employeeProvider;
    private final AuthenticationProvider customerProvider;

    public CustomCompositeAuthenticationProvider(AuthenticationProvider employeeProvider, AuthenticationProvider customerProvider) {
        this.employeeProvider = employeeProvider;
        this.customerProvider = customerProvider;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            // Try the employee provider
            return employeeProvider.authenticate(authentication);
        } catch (AuthenticationException e) {
            // If employee fails, try the customer provider
            return customerProvider.authenticate(authentication);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return employeeProvider.supports(authentication) || customerProvider.supports(authentication);
    }
}

