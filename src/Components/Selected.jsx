import React, { useEffect, useState } from "react";
//import "./selected.scss";
import animationData from "../lottie/notfound.json";
import Lottie from "react-lottie";
const ProductCard = (props) => {
  const [found, setFound] = useState(true);
  console.log(props);
  var path;
  if (props.product[0]) {
    path = props.product[0];
  } else {
    path = props.product;
  }

  useEffect(() => {
    if (props.product[0] === "not_in_data") {
      setFound(false);
    } else {
      setFound(true);
    }
  }, [props.product]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="selected">
      <div style={{ display: found ? "flex" : "none" }} className="selected">
        <img className="selected__image" src={path.img} alt="" />
        <div className="selected__content">
          <h3 className="selected__name">{path.label}</h3>
          {/*<p className="selected__price">{path.prix}</p>
          <p className="selected__description">{path.description}</p>*/}
        </div>
      </div>

      <div
        style={{
          flexDirection: "column",
          color: "white",
          display: !found ? "flex" : "none"
        }}
        className="selected__not-found"
      >
        <p>Nous n'avons pas trouvé ce que vous cherchez.</p>
        <p>
          Essayez de changer votre mot-clé de recherche ou de nous contacter
          directement pour plus d'informations.
        </p>
        <Lottie options={defaultOptions} height={380} width={380} />
      </div>
    </div>
  );
};

export default ProductCard;
