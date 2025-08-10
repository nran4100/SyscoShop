package com.syscoshop.cart_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddToCartRequest {
    private String userId; // Changed to String
    private List<CartItemRequest> items;
}
