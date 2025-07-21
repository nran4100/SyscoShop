package com.syscoshop.cart_service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> items;
}
