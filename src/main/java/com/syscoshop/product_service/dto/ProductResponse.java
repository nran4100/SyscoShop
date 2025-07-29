package com.syscoshop.product_service.dto;

import com.syscoshop.product_service.model.ProductStatus;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.syscoshop.product_service.model.ProductUnit;
import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String id;
    private String name;
    private double price;
    private int stockCount;
    private String supplierID;
    private Long categoryId;
    private String imageUrl;

    private ProductStatus status;  // Include status in response
    private ProductUnit unit;


    @Builder.Default
    private Map<String, Object> extraFields = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getExtraFields() {
        return extraFields;
    }

    @JsonAnySetter
    public void setExtraField(String key, Object value) {
        this.extraFields.put(key, value);
    }
}
