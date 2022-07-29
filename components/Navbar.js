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

const visa = require("../images/visa.png");

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
            id
            quantity
            cost {
              totalAmount {
                amount
              }
            }
            merchandise {
              ... on ProductVariant {
                title
                id
                product {
                  title
                }
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const removefromcart = gql`
  mutation removecart($cartid: ID!, $lineid: [ID!]!) {
    cartLinesRemove(cartId: $cartid, lineIds: $lineid) {
      cart {
        lines(first: 200) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const updatecart = gql`
  mutation cartLinesUpdate($cartid: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartid, lines: $lines) {
      cart {
        createdAt
        lines(first: 250) {
          edges {
            node {
              id
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

  // get cart if cart not present then create one if present then fetch the old one

  async function getcart() {
    let localcartdata = JSON.parse(
      window.localStorage.getItem("curlcure:cart")
    );

    if (localcartdata) {
      const { data } = await storefront(loadcartquery, {
        id: localcartdata.id,
      });

      if (!data.cart) {
        localcartdata = await storefront(cartquery);
        setcart({
          id: localcartdata.data.cartCreate.cart.id,
          checkoutUrl: localcartdata.data.cartCreate.cart.checkoutUrl,
        });

        window.localStorage.setItem(
          "curlcure:cart",
          JSON.stringify(localcartdata.data.cartCreate.cart)
        );
      } else {
        setcart({
          id: localcartdata.id,
          checkoutUrl: localcartdata.checkoutUrl,
          estimatedCost: data.cart.cost.totalAmount.amount,
          lines: data.cart.lines.edges,
        });
      }
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

  // async function loadcart() {
  //   const data = await storefront(loadcartquery, {
  //     id: cart.id,
  //   });

  //   console.log(data);
  // }

  const removecart = async (lineid) => {
    const { data } = await storefront(removefromcart, {
      cartid: cart.id,
      lineid: [lineid],
    });
  };

  const increase = async (lineid, qty) => {
    const data = await storefront(updatecart, {
      cartid: cart.id,
      lines: {
        attributes: [
          {
            key: JSON.stringify({ qty }),
            value: JSON.stringify({ qty }),
          },
        ],
        id: lineid,
        quantity: qty + 1,
      },
    });
  };

  const decrease = async (lineid, qty) => {
    if (qty - 1 === 0) {
      removecart(lineid);
      return;
    }

    const data = await storefront(updatecart, {
      cartid: cart.id,
      lines: {
        attributes: [
          {
            key: JSON.stringify({ qty }),
            value: JSON.stringify({ qty }),
          },
        ],
        id: lineid,
        quantity: qty - 1,
      },
    });
  };

  useEffect(() => {
    setInterval(() => {
      getcart();
    }, 500);

    getcart();
  }, []);

  const togglecart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");

      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
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
      document.body.style.overflow = "overflow";
      document.body.style.height = "fit-content";

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
      {/* <div className={styles.nav2}>
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
      </div> */}
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
          {cart.lines.length == 0 ? (
            <div className="h-full flex justify-center items-center">
              <p className="text-pink-500 text-center text-2xl">
                Ooops You Have not Added anything to cart
              </p>
            </div>
          ) : (
            cart.lines &&
            cart.lines.map((cartitem) => {
              const smalltitle = cartitem.node.merchandise.product.title;
              if (cartitem.node.merchandise.product.title.length > 30) {
                smalltitle =
                  cartitem.node.merchandise.product.title.substring(0, 25) +
                  "...";
              }

              return (
                <li
                  key={cartitem.node.merchandise.product.title}
                  className="my-3  flex relative"
                >
                  <img
                    src={cartitem.node.merchandise.image.url}
                    className="w-2/5 object-cover rounded"
                    alt={cartitem.node.merchandise.image.altText}
                  />
                  <div className=" w-3/5 flex flex-col mx-5 justify-start items-start">
                    <h4 className="font-semibold">{smalltitle}</h4>
                    <p className="flex font-semibold items-center justify-center text-pink-500">
                      ₹ {cartitem.node.merchandise.priceV2.amount}
                    </p>
                    <div className="flex items-center border border-black/100 gap-2 px-3 py-1 my-3">
                      <AiOutlineMinus
                        onClick={() => {
                          decrease(cartitem.node.id, cartitem.node.quantity);
                        }}
                        className="cursor-pointer"
                      />
                      <span className="border-l border-black/100 border-r px-3 ">
                        {cartitem.node.quantity}
                      </span>
                      <AiOutlinePlus
                        onClick={() => {
                          increase(cartitem.node.id, cartitem.node.quantity);
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      removecart(cartitem.node.id);
                    }}
                    className="absolute bottom-3 right-2 cursor-pointer text-sm flex justify-center flex-col items-center"
                  >
                    <AiFillDelete className=" text-pink-500 text-lg" />
                    <p className="underline decoration-1 text-black">Remove</p>
                  </div>
                </li>
              );
            })
          )}
        </ol>
        <div className="flex justify-between items-center p-3 text-lg py-4  my-3">
          Total <span className="text-pink-500">₹ {cart.estimatedCost}</span>
        </div>
        <button className="bg-pink-500 w-full px-3 py-3 m-2  text-white">
          Proceed To Checkout
        </button>
        <p className="text-center text-sm my-3 text-black">
          100% Payment Protection
        </p>
        <div className="flex gap-1 justify-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/visa.png?v=1625657861"
            alt="visa"
            className="w-8"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/master.png?v=1625657873"
            alt="mastercard"
            className="w-8"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/paytm.jpg?v=1625657885"
            alt="paytm"
            className="w-8"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/upi.jpg?v=1625657899"
            alt="upi"
            className="w-8"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/cash.png?v=1625657946"
            alt="cash"
            className="w-8"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0058/7779/2832/files/rupay.png?v=1625657957"
            alt="rupay"
            className="w-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
