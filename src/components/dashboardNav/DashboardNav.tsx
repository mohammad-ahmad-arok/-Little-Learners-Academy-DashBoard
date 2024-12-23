// import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import Navbar from "./Navbar";

const DashboardNav = () => {

  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        {false ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              
            </strong>
            <button
              onClick={() => console.log("logOut")}
              className="bg-gray-700 text-gray-200 px-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className={styles.btn} to="/login">
              Login
            </Link>
            <Link className={styles.btn} to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default DashboardNav;
