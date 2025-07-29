package com.syscoshop.cart_service.service;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;

public interface CartService {
    CartDto addOrUpdateCart(AddToCartRequest request);
    CartDto getCartDtoByUserId(String userId);
    CartDto createEmptyCart(String userId);
    void deleteCartByUserId(String userId);
    CartDto removeItemFromCart(String userId, String productId);
}
