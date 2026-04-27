package com.barbearia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Ajuste para sua porta
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        // Simulação de autenticação (substitua por sua lógica real)
        if ("admin@barbearia.com".equals(email) && "123456".equals(password)) {
            Map<String, Object> response = Map.of(
                "token", "jwt-token-aqui-simulado",
                "user", Map.of(
                    "name", "Admin",
                    "email", email,
                    "role", "admin"
                )
            );
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest()
            .body(Map.of("message", "Email ou senha incorretos"));
    }
}