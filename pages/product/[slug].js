import { storefront } from "../../utils/index.js";
import React, { useRef, useState } from "react";

// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineStar,
  AiFillStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { BsHandbag } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

import Carousel from "react-material-ui-carousel";

const Post = ({ product }) => {
  console.log(product);

  const id = product.id;
  const title = product.title;
  const handle = product.handle;
  const images = product.images;
  const price = product.priceRange.minVariantPrice.amount;
  console.log(images);

  return (
    <div>
      <div className="h-full bg-slate-50 flex">
        <div className="w-1/2 flex items-center flex-col  p-10">
          <Carousel className="w-[500px] h-[600px]">
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
          </Carousel>
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
            This organic deodorant helps keep the underarms fresh by
            neutralising body odour. Its natural clays help detoxify the pores,
            while its plant oils promote more even-toned skin. This deodorant
            has a citrusy scent with mild floral notes. Take only a little
            product and massage well to avoid stains on clothing.
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
              <span className="border-l border-black/100 border-r px-3 ">
                1
              </span>
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

      {/* how it works section */}
      <div className="flex justify-center  p-10 w-full bg-slate-100 flex-col items-center">
        <h4 className="text-2xl ">How do I use it?</h4>
        <div className="flex w-full my-10 ">
          <div className="flex w-1/2 justify-end">
            <img src="https://picsum.photos/400/400" alt="" />
          </div>
          <div className="flex flex-col w-1/2 items-center p-10 ">
            <div className="flex gap-1 flex-col border-b-2 border-black/50 my-3">
              <h4 className="font-semibold">Step 1 </h4>
              <p className="pb-4 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                soluta!
              </p>
            </div>
            <div className="flex gap-1 flex-col border-b-2 border-black/50 my-3">
              <h4 className="font-semibold">Step 1 </h4>
              <p className="pb-4 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                soluta!
              </p>
            </div>
            <div className="flex gap-1 flex-col border-b-2 border-black/50 my-3">
              <h4 className="font-semibold">Step 1 </h4>
              <p className="pb-4 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                soluta!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full h-[100vh] ">
        <div className="flex w-1/2 flex-col justify-center items-center bg-white p-5">
          <h4 className="text-2xl">Who is it For?</h4>
          <div className="flex flex-col items-center p-10 ">
            <ul className="my-5">
              <li className="mx-2 flex items-center gap-2 ">
                <TiTick className="text-green-400" /> Neutralises body odour
              </li>
              <li className="mx-2 flex items-center gap-2 ">
                <TiTick className="text-green-400" /> Improves skin tone,
                texture, and tonicity
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
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-center items-center bg-pink-100 p-5">
          <h4 className="text-2xl">Who is it For?</h4>
          <div className="flex flex-col items-center p-10 ">
            <ul className="my-5">
              <li className="mx-2 flex items-center gap-2 ">
                <TiTick className="text-green-400" /> Neutralises body odour
              </li>
              <li className="mx-2 flex items-center gap-2 ">
                <TiTick className="text-green-400" /> Improves skin tone,
                texture, and tonicity
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
          </div>
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
