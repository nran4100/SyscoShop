package com.syscoshop.cart_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddToCartRequest {
    private Long userId;
    private List<CartItemRequest> items;
}
