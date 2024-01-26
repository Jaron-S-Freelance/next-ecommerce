import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

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
    <div className="flex justify-center my-2 gap-0.5">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>{renderStar(index)}</span>
      ))}
    </div>
  );
};

export default Rating;
