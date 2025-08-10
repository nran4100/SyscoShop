package com.syscoshop.cart_service.service;

import com.syscoshop.cart_service.dto.AddToCartRequest;
import com.syscoshop.cart_service.dto.CartDto;
import com.syscoshop.cart_service.model.Cart;
import com.syscoshop.cart_service.model.CartItem;
import com.syscoshop.cart_service.repository.CartRepository;
import com.syscoshop.cart_service.util.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public CartDto addOrUpdateCart(AddToCartRequest request) {
        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElse(CartMapper.createEmptyCart(request.getUserId()));

        // Update or add items without clearing whole list
        for (CartItem itemRequest : CartMapper.toCartItems(request.getItems(), cart)) {
            Optional<CartItem> existingItem = cart.getItems().stream()
                    .filter(i -> i.getProductId().equals(itemRequest.getProductId()))
                    .findFirst();

            if (existingItem.isPresent()) {
                CartItem existing = existingItem.get();
                existing.setQuantity(existing.getQuantity() + itemRequest.getQuantity());
            } else {
                cart.getItems().add(itemRequest);
            }

        }

        Cart savedCart = cartRepository.save(cart);
        return CartMapper.toDTO(savedCart);
    }

    @Override
    public CartDto getCartDtoByUserId(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
        return CartMapper.toDTO(cart);
    }

    @Override
    public CartDto createEmptyCart(String userId) {
        Cart cart = CartMapper.createEmptyCart(userId);
        Cart saved = cartRepository.save(cart);
        return CartMapper.toDTO(saved);
    }

    @Override
    public void deleteCartByUserId(String userId) {
        cartRepository.findByUserId(userId).ifPresent(cartRepository::delete);
    }

    @Override
    public CartDto removeItemFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        Cart saved = cartRepository.save(cart);
        return CartMapper.toDTO(saved);
    }
}
