export default function reducer(cart, action) {
  switch(action.type) {
    case 'changeItemAmount': {
      const noZeroAmountArray = cart.filter(item => 
        item.id !== action.itemID || item.amount > 1 || action.increment
      );

      if(noZeroAmountArray.length < cart.length)
        return noZeroAmountArray;

      return cart.map(item => {
        if(item.id === action.itemID)
          return {
            ...item,
            amount: action.increment ? item.amount + 1 : item.amount - 1
          };
  
        return item;
      });
    }

    case 'removeItem': {
      return cart.filter(item => item.id !== action.itemID);
    }

    case 'overwriteCart': {
      return action.newCart;
    }

    default: {
      throw new Error(`Unrecognized action.type: '${action.type}'`);
    }
  }
}