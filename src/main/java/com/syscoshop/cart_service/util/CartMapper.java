package com.syscoshop.cart_service.util;

import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.dto.CartItemRequest;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.model.CartItem;
import com.syscoshop.cart_service.dto.CartItemDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CartMapper {

    public static CartDto toDTO(Cart cart) {
        return CartDto.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(cart.getItems().stream()
                        .map(item -> CartItemDto.builder()
                                .productId(item.getProductId())
                                .quantity(item.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public static Cart createEmptyCart(Long userId) {
        return Cart.builder()
                .userId(userId)
                .items(new ArrayList<>())
                .build();
    }

    public static List<CartItem> toCartItems(List<CartItemRequest> itemRequests, Cart cart) {
        return itemRequests.stream()
                .map(req -> CartItem.builder()
                        .productId(req.getProductId())
                        .quantity(req.getQuantity())
                        .cart(cart)
                        .build())
                .collect(Collectors.toList());
    }
}
