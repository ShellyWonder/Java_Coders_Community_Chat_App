package com.wonderwebdev.a14_chatapp.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.wonderwebdev.a14_chatapp.service.SecurityUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final SecurityUserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, SecurityUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain chain)
                throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        System.out.println("JwtFilter: Checking Authorization Header");

        String username = null;
        String jwt = null;

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7);
                System.out.println("JwtFilter: JWT Token: " + jwt);
                username = jwtUtil.extractUsername(jwt);
                System.out.println("JwtFilter: Extracted username: " + username);
            } else {
                System.out.println("JwtFilter: No Bearer token found in request headers.");
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    System.out.println("JwtFilter: Authentication set for user: " + username);
                } else {
                    System.out.println("JwtFilter: Token validation failed for user: " + username);
                }
            } else {
                System.out.println("JwtFilter: Username is null or context already contains authentication.");
            }

        } catch (Exception e) {
            System.err.println("JwtFilter: Exception occurred");
            e.printStackTrace();
        }

        chain.doFilter(request, response);
    }
}
