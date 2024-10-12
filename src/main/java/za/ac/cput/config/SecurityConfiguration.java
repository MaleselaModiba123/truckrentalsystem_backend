package za.ac.cput.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import za.ac.cput.service.CustomUserDetailsService;
import za.ac.cput.service.EmpUserDetailsService;
import za.ac.cput.service.jwt.CustomCompositeAuthenticationProvider;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    private final CustomUserDetailsService customUserDetailsService;
    private final EmpUserDetailsService empUserDetailsService;
    private final JwtAuthFilter jwtAuthFilter;


    public SecurityConfiguration(CustomUserDetailsService customUserDetailsService,
                                 EmpUserDetailsService empUserDetailsService, JwtAuthFilter jwtAuthFilter) {
        this.customUserDetailsService = customUserDetailsService;
        this.empUserDetailsService = empUserDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
//                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/", "/customer/create", "/customer/authenticate", "/employees/authenticate",
                                "/branch/getAll", "/contactUs/getAll", "/truck/getAll",
                                "/truck/{vin}", "/truck/image/{vin}",
                                "truck/available", "/rentTruck/create").permitAll()
//                        .requestMatchers("/employees/**").hasAuthority("ADMIN")
                        .requestMatchers("/employees/**").hasAnyAuthority("ADMIN", "HELP_DESK")
//                        .requestMatchers("/employees/**").hasAuthority("HELP_DESK")
//                        .requestMatchers("/helpDesk/**").hasAnyAuthority("HELP_DESK")
                        .requestMatchers("/customer/**").hasAuthority("CUSTOMER")
                        .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();


    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider empDaoProvider = new DaoAuthenticationProvider();
        empDaoProvider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        empDaoProvider.setUserDetailsService(empUserDetailsService);

        DaoAuthenticationProvider customDaoProvider = new DaoAuthenticationProvider();
        customDaoProvider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        customDaoProvider.setUserDetailsService(customUserDetailsService);

        // Use the custom composite provider
        return new CustomCompositeAuthenticationProvider(empDaoProvider, customDaoProvider);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
