package com.syscoshop.cart_service.util;

import java.util.Base64;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

public class JwtUtil {

    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * Decode JWT without verifying signature to extract 'sub' claim (userId).
     * @param token full JWT token (with or without "Bearer " prefix)
     * @return userId from 'sub' claim or null if cannot parse
     */
    public static String extractUserIdFromToken(String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String[] parts = token.split("\\.");
            if (parts.length < 2) return null;

            // JWT payload is the second part, base64url encoded
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]));

            Map<String, Object> payload = mapper.readValue(payloadJson, Map.class);

            // 'sub' is standard claim for user identifier
            return (String) payload.get("sub");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
