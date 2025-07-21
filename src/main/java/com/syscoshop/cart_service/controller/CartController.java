package com.syscoshop.cart_service.controller;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCurrentUserCart(@RequestParam Long userId) {
        CartDto cartDto = cartService.getCartDtoByUserId(userId);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping
    public ResponseEntity<CartDto> createCart(@RequestParam Long userId) {
        CartDto cartDto = cartService.createEmptyCart(userId);
        return ResponseEntity.ok(cartDto);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCart(@RequestParam Long userId) {
        cartService.deleteCartByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addItemToCart(@RequestBody AddToCartRequest request) {
        CartDto cartDto = cartService.addOrUpdateCart(request);
        return ResponseEntity.ok(cartDto);
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartDto> removeItemFromCart(
            @RequestParam Long userId,
            @PathVariable Long productId) {
        CartDto cartDto = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok(cartDto);
    }
}
