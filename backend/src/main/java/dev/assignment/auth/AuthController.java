package dev.assignment.auth;

import dev.assignment.auth.dto.AuthDtos;
import dev.assignment.security.JwtService;
import dev.assignment.user.Role;
import dev.assignment.user.User;
import dev.assignment.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")

public class AuthController {

    private final UserService userService;
    private final AuthenticationProvider authenticationProvider;
    private final JwtService jwtService;

    public AuthController(UserService userService, AuthenticationProvider authenticationProvider, JwtService jwtService) {
        this.userService = userService;
        this.authenticationProvider = authenticationProvider;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDtos.AuthResponse> register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
        Role role = (request.getRole() != null && request.getRole().equalsIgnoreCase("ADMIN")) ? Role.ADMIN : Role.USER;
        User user = userService.registerUser(request.getEmail(), request.getPassword(), role);
        String token = jwtService.generateToken(user);
        AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse();
        resp.setToken(token);
        resp.setRole(user.getRole().name());
        resp.setEmail(user.getEmail());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.AuthResponse> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        try {
            Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = (User) auth.getPrincipal();
            String token = jwtService.generateToken(user);
            AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse();
            resp.setToken(token);
            resp.setRole(user.getRole().name());
            resp.setEmail(user.getEmail());
            return ResponseEntity.ok(resp);
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}


