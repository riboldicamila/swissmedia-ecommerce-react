import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    let exist = isInCart(producto.id);

    if (exist) {
      let newCart = cart.map((element) => {
        if (element.id === producto.id) {
          return {
            ...element,
            quantity: element.quantity + producto.quantity,
          };
        } else {
          return element;
        }
      });

      setCart(newCart);
    } else {
      setCart([...cart, producto]);
    }
  };

  const isInCart = (id) => {
    return cart.some((element) => element.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, element) => {
      return acc + element.quantity;
    }, 0);
  };

  const getTotalPrice = () => {
    let totalPrice = cart.reduce((acc, element) => {
      return acc + element.quantity * element.price;
    }, 0);

    return totalPrice;
  };

  const deleteProductById= (id) => {
    const newCart = cart.filter ((element) => element.id !== id)
    setCart(newCart)
  }

  const getQuantityById = (id)=>{

    const productSelected = cart.find( (element)=> element.id === id)
    return productSelected?.quantity
  }

  let data = {
    cart,
    addToCart,
    clearCart,
    getTotalQuantity,
    getTotalPrice,
    deleteProductById,
    getQuantityById
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
