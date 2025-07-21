package com.syscoshop.cart_service.service;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.repository.CartRepository;
import com.syscoshop.cart_service.util.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public CartDto addOrUpdateCart(AddToCartRequest request) {
        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElse(CartMapper.createEmptyCart(request.getUserId()));

        cart.getItems().clear();
        cart.getItems().addAll(CartMapper.toCartItems(request.getItems(), cart));

        Cart savedCart = cartRepository.save(cart);
        return CartMapper.toDTO(savedCart);
    }

    @Override
    public CartDto getCartDtoByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
        return CartMapper.toDTO(cart);
    }

    @Override
    public CartDto createEmptyCart(Long userId) {
        Cart cart = CartMapper.createEmptyCart(userId);
        Cart saved = cartRepository.save(cart);
        return CartMapper.toDTO(saved);
    }

    @Override
    public void deleteCartByUserId(Long userId) {
        cartRepository.findByUserId(userId).ifPresent(cartRepository::delete);
    }

    @Override
    public CartDto removeItemFromCart(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        Cart saved = cartRepository.save(cart);
        return CartMapper.toDTO(saved);
    }

}
