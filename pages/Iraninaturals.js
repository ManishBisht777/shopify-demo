import React from "react";
import Navbar from "../components/Navbar";
import { storefront } from "../utils/index.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/ProductsPage.module.css";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { addtocart } from "../utils/addtocart";

const Iraninaturals = ({ products }) => {
  console.log(products.edges);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    size: "small",
    value: 4,
    readOnly: true,
    precision: 0.5,
  };

  return (
    mounted && (
      <>
        <Navbar />
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
                <Link key={id} href={`/product/${handle}`}>
                  <a>
                    <div className={styles.card}>
                      <div className={styles.image}>
                        <img
                          // src="https://i.picsum.photos/id/846/536/354.jpg?hmac=vWJADyGTiavL-k1p7jrd223C6dzWbYTL_RNl-khWIWw"
                          src={image.url}
                          alt={image.altText}
                          className={styles.product_image}
                        />
                      </div>

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
                            onClick={() => addtocart()}
                          >
                            add to cart <AiOutlineShoppingCart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

const gql = String.raw;

const productquery = gql`
  {
    collection(handle: "inari-naturals") {
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

export async function getServerSideProps() {
  const { data } = await storefront(productquery);

  return {
    props: {
      products: data.collection.products,
    },
  };
}

export default Iraninaturals;
