import { React, useRef, useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu, GiBottleVapors } from "react-icons/gi";
import { GrLanguage, GrFormNext, GrFilter } from "react-icons/gr";
import { GiBowTieRibbon, GiClothes, GiShop } from "react-icons/gi";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillDelete,
} from "react-icons/ai";

import { MdOutlineKeyboardBackspace } from "react-icons/md";

import Link from "next/link";
import { storefront } from "../utils/index.js";

const gql = String.raw;

// create cart query
const cartquery = gql`
  mutation {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
    }
  }
`;

// query to load existing cart
const loadcartquery = gql`
  query getcart($id: ID!) {
    cart(id: $id) {
      checkoutUrl
      id
      updatedAt
      createdAt
      cost {
        totalAmount {
          amount
        }
      }
      lines(first: 250) {
        edges {
          node {
            quantity
            cost {
              totalAmount {
                amount
              }
            }
            merchandise {
              ... on ProductVariant {
                title
                product {
                  title
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Navbar = () => {
  const style = { color: "#252525" };

  const [cart, setcart] = useState({ id: "", lines: [] });

  // get cart of cart not present then create one if present then fetch the old one

  async function getcart() {
    let localcartdata = JSON.parse(
      window.localStorage.getItem("curlcure:cart")
    );

    if (localcartdata) {
      const { data } = await storefront(loadcartquery, {
        id: localcartdata.id,
      });

      setcart({
        id: localcartdata.id,
        checkoutUrl: localcartdata.checkoutUrl,
        estimatedCost: data.cart.cost.totalAmount.amount,
        lines: data.cart.lines.edges,
      });
      return;
    }
    localcartdata = await storefront(cartquery);

    setcart({
      id: localcartdata.data.cartCreate.cart.id,
      checkoutUrl: localcartdata.data.cartCreate.cart.checkoutUrl,
    });

    window.localStorage.setItem(
      "curlcure:cart",
      JSON.stringify(localcartdata.data.cartCreate.cart)
    );
  }

  async function loadcart() {
    const data = await storefront(loadcartquery, {
      id: cart.id,
    });

    console.log(data);
  }

  useEffect(() => {
    getcart();
    loadcart();
  }, []);

  const togglecart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");

      if (window.innerWidth <= 500) {
        ref.current.classList.remove("absolute");
        ref.current.classList.add("relative");
      }

      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      if (window.innerWidth <= 500) {
        ref.current.classList.remove("relative");
        ref.current.classList.add("absolute");
      }

      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();

  return (
    <div className="curlcurenavbar">
      <nav className={styles.nav}>
        <div className={styles.logo}>logo</div>
        <div className={styles.main_nav}>
          <ul>
            <Link href="/">
              <li>
                <article>Home</article>
              </li>
            </Link>
            <Link href="/Curlcure">
              <li>
                <a>Curl Cure</a>
              </li>
            </Link>
            <Link href="/Iraninaturals">
              <li>
                <a>Irani Naturals</a>
              </li>
            </Link>
          </ul>
          <div className={styles.search}>
            <BiSearch />
          </div>
        </div>
        <div className={styles.user}>
          <span onClick={togglecart} className="cursor-pointer">
            <GrLanguage />
          </span>
          <div className={styles.profile}>
            <GiHamburgerMenu />
            <div className={styles.profile_img}>
              <img src="https://picsum.photos/seed/picsum/200/300" alt="no" />
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.nav2}>
        <div className={styles.categories}>
          <div className={styles.icon}>
            <GiBottleVapors style={style} />
            <div className={styles.name}>Hair Cure</div>
          </div>
          <div className={styles.icon}>
            <GiBowTieRibbon style={style} />
            <div className={styles.name}>Merchandices</div>
          </div>
          <div className={styles.icon}>
            <GiClothes style={style} />
            <div className={styles.name}>Accessories</div>
          </div>
          <div className={styles.icon}>
            <GiShop style={style} />
            <div className={styles.name}>Salon</div>
          </div>
        </div>

        <div className={styles.filter}>
          <div className={styles.stylebx}>
            <GrFormNext />
          </div>
          <div className={styles.filterbx}>
            <GrFilter />
            Filter
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className="sidebar overflow-y-hidden h-[100vh] absolute top-0 right-0 bg-pink-50/100 p-5 transform transition-transform translate-x-full z-50"
      >
        <span
          className="flex my-3 h-1/10 items-center drop-shadow-md gap-4 text-pink-500 text-2xl z-50 cursor-pointer"
          onClick={togglecart}
        >
          <MdOutlineKeyboardBackspace />
          <h2 className="font-bold text-xl text-pink-500">CART</h2>
        </span>
        <ol className="list-decimal border-b h-3/6  overflow-y-auto">
          <li className="my-3  flex relative">
            <img
              src="https://i.picsum.photos/id/610/300/200.jpg?hmac=h1M_04bvunFzBSWCn3KmM1QvDML4d3SgnquzoyEdp6E"
              alt="lorempic"
              className="w-2/5 object-cover rounded"
            />
            <div className=" w-3/5 flex flex-col mx-5 justify-start items-start">
              <h4 className="font-semibold">
                Hibiscus, Amla & Bhringaraj Hair Oil
              </h4>
              <p className="flex font-semibold items-center justify-center text-pink-500">
                ₹ 120
              </p>
              <div className="flex items-center border border-black/100 gap-2 px-3 py-1 my-3">
                <AiOutlineMinus />
                <span className="border-l border-black/100 border-r px-3 ">
                  1
                </span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="absolute bottom-3 right-2 cursor-pointer text-sm flex justify-center flex-col items-center">
              <AiFillDelete className=" text-pink-500 text-lg" />
              <p className="underline decoration-1 text-black">Remove</p>
            </div>
          </li>
          <li className="my-3  flex relative">
            <img
              src="https://i.picsum.photos/id/610/300/200.jpg?hmac=h1M_04bvunFzBSWCn3KmM1QvDML4d3SgnquzoyEdp6E"
              alt="lorempic"
              className="w-2/5 object-cover rounded"
            />
            <div className=" w-3/5 flex flex-col mx-5 justify-start items-start">
              <h4 className="font-semibold">
                Hibiscus, Amla & Bhringaraj Hair Oil
              </h4>
              <p className="flex font-semibold items-center justify-center text-pink-500">
                ₹ 120
              </p>
              <div className="flex items-center border border-black/100 gap-2 px-3 py-1 my-3">
                <AiOutlineMinus />
                <span className="border-l border-black/100 border-r px-3 ">
                  1
                </span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="absolute bottom-3 right-2 cursor-pointer text-sm flex justify-center flex-col items-center">
              <AiFillDelete className=" text-pink-500 text-lg" />
              <p className="underline decoration-1 text-black">Remove</p>
            </div>
          </li>
          <li className="my-3  flex relative">
            <img
              src="https://i.picsum.photos/id/610/300/200.jpg?hmac=h1M_04bvunFzBSWCn3KmM1QvDML4d3SgnquzoyEdp6E"
              alt="lorempic"
              className="w-2/5 object-cover rounded"
            />
            <div className=" w-3/5 flex flex-col mx-5 justify-start items-start">
              <h4 className="font-semibold">
                Hibiscus, Amla & Bhringaraj Hair Oil
              </h4>
              <p className="flex font-semibold items-center justify-center text-pink-500">
                ₹ 120
              </p>
              <div className="flex items-center border border-black/100 gap-2 px-3 py-1 my-3">
                <AiOutlineMinus />
                <span className="border-l border-black/100 border-r px-3 ">
                  1
                </span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="absolute bottom-3 right-2 cursor-pointer text-sm flex justify-center flex-col items-center">
              <AiFillDelete className=" text-pink-500 text-lg" />
              <p className="underline decoration-1 text-black">Remove</p>
            </div>
          </li>
        </ol>
        <div className="flex justify-between items-center p-3 text-lg py-4  my-3">
          Total <span className="text-pink-500">₹ 10000</span>
        </div>
        <button className="bg-pink-500 w-full px-3 py-3 m-2  text-white">
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
