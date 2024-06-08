package com.wonderwebdev.a14_chatapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeHttpRequests ->
                authorizeHttpRequests
                    .requestMatchers("/login", "/register", "/public/**").permitAll()
                    .anyRequest().authenticated()
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")
                    .defaultSuccessUrl("/channels", true)
                    .permitAll()
            )
            .logout(logout ->
                logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout")
                    .permitAll()
            )
            .httpBasic(withDefaults()); // Using withDefaults() instead of httpBasic()

        return http.build();
    }
}
