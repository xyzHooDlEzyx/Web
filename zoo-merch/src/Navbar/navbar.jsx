import { useEffect, useRef, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    const li = navRef.current.querySelectorAll(".nav ul li");

    let left_pos = 0;
    let index_value = 0;

    if (li.length > 0) {
      setSliderStyle({
        width: li[0].clientWidth + "px",
        left: left_pos + "px",
      });

      li.forEach((element, index) => {
        element.onclick = function () {
          index_value = index;
          setSliderStyle({
            width: element.clientWidth + "px",
            left: getLeftPos(index_value, li) + "px",
          });
        };
      });
    }

    function getLeftPos(index) {
      let pos = 0;
      for (let i = 0; i < index; i++) {
        pos += li[i].clientWidth;
      }
      return pos;
    }
  }, []);

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
                <a href="#home">HOME</a>
              </li>
              <li className="catalog">
                <a href="#catalog">CATALOG</a>
              </li>
              <li className="cart">
                <a href="#cart">CART</a>
              </li>
              <span
                className="slider"
                style={{ width: sliderStyle.width, left: sliderStyle.left }}
              ></span>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
