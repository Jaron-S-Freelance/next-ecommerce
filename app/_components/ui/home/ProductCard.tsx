import Product from "@/types/models/product";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCartPlus, FaEye } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, description, price, imageUrl, category } = product;

  const router = useRouter();

  const scaleControls = useAnimation();
  const buttonTopControls = useAnimation();
  const buttonBottomControls = useAnimation();

  useEffect(() => {
    scaleControls.start({ scale: 1, filter: "blur(0px)" });
    buttonTopControls.start({ x: "-2rem" });
    buttonBottomControls.start({ x: "2rem" });
  }, [scaleControls, buttonTopControls, buttonBottomControls]);

  const handleMouseEnter = () => {
    scaleControls.start({ scale: 1.1, filter: "blur(4px)" });
    buttonTopControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
    buttonBottomControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleMouseLeave = () => {
    scaleControls.start({ scale: 1, filter: "blur(0px)" });
    buttonTopControls.start({
      x: "-2rem",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
    buttonBottomControls.start({
      x: "2rem",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleNavigateToProduct = () => {
    router.push(`/product/${id}`);
  };

  const handleAddCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handleQuickViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div
        className="overflow-hidden flex justify-center items-end relative rounded-3xl cursor-pointer"
        style={{ width: "250px", height: "300px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleNavigateToProduct}
      >
        <motion.div
          animate={scaleControls}
          className="w-full h-full transition duration-300 ease-in-out"
        >
          <Image
            src={imageUrl}
            alt={category}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
            animate={buttonTopControls}
            initial={{ opacity: 0 }}
          >
            <button
              className="btn rounded-3xl mx-8"
              onClick={handleQuickViewClick}
            >
              <FaEye />
              Quick View
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
            animate={buttonBottomControls}
            initial={{ opacity: 0 }}
          >
            <button
              className="btn rounded-3xl mx-8"
              onClick={handleAddCartClick}
            >
              <FaCartPlus />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
      <Rating rating={5} />
      <h3 className="text-center font-medium">
        <Link href={`/product/${id}`}>{title}</Link>
      </h3>
      <span className="flex justify-center">${price.toFixed(2)}</span>
    </div>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  const renderStar = (index: number) => {
    if (rating >= index + 1) {
      return <BsStarFill />;
    } else if (rating >= index + 0.5) {
      return <BsStarHalf />;
    } else {
      return <BsStar />;
    }
  };

  return (
    <div className="flex justify-center m-2 gap-0.5">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>{renderStar(index)}</span>
      ))}
    </div>
  );
};

export default ProductCard;
