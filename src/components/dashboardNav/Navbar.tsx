import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/" className={styles.logo}>
          Little Learners
        </Link>
        <div className={styles.menu}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={styles.navLinksWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        {/* <ul className={styles.navLinks}>
          {navItems.map((item, index) => {
            if (item.label == "Dashboard" || item.label == "Contact") {
              return;
            }
            return (
              <Link
                onClick={() => setToggle(false)}
                className={styles.navLink}
                to={item.path}
              >
                {item.label}
              </Link>
            );
          })}
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
