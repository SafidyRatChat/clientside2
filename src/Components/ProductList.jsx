import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { products } from "./Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

const ProductList = (props) => {
  const [productList, setProductList] = useState();
  const [isTouchingScreen, setIsTouchingScreen] = useState(false);

  useEffect(() => {
    const userRef = doc(getFirestore(), "Products", "rnzlPP0EXcsejuZLUe7B");
    const unSub = onSnapshot(userRef, (doc) => {
      doc.exists() && setProductList(doc.data().liste);
    });
    return () => {
      unSub();
    };
  }, []);

  const handleTouchStart = () => {
    setIsTouchingScreen(true);
  };

  const handleTouchEnd = () => {
    setIsTouchingScreen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: true,
          verticalSwiping: true
        }
      }
    ]
  };

  return (
    <div
      className=""
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="product-list">
        <h2>Medical Products</h2>
        {isTouchingScreen ? (
          <div className="product-list-scroll">
            {productList &&
              productList.map((product) => (
                <div key={productList.id}>
                  <ProductCard
                    product={product}
                    SetProduct={props.SetProduct}
                    SetSelected={props.SetSelected}
                  />
                </div>
              ))}
          </div>
        ) : (
          <Slider {...settings}>
            {productList &&
              productList.map((product) => (
                <div key={productList.id}>
                  <ProductCard
                    product={product}
                    SetProduct={props.SetProduct}
                    SetSelected={props.SetSelected}
                  />
                </div>
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductList;
