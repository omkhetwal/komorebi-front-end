interface IProduct {
  _id: string
  name: string
  image: string
  description: string
  price: number
}

interface ICartItem {
  name: string
  id: string
  price: number
  image: string
  quantity: number
  product: string
}

type RawCartItem = Pick<ICartItem, "image" | "name" | "product" | "price">
