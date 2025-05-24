package com.gense.controller;

import com.gense.model.User;
import com.gense.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User saved = userService.register(user);
        if (saved != null) {
            return ResponseEntity.ok("Registration successful");
        } else {
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        boolean maybeUser = userService.login(email, password);
        Map<String, Object> response = new HashMap<>();

        if (maybeUser.isPresent()) {
            response.put("message", "Login successful");
            response.put("user", maybeUser.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User user) {
        User updated = userService.updateProfile(user);
        return ResponseEntity.ok(updated);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<User> maybeUser = userService.getById(id);
        if (maybeUser.isPresent()) {
            return ResponseEntity.ok(maybeUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("User not found");
        }
    }
}
