// model/Category.java
package com.syscoshop.categories_service.model;

import jakarta.persistence.*;
import lombok.*;

// model/Category.java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;  // Add this line
}

