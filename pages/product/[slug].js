import { storefront } from "../../utils/index.js";
import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineStar,
  AiFillStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { BsHandbag } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

const Post = ({ product }) => {
  console.log(product);

  const id = product.id;
  const title = product.title;
  const handle = product.handle;
  const images = product.images;
  const price = product.priceRange.minVariantPrice.amount;
  console.log(images);

  // return (
  //   <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
  //     <div className="container px-5 py-24 mx-auto">
  //       <div className="lg:w-4/5 mx-auto flex flex-wrap">
  //         <img
  //           alt={image.altText}
  //           className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
  //           src={image.url}
  //         />
  //         <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
  //           <h2 className="text-sm title-font text-gray-500 tracking-widest">
  //             Curl Cure
  //           </h2>
  //           <h1 className="text-white text-3xl title-font font-medium mb-1">
  //             {title}
  //           </h1>
  //           <div className="flex mb-4">
  //             <span className="flex items-center">
  //               <svg
  //                 fill="currentColor"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-4 h-4 text-indigo-400"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  //               </svg>
  //               <svg
  //                 fill="currentColor"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-4 h-4 text-indigo-400"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  //               </svg>
  //               <svg
  //                 fill="currentColor"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-4 h-4 text-indigo-400"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  //               </svg>
  //               <svg
  //                 fill="currentColor"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-4 h-4 text-indigo-400"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  //               </svg>
  //               <svg
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-4 h-4 text-indigo-400"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  //               </svg>
  //               <span className="ml-3">4 Reviews</span>
  //             </span>
  //             <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
  //               <a>
  //                 <svg
  //                   fill="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   className="w-5 h-5"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
  //                 </svg>
  //               </a>
  //               <a>
  //                 <svg
  //                   fill="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   className="w-5 h-5"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
  //                 </svg>
  //               </a>
  //               <a>
  //                 <svg
  //                   fill="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   className="w-5 h-5"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
  //                 </svg>
  //               </a>
  //             </span>
  //           </div>
  //           <p className="leading-relaxed">{product.description}</p>
  //           <div className="flex">
  //             <span className="title-font font-medium text-2xl text-white">
  //               {price}
  //             </span>
  //             <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
  //               CheckOut
  //             </button>
  //             <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
  //               <svg
  //                 fill="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-5 h-5"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
  //               </svg>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <div className="h-full bg-slate-50 flex">
      <div className="w-1/2 flex items-center flex-col  p-10">
        {images.edges.map((image) => {
          console.log(image);

          return (
            <img
              key={image.node.url}
              className="w-[600px] p-5"
              src={image.node.url}
              alt="hehe"
            />
          );
        })}
      </div>
      <div className="w-1/2 bg-white flex h-full flex-col p-10">
        <h1 className="text-4xl leading-10 text-pink-500 py-3">
          Blood Orange and Geranium Deodorant
        </h1>
        <p className="my-2 text-lg font-medium">
          Neutralises Odour | Long Lasting Freshness
        </p>
        <p className="flex items-center gap-4 my-2">
          <div className="flex text-pink-500 text-lg">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <span className="font-semibold text-slate-400">23 Reviews</span>
        </p>
        <p className="text-justify my-2">
          This organic deodorant helps keep the underarms fresh by neutralising
          body odour. Its natural clays help detoxify the pores, while its plant
          oils promote more even-toned skin. This deodorant has a citrusy scent
          with mild floral notes. Take only a little product and massage well to
          avoid stains on clothing.
        </p>
        <ul className="my-5">
          <li className="mx-2 flex items-center gap-2 ">
            <TiTick className="text-green-400" /> Neutralises body odour
          </li>
          <li className="mx-2 flex items-center gap-2 ">
            <TiTick className="text-green-400" /> Improves skin tone, texture,
            and tonicity
          </li>
          <li className="mx-2 flex items-center gap-2 ">
            <TiTick className="text-green-400" /> Prevents clogging of sweat
            ducts
          </li>
          <li className="mx-2 flex items-center gap-2 ">
            <TiTick className="text-green-400" /> Exhibits antibacterial and
            anti-inflammatory properties
          </li>
        </ul>
        <div className="my-2 bg-slate-100 p-3 flex flex-col">
          <p className="text-2xl text-pink-500 font-bold my-1 mx-2 ">
            ₹ {price}
          </p>
          <p className="text-lg mx-2">MRP inclusive of all taxes</p>
        </div>

        <div className="flex w-full">
          <select
            name="size"
            id="size"
            className="w-1/2 mr-3 my-3 px-5 cursor-pointer bg-pink-500 text-xl text-white "
          >
            <option value="volvo">70 g</option>
            <option value="saab">100 g</option>
            <option value="mercedes">200 g</option>
            <option value="audi">300 g</option>
          </select>
          <div className="flex items-center border w-1/2 border-black/100 gap-2 p-3 my-3 ml-3 justify-center text-2xl font-medium">
            <AiOutlineMinus className="cursor-pointer " />
            <span className="border-l border-black/100 border-r px-3 ">1</span>
            <AiOutlinePlus className="cursor-pointer" />
          </div>
        </div>

        <div className="flex w-full">
          <button className="w-1/2 px-3 py-3 mr-2 flex justify-center text-xl items-center border border-pink-500 text-black my-2  transition ease-in-out hover:bg-pink-500 hover:text-white duration-300">
            Buy Now
            <BsHandbag className=" mx-3" />
          </button>
          <button className="bg-pink-500  hover:bg-white duration-300 hover:border hover:border-pink-500 transition ease-in-out hover:text-black w-1/2 px-3 py-3 ml-2 flex justify-center text-xl items-center text-white my-2">
            Add To Cart
            <AiOutlineShoppingCart className=" mx-3" />
          </button>
        </div>

        <div className="flex gap-10 text-center text-sm my-2  py-4">
          <p className="border-r-2 border-black/25 p-3">
            Worldwide Shipping Available
          </p>
          <p className="border-r-2 p-3 border-black/25 ">
            Country of Origin India
          </p>
          <p className="p-3"> Avail free shipping on all orders </p>
        </div>
      </div>
    </div>
  );
};

const gql = String.raw;

const productquery = gql`
  query getproduct($handle: String) {
    product(handle: $handle) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
        }
      }
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
`;

export async function getServerSideProps(context) {
  const { data } = await storefront(productquery, {
    handle: context.query.slug,
  });

  return {
    props: {
      product: data.product,
    },
  };
}

export default Post;
