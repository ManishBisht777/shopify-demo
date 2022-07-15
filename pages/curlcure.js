import React from "react";
import Navbar from "../components/Navbar";
import { storefront } from "../utils/index.js";
import Link from "next/link";
import { useState, useEffect } from "react";

const Curlcure = ({ products }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <Navbar />
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.edges.map((item) => {
                const product = item.node;
                const id = product.id;
                const title = product.title;
                const handle = product.handle;
                const image = product.images.edges[0].node;
                const price = product.priceRange.minVariantPrice.amount;
                return (
                  <Link key={id} href={`/product/${handle}`}>
                    <a className="lg:w-1/4 md:w-1/2 p-4 w-full">
                      <a className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt={image.altText}
                          className="object-cover object-center w-full h-full block"
                          src={image.url}
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {title}
                        </h3>
                        <p className="mt-1">{price}</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </>
    )
  );
};

const gql = String.raw;

const productquery = gql`
  {
    collection(handle: "curl-cure-new-launch") {
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
            description
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

export default Curlcure;
