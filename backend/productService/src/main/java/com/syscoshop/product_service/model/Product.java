package com.syscoshop.product_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashMap;
import java.util.Map;
import com.syscoshop.product_service.model.ProductUnit;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private String id;
    private String name;
    private double price;
    private int stockCount;
    private String supplierID;
    private Long categoryId;
    private String imageUrl;

    private ProductStatus status;  // Store enum as-is in MongoDB
    private ProductUnit unit;

    @Field
    @Builder.Default
    private Map<String, Object> extraFields = new HashMap<>();
}
