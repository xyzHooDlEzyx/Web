import "./card.css";

export default function Card({
  id,
  title,
  description,
  descriptionSmall,
  alter,
  imgSrc,
  price,
  type = "simple",
}) {
  let Card;

  switch (type) {
    case "simple":
      Card = (
        <div className="card card_simple">
          <img src={imgSrc} alt={alter} className="card_img margin-btm-sm" />
          <h2 className="heading-secondary margin-btm-sm">{title}</h2>
          <p className="paragraph">{descriptionSmall}</p>
        </div>
      );
      break;
    case "full":
      Card = (
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
            <Button isBig="true">View more</Button>
          </div>
        </div>
      );
      break;
  }

  return Card;
}

// const Card = () => {

//   return (
//     <div id="${id}" className="card" style="width: 286px">
//       <img src="img/pngwing.com.png" className="card-img-top" alt="Zoo image" />
//       <div className="card-body">
//         <h5 className="card-title"></h5>
//         <h6 className="card-title">Visitors per year</h6>
//         <p className="card-text"></p>
//         <h6 className="card-title">Number of animals</h6>
//         <p className="card-text">$</p>
//         <div className="card-controller">
//           <button
//             id="${EDIT_BUTTON_PREFIX}-${id}"
//             className="btn btn-primary btn-width"
//           >
//             Edit
//           </button>
//           <button
//             id="${REMOVE_BUTTON_PREFIX}-${id}"
//             className="btn btn-danger btn-width"
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
