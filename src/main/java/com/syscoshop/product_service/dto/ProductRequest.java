package com.syscoshop.product_service.dto;

import com.syscoshop.product_service.model.ProductStatus;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.syscoshop.product_service.model.ProductUnit;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ProductRequest {

    @NotBlank
    private String name;

    @NotNull
    @Min(0)
    private Double price;

    @NotNull
    @Min(0)
    private Integer stockCount;

    @NotNull
    private String supplierID;  // remains String (AWS Cognito sub)

    @NotNull
    private Long categoryId;

    private String imageUrl;

    @NotNull  // Make status mandatory
    private ProductStatus status;

    @NotNull
    private ProductUnit unit;


    // Any additional request fields
    private Map<String, Object> extraFields = new HashMap<>();

    @JsonAnySetter
    public void setExtraField(String key, Object value) {
        this.extraFields.put(key, value);
    }
}
