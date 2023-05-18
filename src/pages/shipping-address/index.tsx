import clsx from "clsx"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import Button from "../../components/button"
import Icon from "../../components/icons"
import Text from "../../components/text"
import { getCartTotal } from "../../helpers"
import useGlobalStore from "../../store"

type FormData = {
  name: string
  email: string
  city: string
  address: string
}

type OrderDetailsType = {
  user: {
    name: string
    email: string
  }
  deliveryAddress: {
    address: string
    city: string
  }
  orderItems: ICartItem[]
}

const ShippingAddress = () => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>()
  const { cart, updateClientSecret } = useGlobalStore()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { address, city, email, name } = getValues()
      const orderDetails: OrderDetailsType = {
        deliveryAddress: {
          address,
          city,
        },
        user: {
          email,
          name,
        },
        orderItems: cart,
      }

      const response = await axios.post("/orders", {
        ...orderDetails,
      })
      console.log(response.data)
      updateClientSecret(response.data.clientSecret)
      navigate("/checkout/payment")
    } catch (error) {
      console.log("error", error)
    }
  })

  const cartTotal = getCartTotal(cart)

  return (
    <div className="my-[82px] mx-[50px] ">
      <Text variant="heading-three" className="mb-7">
        Shipping address
      </Text>
      <div className="grid grid-cols-2 gap-10">
        <form className="max-w-xl">
          {/* first name and last name section */}
          <div className="">
            <div className="flex flex-col items-start space-y-3 w-full">
              <label htmlFor="name" className="text-base font-semibold">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  maxLength: 20,
                })}
                className={clsx(
                  "p-5 rounded-[18px] border border-silver w-full",
                  {
                    "focus:outline-red focus:ring-red": errors.name,
                  }
                )}
              />
              {errors.name && (
                <span className="flex space-x-3">
                  <Icon name="exclamation-triangle-icon" />
                  <span className="text-red">Required field</span>
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-3 w-full mt-3">
              <label htmlFor="email" className="text-base font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: true,
                  maxLength: 20,
                })}
                placeholder="Email"
                className={clsx(
                  "p-5 rounded-[18px] border border-silver w-full",
                  {
                    "focus:outline-red focus:ring-red": errors.email,
                  }
                )}
              />
              {errors.email && (
                <span className="flex space-x-3">
                  <Icon name="exclamation-triangle-icon" />
                  <span className="text-red">Required field</span>
                </span>
              )}
            </div>
          </div>
          {/* city */}
          <div className="flex flex-col items-start mt-7 ">
            <label htmlFor="city" className="text-base font-semibold mb-3">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              {...register("city", {
                required: true,
                minLength: 5,
                maxLength: 6,
              })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.city,
                }
              )}
            />
            {errors.city && (
              <span className="flex space-x-3 mt-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          {/* address */}
          <div className="flex flex-col items-start mt-7 ">
            <label htmlFor="address" className="text-base font-semibold mb-3">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              {...register("address", {
                required: true,
                maxLength: 56,
              })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus:outline-red focus:ring-red": errors.address,
                }
              )}
            />
            {errors.address && (
              <span className="flex space-x-3 mt-3">
                <Icon name="exclamation-triangle-icon" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          <div className="flex justify-end mt-7">
            <Button onClick={onSubmit}>CONTINUE TO PAYMENT</Button>
          </div>
        </form>
        <div className="">
          <div className="space-y-7">
            {cart.map((cartItem) => {
              return (
                <div className="flex items-start" key={cartItem.id}>
                  <img
                    src={cartItem.image}
                    width={170}
                    height={170}
                    className="w-[170px] h-[170px] rounded-[18px] mr-[46px]"
                    alt=""
                  />
                  <div className="flex justify-between flex-1">
                    <Text variant="subheading-three">{cartItem.name}</Text>
                    <Text variant="subheading-three">
                      $ {cartItem.price} X {cartItem.quantity}
                    </Text>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Subtotal</Text>
            <Text variant="subheading-three">$ {cartTotal}</Text>
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Shipping</Text>
            <Text variant="subheading-three">Free</Text>
          </div>
          <div className="mt-[46px] mb-10 h-[1.8px] bg-black"></div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Total</Text>
            <Text variant="subheading-three">$ {cartTotal}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingAddress
