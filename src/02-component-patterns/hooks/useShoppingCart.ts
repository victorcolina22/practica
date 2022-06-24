import { useState } from "react";

import { Product } from "../interfaces/interfaces";

interface ProductInCart extends Product {
  count: number;
}

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<{
    [key: string]: ProductInCart;
  }>({});

  const onProductCountChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCart((oldShoppingCart) => {
      if (count === 0) {
        // const { [product.id]: toDelete, ...rest } = oldShoppingCart;
        // return rest;

        const newShoppingCart = { ...oldShoppingCart };
        delete newShoppingCart[product.id];
        return newShoppingCart;

        // delete oldShoppingCart[product.id];
        // return { ...oldShoppingCart };
      }

      return {
        ...oldShoppingCart,
        [product.id]: {
          ...product,
          count,
        },
      };
    });
  };

  return {
    shoppingCart,
    onProductCountChange
  }
}