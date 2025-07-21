package com.syscoshop.product_service.service;

import com.syscoshop.product_service.dto.ProductRequest;
import com.syscoshop.product_service.dto.ProductResponse;
import com.syscoshop.product_service.exception.ProductNotFoundException;
import com.syscoshop.product_service.model.Product;
import com.syscoshop.product_service.repository.ProductRepository;
import com.syscoshop.product_service.util.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.syscoshop.product_service.util.ProductMapper.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductServiceInterface {

    private final ProductRepository repository;

    @Override
    public void saveProduct(ProductRequest dto) {
        Product product = mapToProduct(dto);
        repository.save(product);
    }

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return repository.findAll(pageable)
                .map(ProductMapper::mapToProductResponse);
    }

    @Override
    public ProductResponse getProductById(String id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return mapToProductResponse(product);
    }

    @Override
    public void deleteProductById(String id) {
        if (!repository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        repository.deleteById(id);
    }

    @Override
    public ProductResponse updateProduct(String id, ProductRequest request) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        ProductMapper.updateProductFromRequest(product, request);
        return mapToProductResponse(repository.save(product));
    }


}
