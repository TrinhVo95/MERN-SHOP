import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductsLoader = () => {
  return (
    <>
      {[...Array(8).keys()].map((item) => (
        <div key={item}>
          <Skeleton height={180} />
          <Skeleton weight={100} />
          <Skeleton />
        </div>
      ))}
    </>
  );
};

export default ProductsLoader;
