// dto/CategoryRequest.java
package com.syscoshop.categories_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private String name;
    private String imageUrl;  // Add this line
}

