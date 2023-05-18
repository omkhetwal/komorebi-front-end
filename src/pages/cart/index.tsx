import Button from "../../components/button"
import { toast } from "react-hot-toast"
import Icon from "../../components/icons"
import Text from "../../components/text"
import useGlobalStore from "../../store"
import { getCartTotal } from "../../helpers"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { cart, addItemToCart, removeItemFromCart } = useGlobalStore()
  const cartTotal = getCartTotal(cart)
  const navigate = useNavigate()
  return (
    <section className="mx-[50px]">
      <Text variant="heading-one" className="my-[82px]">
        Shopping cart
      </Text>
      <div className="space-y-[164px]">
        {cart.map((cartItem) => {
          return (
            <div className="flex items-start justify-between" key={cartItem.id}>
              <img
                src={cartItem.image}
                width={378}
                height={378}
                className="w-[378px] h-[378px] rounded-[18px] mr-[46px]"
                alt=""
              />
              <div className="flex flex-col w-full  justify-between">
                <div className="flex justify-between">
                  <Text variant="subheading-two">{cartItem.name}</Text>
                  <Text variant="subheading-two">$ {cartItem.price}</Text>
                </div>

                <div className="mt-[124px]  flex items-center space-x-7">
                  <button
                    onClick={() => {
                      removeItemFromCart(cartItem)
                      toast.error("Cart item removed")
                    }}
                  >
                    <Icon name="minus-icon" />
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => {
                      addItemToCart({
                        image: cartItem.image,
                        name: cartItem.name,
                        price: cartItem.price,
                        product: cartItem.product,
                      })
                      toast.success("Item added to cart")
                    }}
                  >
                    <Icon name="plus-icon" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="my-[82px]">
        <div className="border-[1.8px] border-black"></div>
      </div>
      <div className="flex items-center justify-between mb-[82px]">
        <Text variant="subheading-two">Subtotal</Text>
        <Text variant="subheading-two">USD ${cartTotal}</Text>
      </div>
      <Button
        className="mb-[180px] w-full"
        size="large"
        onClick={() => {
          navigate("/checkout/shipping")
        }}
      >
        Proceed to Check out
      </Button>
    </section>
  )
}

export default Cart
