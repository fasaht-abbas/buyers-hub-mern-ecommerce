import { useContext, createContext, useState, useEffect } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exsistingItems = localStorage.getItem("cart");
    if (exsistingItems) {
      setCart(JSON.parse(exsistingItems));
    }
  }, []);
  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => useContext(cartContext);

export { useCart, CartProvider };
