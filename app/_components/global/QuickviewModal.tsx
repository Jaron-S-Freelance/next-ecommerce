import Product from "@/types/models/product";
import Image from "next/image";
import Rating from "../ui/products/Rating";
import AddToCart from "../ui/products/AddToCart";

interface QuickviewModalProps {
  product: Product;
  modalId: string;
}

const QuickviewModal = ({ product, modalId }: QuickviewModalProps) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <dialog className="modal">
        <div className="modal-box scrollable-content">
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <QuickviewContent product={product} />
        </div>

        <label className="modal-backdrop" htmlFor={modalId}>
          Close
        </label>
      </dialog>
    </>
  );
};

interface QuickviewContentProps {
  product: Product;
}

const QuickviewContent = ({ product }: QuickviewContentProps) => {
  const { title, imageUrl } = product;
  return (
    <div className="min-h-screen w-full flex flex-col py-4 px-8">
      <h2 className="font-bold text-3xl mb-4">{title}</h2>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
        alt={""}
        width={392}
        height={392}
      />
      <AddToCart product={product} />
      <Description product={product} />
    </div>
  );
};

interface DescriptionProps {
  product: Product;
}

const Description = ({ product }: DescriptionProps) => {
  const { description, price, rating } = product;
  return (
    <div>
      <div className="flex">
        <Rating rating={rating} />
      </div>
      <span className="text-2xl">${price}.00</span>
      <p className="py-4">{description}</p>
    </div>
  );
};

export default QuickviewModal;
