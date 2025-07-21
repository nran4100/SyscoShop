package com.syscoshop.cart_service.controller;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartDto> addToCart(@RequestBody AddToCartRequest request) {
        CartDto cartDto = cartService.addOrUpdateCart(request);
        return ResponseEntity.ok(cartDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Long userId) {

        CartDto cartDto = cartService.getCartDtoByUserId(userId);
        return ResponseEntity.ok(cartDto);
    }
}
