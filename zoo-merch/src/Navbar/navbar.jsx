import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);
  const location = useLocation();
  const [lastIndex, setLastIndex] = useState(0);
  const [prevStyle, setPrevStyle] = useState({ width: 120, left: 0 });

  useEffect(() => {
    const li = navRef.current.querySelectorAll(".nav ul li");
    const path = location.pathname;

    const getActiveIndex = () => {
      switch (path) {
        case "/catalog":
          return 1;
        case "/cart":
          return 2;
        default:
          return 0;
      }
    };

    const activeIndex = getActiveIndex();
    const isMovingRight = activeIndex > lastIndex;

    if (li.length > 0) {
      const newWidth = li[activeIndex].clientWidth + "px";
      const newLeft = getLeftPos(activeIndex, li) + "px";

      setSliderStyle({
        width: prevStyle.width,
        left: prevStyle.left,
        // transition: "none",
      });

      setTimeout(() => {
        setSliderStyle({
          width: newWidth,
          left: newLeft,
          // transition: isMovingRight
          //   ? "left 0.3s ease, width 0.3s ease"
          //   : "left 0.3s ease-in-out, width 0.3s ease-in-out",
        });
      }, 0);

      setPrevStyle({ width: newWidth, left: newLeft });
    }

    function getLeftPos(index, items) {
      let pos = 0;
      for (let i = 0; i < index; i++) {
        pos += items[i].clientWidth;
      }
      return pos;
    }
  }, [location, lastIndex]);

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
                <a href="/">HOME</a>
              </li>
              <li className="catalog">
                <a href="/catalog">CATALOG</a>
              </li>
              <li className="cart">
                <a href="/cart">CART</a>
              </li>
              <span
                className="slider"
                style={{
                  width: sliderStyle.width,
                  left: sliderStyle.left,
                  // transition: sliderStyle.transition,
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
