import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { DashBoardLinks } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        <img
          src="/assets/Logo.png"
          className={` ${styles.logo} hidden sm:block sm:w-44 w-36  py-4`}
          alt="Logo"
        />

        <div className={`${styles.menu} block sm:hidden`}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={`${styles.navLinksWrapper} block sm:hidden `}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={`${styles.navLinks} block sm:hidden`}>
          {DashBoardLinks.map((item) => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
