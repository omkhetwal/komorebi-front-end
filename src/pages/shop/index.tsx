import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import Button from "../../components/button"
import Text from "../../components/text"
import useGlobalStore from "../../store"

const Shop = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  const navigate = useNavigate()

  const { addItemToCart } = useGlobalStore()

  const getProducts = async () => {
    try {
      const response = await axios.get("/products")
      setProducts(response.data)
    } catch (error) {
      console.log("error in getProducts", error)
      throw error
    }
  }

  useEffect(() => {
    getProducts()
    return () => {}
  }, [])

  return (
    <>
      <section className="relative w-full h-[768px] flex items-end">
        <img
          className="absolute -z-10 aspect-[1.6] object-cover"
          src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743570/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_1_2_exnour.png"
          alt=""
        />
        <div className="mx-[50px] mb-40">
          <Text variant="heading-three" className="mb-3">
            Latest hoodie styles online
          </Text>
          <Text variant="body-two">Suit your unique preferences</Text>
        </div>
      </section>
      <section className="mx-[50px] bg-white">
        <Text variant="heading-one" className="mt-[82px]">
          Experience comfort and style
        </Text>
        <Text variant="body-two" className="mb-[80px]">
          Perfect blend of comfort, style, and quality materials
        </Text>
        <div className="grid grid-cols-3 gap-[38px] mb-[180px]">
          {products.map((productItem) => {
            return (
              <div className="" key={productItem._id}>
                <Link to={`/shop/${productItem._id}`}>
                  <div className="rounded-[18px]">
                    <img
                      src={productItem.image}
                      width={368}
                      height={368}
                      className="w-[368px] h-[368px]"
                    />
                  </div>
                </Link>
                <Text variant="heading-three" className="mt-7 mb-2">
                  {productItem.name}
                </Text>
                <Text variant="body-three">$ {productItem.price}</Text>
                <Button
                  size="small"
                  className="mt-7"
                  onClick={() => {
                    const cartItem: RawCartItem = {
                      image: productItem.image,
                      name: productItem.name,
                      price: productItem.price,
                      product: productItem._id,
                    }
                    addItemToCart(cartItem)
                    toast.success("Item added to cart")
                  }}
                >
                  Add to bag
                </Button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Shop
