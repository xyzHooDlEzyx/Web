import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const li = navRef.current.querySelectorAll(".nav ul li");

    const getActiveIndex = () => {
      if (
        location.pathname.includes("/catalog") ||
        location.pathname.includes("/item")
      ) {
        return 1;
      } else if (location.pathname === "/cart") {
        return 2;
      } else {
        return 0;
      }
    };

    const activeIndex = getActiveIndex();
    if (li.length > 0) {
      setSliderStyle({
        width: li[activeIndex].clientWidth + "px",
        left: getLeftPos(activeIndex, li) + "px",
        transition: "width 0.3s ease, left 0.3s ease",
      });
    }

    function getLeftPos(index, items) {
      let pos = 0;
      for (let i = 0; i < index; i++) {
        pos += items[i].clientWidth;
      }
      return pos;
    }
  }, [location]);

  return (
    <header>
      <nav
        className="navbar nav navbar-expand-lg navbar-dark bg-dark"
        ref={navRef}
      >
        <div className="container-fluid">
          <img className="logo" src="/parrot-svgrepo-com.svg" alt="logo" />
          <a className="navbar-brand" href="#">
            ZOO MERCH
          </a>
          <div className="slider-container">
            <ul>
              <li className="home">
                <Link to="/">HOME</Link>
              </li>
              <li className="catalog">
                <Link to="/catalog">CATALOG</Link>
              </li>
              <li className="cart">
                <Link to="/cart">CART</Link>
              </li>
              <span
                className="slider"
                style={{
                  width: sliderStyle.width,
                  left: sliderStyle.left,
                  transition: sliderStyle.transition,
                }}
              ></span>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
