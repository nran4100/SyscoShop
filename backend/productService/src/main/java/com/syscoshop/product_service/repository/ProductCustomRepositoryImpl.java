// repository/ProductCustomRepositoryImpl.java
package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductCustomRepositoryImpl implements ProductCustomRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<Product> findProductsByAllOptionalFilters(
            String status,
            String supplierID,
            Long categoryId,
            String name,
            Double minPrice,
            Double maxPrice,
            Integer minStock,
            Integer maxStock,
            Pageable pageable) {

        List<Criteria> criteriaList = new ArrayList<>();

        if (status != null) {
            criteriaList.add(Criteria.where("status").is(status));
        }

        if (supplierID != null) {
            criteriaList.add(Criteria.where("supplierID").is(supplierID));
        }

        if (categoryId != null) {
            criteriaList.add(Criteria.where("categoryId").is(categoryId));
        }

        if (name != null) {
            criteriaList.add(Criteria.where("name").regex(name, "i")); // case-insensitive
        }

        if (minPrice != null || maxPrice != null) {
            Criteria priceCriteria = Criteria.where("price");
            if (minPrice != null) priceCriteria.gte(minPrice);
            if (maxPrice != null) priceCriteria.lte(maxPrice);
            criteriaList.add(priceCriteria);
        }

        if (minStock != null || maxStock != null) {
            Criteria stockCriteria = Criteria.where("stockCount");
            if (minStock != null) stockCriteria.gte(minStock);
            if (maxStock != null) stockCriteria.lte(maxStock);
            criteriaList.add(stockCriteria);
        }

        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        long total = mongoTemplate.count(query, Product.class);
        query.with(pageable);

        List<Product> products = mongoTemplate.find(query, Product.class);
        return new PageImpl<>(products, pageable, total);
    }
}
