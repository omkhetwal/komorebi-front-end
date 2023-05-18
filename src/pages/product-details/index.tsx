import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../../api/axios"
import Button from "../../components/button"
import Text from "../../components/text"
import useGlobalStore from "../../store"

const ProductDetails = () => {
  const { id } = useParams()

  const { addItemToCart, cart } = useGlobalStore()

  console.log(`cart`, JSON.stringify(cart, null, 2))

  const [product, setProduct] = useState<IProduct>()

  const getProduct = async () => {
    try {
      const response = await axios.get(`products/${id}`)

      setProduct(response.data)
    } catch (error) {
      console.log("error in getProduct", error)
      throw error
    }
  }

  useEffect(() => {
    getProduct()
    return () => {}
  }, [])

  return (
    <section className="mt-[82px]">
      <div className="grid grid-cols-2 mb-[180px] gap-10  mx-[50px]">
        <div className="">
          <img src={product?.image} className="h-[618px] object-cover" alt="" />
        </div>
        <div className="">
          <Text variant="heading-one">{product?.name}</Text>
          <Text variant="subheading-two" className="my-7">
            $ {product?.price}
          </Text>
          <Text variant="body-two">{product?.description}</Text>
          <Button
            size="small"
            className="mt-14"
            onClick={() => {
              if (!product) return
              const cartItem: RawCartItem = {
                image: product?.image,
                name: product?.name,
                price: product?.price,
                product: product?._id,
              }
              addItemToCart({
                ...cartItem,
              })
            }}
          >
            ADD TO BAG
          </Button>
        </div>
      </div>
      <div className="h-[622px] mb-[180px] overflow-hidden relative">
        <img
          src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743572/youtube/2023/march/komorebi-development/primaryimage_oblfj9.png"
          alt=""
          height={622}
          className="h-[622px] object-cover w-full"
        />
        <svg
          width="200"
          height="78"
          viewBox="0 0 200 78"
          className="absolute top-[45%] left-[45%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.3 28.35V32.05H46.7V28.35H3.3ZM22.95 16.05V62H26.9V16.05H22.95ZM22.1 30.25C17.85 39.55 9.6 49.05 1.35 53.5C2.25 54.3 3.5 55.7 4.2 56.7C12.6 51.55 20.7 41.75 25.35 31.35L22.1 30.25ZM27.65 30.3L24.5 31.45C29.25 41.45 37.45 51.4 45.6 56.55C46.25 55.55 47.55 54.05 48.5 53.3C40.45 48.85 32 39.35 27.65 30.3ZM53.9 19.15C56.6 20.8 60.25 23.15 62.05 24.7L64.3 21.65C62.45 20.25 58.8 18 56.15 16.5L53.9 19.15ZM51.95 32.75C54.75 34.25 58.65 36.55 60.55 37.95L62.7 34.85C60.75 33.55 56.85 31.45 54.05 30.05L51.95 32.75ZM74.1 46.1C75.7 47.25 77.8 48.9 78.9 50L80.55 47.95C79.5 47 77.35 45.4 75.75 44.35L74.1 46.1ZM74 53C75.6 54.35 77.7 56.15 78.8 57.3L80.5 55.35C79.5 54.25 77.35 52.55 75.7 51.35L74 53ZM85.6 45.95C87.25 47.15 89.35 48.85 90.5 49.95L92.05 47.95C90.95 46.95 88.8 45.35 87.15 44.25L85.6 45.95ZM85.3 52.75C86.9 54 89.05 55.8 90.15 56.9L91.8 54.95C90.7 53.9 88.6 52.2 86.95 51.05L85.3 52.75ZM52.5 59.4L55.9 61.4C58.05 56.75 60.6 50.55 62.5 45.3L59.45 43.3C57.45 48.95 54.55 55.5 52.5 59.4ZM70 39.4V61.95H73.1V42.35H94.4V39.4H70ZM68.1 17.8V20.95H92V25.8H68.1V28.95H95.6V17.8H68.1ZM66.1 17.8V32.25C66.1 40.45 65.65 51.75 60.5 59.75C61.4 60.1 62.85 61.15 63.5 61.75C68.85 53.3 69.6 40.85 69.6 32.25V17.8H66.1ZM93.2 39.4V58.7C93.2 59.25 93.05 59.4 92.5 59.4C91.95 59.4 90.15 59.45 88.1 59.35C88.5 60.15 88.95 61.25 89.05 62C92 62 93.85 62 95 61.55C96.1 61.1 96.45 60.3 96.45 58.7V39.4H93.2ZM68.35 32.5V35.6H97.25V32.5H68.35ZM81.45 33.75V61.7H84.65V33.75H81.45ZM148.7 54.2L148.05 49.95C145.5 52.6 142.85 54.05 140.5 54.05C138.7 54.05 137.85 52.7 137.85 51C137.85 45.95 139.75 37.35 139.75 32.35C139.75 28.3 137.45 25.65 132.75 25.65C126.6 25.65 118.3 32.85 115.2 36.25L115.15 41.2C119.85 35.5 127.1 29.3 131.8 29.3C134.35 29.3 135.8 30.55 135.8 33.45C135.8 38.3 133.95 46.5 133.95 52.1C133.95 56.2 136.15 58.4 139.5 58.4C142.9 58.4 146 56.9 148.7 54.2ZM115.1 30.3L114.7 31.65L114.5 34.25C112.55 37.55 105.8 46.7 102.7 50.6L105.2 54C108.35 49.65 113 42.9 115.3 39.35L116.8 32.5C117.65 31.1 119 28.95 119.85 27.65L118.4 25.95C116.1 26.7 109.85 27.45 107.2 27.6C105.95 27.7 105 27.7 103.9 27.65L104.35 31.8C108.05 31.2 113.45 30.55 115.1 30.3ZM114.6 22.05C114.6 23.9 113.4 39.75 113.3 44.15C113.25 49.65 113.2 52.15 113.2 57C113.2 57.8 113.15 59 113.05 59.95H117.35C117.3 59 117.15 57.75 117.1 56.9C116.9 52.45 116.9 49.4 116.9 44.85C116.9 36.05 118.4 21.75 119.1 18.5L114.4 18.35C114.65 19.6 114.6 20.9 114.6 22.05ZM158.8 19.4V61.45H162.65V23.2H187.6V61.25H191.55V19.4H158.8ZM161.35 36.75V40.45H189.25V36.75H161.35ZM161.3 54.45V58.2H189.35V54.45H161.3Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

export default ProductDetails
