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
      const productInCart: ProductInCart = oldShoppingCart[product.id] || {
        ...product,
        count: 0,
      };

      if (Math.max(productInCart.count + count, 0)) {
        productInCart.count += count;
        return {
          ...oldShoppingCart,
          [product.id]: productInCart,
        };
      }

      // Eliminar objeto utilizando desestructuración y operador rest
      const { [product.id]: toDelete, ...rest } = oldShoppingCart;
      return { ...rest };

      // if (count === 0) {
      //   // const { [product.id]: toDelete, ...rest } = oldShoppingCart;
      //   // return rest;

      //   const toDelete = { ...oldShoppingCart };
      //   delete toDelete[product.id];
      //   return toDelete;

      //   // delete oldShoppingCart[product.id];
      //   // return { ...oldShoppingCart };
      // }

      // return {
      //   ...oldShoppingCart,
      //   [product.id]: {
      //     ...product,
      //     count,
      //   },
      // };
    });
  };

  return {
    shoppingCart,
    onProductCountChange
  }
}