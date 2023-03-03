import React from "react";
import "./ProductCard.scss";

const ProductCard = (props) => {
  //console.log(props)
  const handleselect = () => {
    props.SetProduct(props.product);
    props.SetSelected("flex");
  };

  return (
    <div onDoubleClick={handleselect} className="product-card">
      <img className="product-card__image" src={props.product.img} alt="" />
      <div className="product-card__content">
        <h3 className="product-card__name">{props.product.label}</h3>
        <p className="product-card__price">{props.product.prix}</p>
        <p className="product-card__description">{props.product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
