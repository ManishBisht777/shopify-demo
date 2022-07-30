import React from "react";
import Navbar from "../components/Navbar";
import { storefront } from "../utils/index.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/ProductsPage.module.css";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

const Iraninaturals = ({ products }) => {
  const [mounted, setMounted] = useState(false);

  const [cart, setcart] = useState({ id: "", lines: [] });

  async function getcart() {
    let state = JSON.parse(window.localStorage.getItem("curlcure:cart"));
    if (state) {
      setcart({
        id: state.id,
        checkoutUrl: state.checkoutUrl,
      });
    } else {
      state = await storefront(cartquery);

      setcart({
        id: state.data.cartCreate.cart.id,
        checkoutUrl: state.data.cartCreate.cart.checkoutUrl,
      });

      window.localStorage.setItem(
        "curlcure:cart",
        JSON.stringify(state.data.cartCreate.cart)
      );
    }
  }

  const addtocart = async (variantid) => {
    const data = await storefront(addtocartquery, {
      cartid: cart.id,
      variantid: variantid,
    });

    console.log(cart);
  };

  useEffect(() => {
    setMounted(true);
    setInterval(() => {
      getcart();
    }, 500);
  }, []);

  return (
    mounted && (
      <>
        <div className={styles.productcontainer}>
          {/* <div className={styles.filterbox}>filter box here</div> */}
          <div className={styles.cards}>
            {products.edges.map((item) => {
              const product = item.node;
              const id = product.id;
              const title = product.title;
              const handle = product.handle;
              const image = product.images.edges[0].node;
              const price = product.priceRange.minVariantPrice.amount;

              const variant = product.variants.edges[0].node.id;

              const titlemore = title;

              if (title.length > 30) {
                titlemore = title.substring(0, 25) + "...";
              }

              return (
                <div key={id} className={styles.card}>
                  <Link key={id} href={`/product/${handle}`}>
                    <a className={styles.image}>
                      <img
                        // src="https://i.picsum.photos/id/846/536/354.jpg?hmac=vWJADyGTiavL-k1p7jrd223C6dzWbYTL_RNl-khWIWw"
                        src={image.url}
                        alt={image.altText}
                        className={styles.product_image}
                      />
                    </a>
                  </Link>
                  <div className={styles.product_info}>
                    <div className={styles.name}>{titlemore}</div>
                    <div className={styles.rating}>
                      <AiFillStar /> <span>4.5</span>
                    </div>
                    <div className={styles.ratings}>
                      <span className={styles.reviews}>23 reviews</span>
                    </div>
                    <div className={styles.addtocart}>
                      <div className={styles.price}>
                        ₹{price} <span>₹130</span>
                      </div>
                      <div
                        className={styles.cart_button}
                        onClick={() => {
                          addtocart(variant);
                        }}
                      >
                        add to cart <AiOutlineShoppingCart />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

const gql = String.raw;

// collection(handle: "inari-naturals") {

const productquery = gql`
  {
    collection(handle: "best-seller") {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            description
            variants(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
            images(first: 3) {
              edges {
                node {
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

const addtocartquery = gql`
  mutation addtocart($cartid: ID!, $variantid: ID!) {
    cartLinesAdd(
      cartId: $cartid
      lines: [{ quantity: 1, merchandiseId: $variantid }]
    ) {
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

export async function getServerSideProps() {
  const { data } = await storefront(productquery);

  return {
    props: {
      products: data.collection.products,
    },
  };
}

export default Iraninaturals;
