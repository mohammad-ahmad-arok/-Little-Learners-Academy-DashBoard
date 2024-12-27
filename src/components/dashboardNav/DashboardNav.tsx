// import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";

const DashboardNav = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        {false ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              Admin name
            </strong>
            <button
              onClick={() => console.log("logOut")}
              className="bg-gray-700 py-1 text-white font-bold px-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className={styles.btn} to="/login">
              <CgProfile />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default DashboardNav;
