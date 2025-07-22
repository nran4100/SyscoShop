package com.syscoshop.product_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Long supplierID;
    private Long categoryId;
}
