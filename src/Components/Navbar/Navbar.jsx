import styles from "./Navbar.module.css";

import CartWidget from "../CartWidget/CartWidget";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Navbar = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [cate, setCate] = useState([]);

  useEffect(() => {
    const itemsCollection = collection(db, "categories");
    getDocs(itemsCollection).then((res) => {
      let arrayCategories = res.docs.map((category) => {
        console.log("FIRST TIME " + category);
        return {
          ...category.data(),
          id: category.id,
        };
      });
      setCategoryList(arrayCategories);
      console.log(arrayCategories + "cathegories");

      const firstCat =
        categoryList.length > 0 && categoryList.find((e) => e.title === "All");
      const otherCat =
        categoryList.length > 0 &&
        categoryList.filter((e) => e.title !== "All");
      if (categoryList.length > 0) {
        setCate([firstCat, ...otherCat]);
      }
    });
  }, [categoryList]);

  return (
    <div>
      <div className={styles.containerNavbar}>
        <Link to="/" style={{ color: "#e1d4c7", textDecoration: "none" }}>
          Comision: 51600
        </Link>

        <ul className={styles.containerList}>
          {cate?.map((category) => {
            console.log(category + "this is unde?DJf");
            return (
              <Link
                key={category.id}
                to={category.path}
                className={styles.navbarItem}
              >
                {category.title}
              </Link>
            );
          })}
        </ul>
        <CartWidget />
      </div>
      {children}
    </div>
  );
};

export default Navbar;
