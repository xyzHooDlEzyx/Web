import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProductContext } from "../Context/ProductContext";
import Button from "../button/button";
import "./item.css";

const Item = () => {
  const { id } = useParams();
  const { products } = useProductContext();

  console.log(products);
  // Ensure `products` is defined and is an array before attempting to find the item
  if (!Array.isArray(products)) {
    return <p>Loading item details...</p>;
  }

  // Find the item in the products array based on the ID from the URL params
  const item = products.find((product) => product.id === parseInt(id));

  // If the item is not found, display a message
  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="image-container">
          <img className="item-image" src={item.imgSrc} alt={item.alter} />
        </div>

        <div className="desc-and-cart">
          <div className="proxy">
            <h2 className="item-title">{item.title}</h2>
            <Link to="/catalog" className="back-to-catalog-button">
              Back to Catalog
            </Link>
          </div>

          <p className="item-description">{item.description}</p>
          <p className="item-price">Price: ${item.price}</p>

          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Item;

// import { useParams, Link } from "react-router-dom";
// import { useProductContext } from "../Context/ProductContext";
// import Button from "../button/button";
// import "./item.css";

// const Item = () => {
//   const { id } = useParams();
//   const { products } = useProductContext();
//   const item = products.find((product) => product.id === parseInt(id));

//   if (!item) return <p>Item not found</p>;

//   return (
//     <div className="item-page">
//       <img className="item-image" src={item.imgSrc} alt={item.alter} />
//       <div className="desc-and-cart">
//         <div className="proxy">
//           <h2>{item.title}</h2>
//           <Link to="/catalog" className="back-to-catalog-button">
//             Back to Catalog
//           </Link>
//         </div>
//         <p>{item.description}</p>
//         <p>Price: ${item.price}</p>
//         <Button>Add to Cart</Button>
//       </div>
//     </div>
//   );
// };

// export default Item;
