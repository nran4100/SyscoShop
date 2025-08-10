package com.syscoshop.cart_service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartDto {
    private Long id;
    private String userId;  // String now
    private List<CartItemDto> items;
}
