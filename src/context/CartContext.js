import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return React.createElement(
    CartContext.Provider,
    { value: { cart, setCart } },
    children
  );
};

export const useCart = () => useContext(CartContext);