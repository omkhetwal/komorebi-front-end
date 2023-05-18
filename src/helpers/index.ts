export const getCartTotal = (cart: ICartItem[]) => {
  return cart.reduce((amount, item) => amount + item.price * item.quantity, 0)
}

export const getCartLength = (cart: ICartItem[]) => {
  return cart.reduce((length, item) => length + item.quantity, 0)
}
