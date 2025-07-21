package com.syscoshop.cart_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDto {
    private Long productId;
    private Integer quantity;
}
