package com.syscoshop.cart_service.controller;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.service.CartService;
import com.syscoshop.cart_service.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Extract userId from JWT token in Authorization header
    private String extractUserId(String authHeader) {
        return JwtUtil.extractUserIdFromToken(authHeader);
    }

    @GetMapping
    public ResponseEntity<CartDto> getCurrentUserCart(@RequestHeader("Authorization") String authHeader) {
        String userId = extractUserId(authHeader);
        CartDto cartDto = cartService.getCartDtoByUserId(userId);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping
    public ResponseEntity<CartDto> createCart(@RequestHeader("Authorization") String authHeader) {
        String userId = extractUserId(authHeader);
        CartDto cartDto = cartService.createEmptyCart(userId);
        return ResponseEntity.ok(cartDto);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCart(@RequestHeader("Authorization") String authHeader) {
        String userId = extractUserId(authHeader);
        cartService.deleteCartByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addItemToCart(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody AddToCartRequest request) {
        // Ignore userId from request, override with token userId for safety
        String userId = extractUserId(authHeader);
        request.setUserId(userId);
        CartDto cartDto = cartService.addOrUpdateCart(request);
        return ResponseEntity.ok(cartDto);
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartDto> removeItemFromCart(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String productId) {
        String userId = extractUserId(authHeader);
        CartDto cartDto = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok(cartDto);
    }

}
