// repository/ProductRepository.java
package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String>, ProductCustomRepository {
}
