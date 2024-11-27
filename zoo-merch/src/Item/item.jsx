import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../../api/productsApi";
import { addToCart } from "../store/actions/cartActions";
import Loading from "../Loading/loading";
import Button from "../button/button";
import Filter from "../Filter/filter";
import "./item.css";

const clearLocalStorage = () => {
  localStorage.clear();
  console.log("localStorage has been cleared!");
};

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClearStorage = () => {
    clearLocalStorage();
  };

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        const product = Array.isArray(data) && data.length > 0 ? data[0] : null;
        if (!product) {
          throw new Error("Product not found");
        }
        setItem(product);
        setMaxQuantity(product.quantity);
        setSizes(product.sizes ? product.sizes.split(",") : []);
        setIsLoading(false);

        const savedState = localStorage.getItem(`isButtonDisabled_${id}`);
        if (savedState === "true") {
          setIsButtonDisabled(true);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (item && selectedSize) {
      dispatch(addToCart({ ...item, size: selectedSize }, quantity));
      alert(
        `${item.title} (${selectedSize}) added to cart with quantity: ${quantity}`
      );

      if (quantity === maxQuantity) {
        setIsButtonDisabled(true);
        localStorage.setItem(`isButtonDisabled_${id}`, "true");
      }
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (isLoading) return <Loading />;
  if (error)
    return <p className="error-message">Error loading item: {error}</p>;
  if (!item) return <p className="error-message">Item not found.</p>;

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="image-container">
          <img
            className="item-image"
            src={item.imgSrc}
            alt={item.alterText || "product"}
          />
        </div>

        <div className="desc-and-cart">
          <div className="proxy">
            <h2 className="item-title">{item.title}</h2>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
          <p className="item-description">{item.description}</p>
          <p className="item-price">
            Price: ${parseFloat(item.price).toFixed(2)}
          </p>
          <div className="quant_size">
            <input
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            {/* 
            <Button onClick={handleClearStorage} type="outline" color="clear">
              Clear Local Storage
            </Button> */}

            {sizes.length > 0 && (
              <Filter
                Label="Types"
                options={sizes}
                id="size-selector"
                onChange={handleSizeChange}
              />
            )}
          </div>
          {!isButtonDisabled && (
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
