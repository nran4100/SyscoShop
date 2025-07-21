package com.syscoshop.cart_service.service;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.model.Cart;

public interface CartService {
    CartDto addOrUpdateCart(AddToCartRequest request);
    CartDto getCartDtoByUserId(Long userId);
}
