import "./card.css";

const Card = ({
  id,
  title,
  description,
  descriptionSmall,
  alter,
  imgSrc,
  price,
  type = "simple",
}) => {
  if (type === "simple") {
    return (
      <div className="card card_simple">
        <img src={imgSrc} alt={alter} className="card_img margin-btm-sm" />
        <h2 className="heading-secondary margin-btm-sm">{title}</h2>
        <p className="paragraph">{descriptionSmall}</p>
      </div>
    );
  } else if (type === "full") {
    return (
      <div className="card card-full">
        <div id="card__top">
          <p id="card__top__id">{id}</p>
        </div>
        <div id="card__wrapper">
          <img src={imgSrc} alt={alter} className="card_img margin-btm-sm" />
          <h2 className="heading-secondary margin-btm-sm">{title}</h2>
          <p className="paragraph margin-btm-sm">{description}</p>
          <div className="card__value margin-btm-sm">
            <h3 className="heading-tertiary">Price:</h3>
            <span className="card__value__price">{price}</span>
          </div>
          <Button Big={true}>View more</Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Card;
