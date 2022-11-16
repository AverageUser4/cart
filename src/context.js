import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // [{id, title, price, img, amount}]
  const [isLoading, setIsLoading] = useState(true);
  const [cart, cartDispatch] = useReducer(reducer, [])

  function changeItemAmount(itemID, increment = true) {
    cartDispatch({
      type: 'changeItemAmount',
      itemID, 
      increment
    });
  }

  function removeItem(itemID) {
    cartDispatch({ type: 'removeItem', itemID });
  }

  function overwriteCart(newCart) {
    cartDispatch({ type: 'overwriteCart', newCart });
  }

  async function fetchData() {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const json = await response.json();
  
      overwriteCart(json);
      setIsLoading(false);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        changeItemAmount,
        removeItem,
        clearCart: overwriteCart.bind(null, []),
        isLoading,
        fetchData
      }}
    >
      {children}
    </AppContext.Provider>
  )

}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { 
  AppContext,
  AppProvider,
  useGlobalContext
}
