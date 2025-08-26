"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks";
import { calculateDiscount } from "@/helpers";

const INIT_STATE = {
  cartItems: [],
  wishlists: [],
  addToCart: () => {},
  toggleToWishlist: () => {},
  isInWishlist: () => false,
  isInCart: () => false,
  removeFromCart: () => {},
  updateQuantityForDish: () => {},
  getCalculatedOrder: () => {
    return {
      orderTotal: 0,
      tax: 0,
      total: 0,
      totalDiscount: 0,
    };
  },
  getCartItemById: () => undefined,
};

const ShopContext = createContext(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within an ShopProvider");
  }
  return context;
};

const ShopProvider = ({ children }) => {
  const [state, setState] = useLocalStorage("__Yum_Next_Session__", INIT_STATE);

  const addToCart = (dish, quantity) => {
    const cartItems = state.cartItems;
    if (isInCart(dish)) {
      return;
    }
    cartItems.push({
      id: state.cartItems.length + 1,
      dish: dish,
      quantity: quantity,
      dish_id: dish.id,
    });
    updateState({ cartItems });
  };

  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCalculatedOrder = useCallback(() => {
    let cartTotal = 0,
      cartDiscount = 0;

    state.cartItems.forEach((cart) => {
      // cartDiscount += cart.dish.Selling_Price * cart.quantity;
      // cartTotal += cart.dish.Cost_Price * cart.quantity;
      
      cartDiscount = discountAmount;
      cartTotal += cart.dish.Selling_Price * cart.quantity;
      // cartDiscount += calculateDiscount(cart.dish) * cart.quantity;
      // cartTotal += cart.dish.price * cart.quantity;
    });

    // const cartAmount = cartTotal - cartDiscount;
    const cartAmount = cartTotal - cartDiscount
    // const tax = cartAmount * 0.18;
    const tax = cartAmount * 0.0825;

    return {
      total: cartAmount + tax,
      totalDiscount: cartDiscount,
      tax: tax,
      orderTotal: cartTotal,
    };
  }, [state.cartItems, discountAmount, totalPrice]);

  const getCartItemById = (dish) => {
    return state.cartItems.find((item) => item.dish_id == dish?.id);
  };

  const removeFromCart = (dish) => {
    let cartItems = state.cartItems;
    cartItems = cartItems.filter((cart) => cart.dish_id != dish.id);
    updateState({ cartItems });
  };

  const removeAllCart = () => {
    let cartItems = state.cartItems;
    cartItems = [];
    updateState({ cartItems });
  };

  const isInCart = (dish) => {
    return (
      state.cartItems.find(
        (wishlistDish) => wishlistDish?.dish_id == dish?.id
      ) != null
    );
  };

  const isInWishlist = (dish) => {
    return (
      state.wishlists.find((wishlistDish) => wishlistDish?.id == dish?.id) !=
      null
    );
  };

  const updateQuantityForDish = (dish, quantity) => {
    updateState({
      cartItems: state.cartItems.map((cartItem) => {
        if (cartItem.dish_id == dish.id) {
          return {
            ...cartItem,
            quantity: quantity,
          };
        }
        return cartItem;
      }),
    });
  };

  const toggleToWishlist = (dish) => {
    let wishlists = state.wishlists;
    if (isInWishlist(dish)) {
      wishlists = wishlists.filter((p) => p.id != dish.id);
    } else {
      wishlists.push(dish);
    }
    updateState({ wishlists });
  };

  const updateState = (changes) => setState({ ...state, ...changes });

  return (
    <ShopContext.Provider
      value={useMemo(
        () => ({
          ...state,
          addToCart,
          toggleToWishlist,
          isInWishlist,
          isInCart,
          removeFromCart,
          removeAllCart,
          updateQuantityForDish,
          getCalculatedOrder,
          getCartItemById,
          discountAmount,
          setDiscountAmount,
          totalPrice,
          setTotalPrice,
        }),
        [state, isInWishlist, isInCart, discountAmount, totalPrice]
      )}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
