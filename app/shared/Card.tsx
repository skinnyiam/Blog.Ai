import React from "react";

type Props = {
  className?: string;
  imgHeight?: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
};

const Card = ({
  className,
  imgHeight,
  isLongForm = false,
  isSmallCard = false,
}: Props) => {
  return <div>Card</div>;
};

export default Card;
