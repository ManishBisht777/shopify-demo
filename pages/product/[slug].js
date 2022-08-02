import { storefront, getreviews, relatedproduct } from "../../utils/index.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import styles from "../../styles/ProductsPage.module.css";

import { Rating } from "@mui/material";

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
import Slider from "react-slick";

// create cart query

const Post = ({ product, reviews, rid, relatedproducts }) => {
  const [mounted, setMounted] = useState(false);

  const id = product.id;
  const title = product.title;
  const handle = product.handle;
  const images = product.images;
  const price = product.priceRange.minVariantPrice.amount;
  const description = product.description;

  const variants = product.variants.edges;
  console.log(variants);
  console.log(relatedproducts);

  const [addtocartvariantid, setaddtocartvariantid] = useState("");
  const [variantprice, setvariantprice] = useState("");

  const [cartitem, setcartitem] = useState(1);

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
      quantity: cartitem,
    });
  };

  const increase = () => {
    setcartitem(cartitem + 1);
  };
  const decrease = () => {
    if (cartitem - 1 > 0) setcartitem(cartitem - 1);
  };

  useEffect(() => {
    setMounted(true);
    // setInterval(() => {
    getcart();
    // }, 500);
  }, []);

  var settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var St = description;
  var pFrom = St.indexOf("Head_start ") + "Head_start ".length;
  var pTo = St.indexOf("Head_End");
  var headline = St.substr(pFrom, pTo - pFrom);

  pFrom = St.indexOf("Description_start ") + "Description_start ".length;
  var pTo = St.indexOf(" Description_end");
  var desc = St.substr(pFrom, pTo - pFrom);

  var smalldesc = [];
  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`Desc_${i}`) + `Desc_${i}`.length;
    var pTo = St.indexOf(` Desc_${i}end`);
    smalldesc[i] = St.substr(pFrom, pTo - pFrom);
  }

  var howtouses = [];
  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`Howtouse_${i}`) + `Howtouse_${i}`.length;
    var pTo = St.indexOf(` Howtouse_${i}end`);
    howtouses[i] = St.substr(pFrom, pTo - pFrom);
  }

  var benefits = [];

  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`Benefit_${i}`) + `Benefit_${i}`.length;
    var pTo = St.indexOf(` Benefit_${i}end`);
    benefits[i] = St.substr(pFrom, pTo - pFrom);
  }

  var whoisit = [];

  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`whoisit_${i}`) + `whoisit_${i}`.length;
    var pTo = St.indexOf(` whoisit_${i}end`);
    whoisit[i] = St.substr(pFrom, pTo - pFrom);
  }

  var faqques = [];

  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`faqques_${i}`) + `faqques_${i}`.length;
    var pTo = St.indexOf(` faqques_${i}end`);
    faqques[i] = St.substr(pFrom, pTo - pFrom);
  }

  var faqans = [];
  for (var i = 1; i < 10; i++) {
    pFrom = St.indexOf(`faqans_${i}`) + `faqans_${i}`.length;
    var pTo = St.indexOf(` faqans_${i}end`);
    faqans[i] = St.substr(pFrom, pTo - pFrom);
  }

  return (
    mounted && (
      <div>
        {/* product main section */}
        <div className="h-full bg-slate-50 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex  p-3 md:p-10">
            <Carousel className="w-[500px] ">
              {images.edges.map((image) => {
                return (
                  <img
                    key={image.node.url}
                    className="w-[400px] p-5 md:w-[600px] h-[400px] md:h-[500px]"
                    src={image.node.url}
                    alt="hehe"
                  />
                );
              })}
            </Carousel>
          </div>
          <div className="w-full md:w-1/2 bg-white flex h-full flex-col p-10">
            <h1 className="text-2xl md:text-4xl leading-7 md:leading-10 text-pink-500 py-1 md:py-3">
              {/* Blood Orange and Geranium Deodorant */}
              {title}
            </h1>
            <p className="my-1 md:my-2 text-sm md:text-lg font-medium">
              {headline}
            </p>
            <p className="flex items-center gap-4 my-2">
              <div className="flex text-pink-500 text-lg">
                <Rating
                  name="half-rating-read"
                  defaultValue={reviews.response.bottomline.average_score}
                  precision={0.5}
                  className="text-pink-500"
                  readOnly
                />
              </div>
              <span className="font-semibold text-slate-400">
                {reviews.response.bottomline.total_review} Reviews
              </span>
            </p>
            <p className="text-justify my-2 text-sm md:text-lg">{desc}</p>

            <ul className="my-5 text-sm md:text-lg">
              {smalldesc.map((desc) => {
                if (desc != "") {
                  return (
                    <li className="mx-2 flex items-center gap-2 ">
                      <TiTick className="text-green-400" /> {desc}
                    </li>
                  );
                }
              })}
            </ul>
            <div className="my-2 bg-slate-100 p-3 flex flex-col">
              <p className="text-lg md:text-2xl text-pink-500 font-bold my-1 mx-2 ">
                ₹ {price}
              </p>
              <p className="text-sm md:text-lg mx-2">
                MRP inclusive of all taxes
              </p>
            </div>

            <div className="flex w-full">
              <select
                name="size"
                id="size"
                className="w-1/2 mr-3 my-3 px-5 cursor-pointer bg-pink-500 
                text-sm md:text-xl text-white "
                onChange={(e) => {
                  e.preventDefault();
                  setaddtocartvariantid(e.target.value);
                  setvariantprice(va);
                  console.log(addtocartvariantid);
                }}
              >
                {variants.map((variant) => {
                  return (
                    <option value={variant.node.selectedOptions[0].value}>
                      {variant.node.selectedOptions[0].value}
                    </option>
                  );
                })}
              </select>
              <div className="flex items-center border w-1/2 border-black/100 gap-2 p-3 my-3 ml-3 justify-center text-sm md:text-2xl font-medium">
                <AiOutlineMinus
                  onClick={() => {
                    decrease();
                  }}
                  className="cursor-pointer "
                />
                <span className="border-l border-black/100 border-r px-3 ">
                  {cartitem}
                </span>
                <AiOutlinePlus
                  onClick={() => {
                    increase();
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button className="w-1/2 px-1 md:px-3 py-2 md:py-3 mr-2 flex justify-center text-sm md:text-xl items-center border border-pink-500 text-black my-2  transition ease-in-out hover:bg-pink-500 hover:text-white duration-300">
                Buy Now
                <BsHandbag className=" mx-3" />
              </button>
              <button
                className="bg-pink-500  hover:bg-white duration-300 hover:border hover:border-pink-500 transition ease-in-out hover:text-black w-1/2 px-1 md:px-3 py-2 md:py-3 ml-2 flex justify-center text-sm md:text-xl items-center text-white my-2"
                onClick={() => {
                  addtocart(product.variants.edges[0].node.id);
                }}
              >
                Add To Cartx
                <AiOutlineShoppingCart className=" mx-3" />
              </button>
            </div>

            <div className="flex gap:2 md:gap-10 text-center text-xs md:text-sm my-2  py-4">
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
        <div className="flex justify-items-center p-5 md:p-10 w-full bg-slate-100 flex-col items-center">
          <h4 className="text-2xl ">How do I use it?</h4>
          <div className="flex flex-col md:flex-row w-full my-10 ">
            <div className="flex w-full md:w-1/2 justify-end">
              <img
                src="https://i.picsum.photos/id/727/536/354.jpg?hmac=FPxn7oYjZgvXjjpn7dUunkQgtA6hwYZ4HcnchtahC2g"
                alt="image"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2  p-4 md:p-10 ">
              {howtouses.map((howtouse, idx) => {
                if (howtouse != "") {
                  return (
                    <div className="flex gap-1 flex-col border-b-2 border-black/50 my-3">
                      <h4 className="font-semibold">Step {idx}</h4>
                      <p className="pb-4 text-sm">{howtouse}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* benefits and  who it is for section */}
        <div className="flex w-full h-full md:h-[100vh] flex-col md:flex-row">
          <div className="flex w-full md:w-1/2 flex-col justify-center items-center bg-white md:p-5">
            <h4 className="text-2xl py-3 md:py-0">Who is it For?</h4>
            <div className="flex flex-col items-center p-5 md:p-10 ">
              <ul className="my-0  md:my-5">
                {whoisit.map((whois) => {
                  if (whois != "") {
                    return (
                      <li className="mx-2 flex items-center gap-2 ">
                        <TiTick className="text-green-400" /> {whois}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="flex w-full md:w-1/2 flex-col justify-center items-center bg-slate-300 md:p-5">
            <h4 className="text-2xl py-3 md:py-0">Benefits</h4>
            <div className="flex flex-col items-center p-5 md:p-10 ">
              <ul className="my-0  md:my-5">
                {benefits.map((benefit) => {
                  if (benefit != "") {
                    return (
                      <li className="mx-2 flex items-center gap-2 ">
                        <TiTick className="text-green-400" /> {benefit}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* faq section */}

        <div className="w-full flex flex-col justify-center items-center p-5 md:p-10 bg-slate-400 h-full md:min-h-[100vh]">
          <h3 className="text-2xl md:text-4xl leading-7 md:leading-10 py-3 font-semibold my-5">
            Ask Us Why ?
          </h3>
          {faqques.map((ques, idx) => {
            var ans = faqans[idx];

            if (ques != "") {
              return (
                <Accordion className="w-full md:w-1/2 my-1 ">
                  <AccordionSummary
                    expandIcon={<AiOutlinePlus className="text-xl" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="text-lg font-normal">
                      {ques}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="text-sm">{ans}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            }
          })}
        </div>

        {/* reviews section */}

        <div className="flex flex-col bg-pink-100  justify-center items-center p-10 min-h-[100vh]">
          <h3 className="text-2xl text-center md:text-4xl leading-7 md:leading-10 py-3 font-semibold my-5">
            WHAT OUR CUSTOMERS THINKS OF US
          </h3>
          <div className="flex items-center flex-wrap justify-center">
            {/* <Slider {...settings}> */}
            {reviews.response.reviews.map((review) => {
              return (
                <div
                  key={review.id}
                  className="flex flex-col w-[300px] m-2 bg-white p-3 rounded gap-1"
                >
                  <p className="font-semibold text-lg">
                    {review.user.display_name}
                  </p>
                  <p className="text-sm">{review.created_at}</p>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    className="text-pink-500 text-sm"
                  />
                  <p className="text-xs">{review.content}</p>
                </div>
              );
            })}

            {/* </Slider> */}
          </div>
        </div>

        {/* related products section */}
        <div className="flex flex-col items-center p-5">
          <h3 className="text-2xl md:text-4xl text-center leading-7 md:leading-10 py-3 font-semibold my-5">
            YOU MAY ALSO LIKE
          </h3>
          <div className="flex gap2 flex-wrap">
            {relatedproducts.products.map((rproduct) => {
              const variantid =
                "gid://shopify/ProductVariant/" + rproduct.variants[0].id;

              return (
                <div key={id} className={styles.card}>
                  <Link key={id} href={`/product/${handle}`}>
                    <a className={styles.image}>
                      <img
                        src={rproduct.featured_image}
                        alt="alt_image"
                        className={styles.product_image}
                      />
                    </a>
                  </Link>
                  <div className={styles.product_info}>
                    <div className={styles.name}>{rproduct.title}</div>
                    <div className={styles.rating}>
                      <AiFillStar /> <span>4.5</span>
                    </div>
                    <div className={styles.ratings}>
                      <span className={styles.reviews}>23 reviews</span>
                    </div>
                    <div className={styles.addtocart}>
                      <div className={styles.price}>
                        ₹{rproduct.price} <span>₹{rproduct.price_max}</span>
                      </div>
                      <div
                        className={styles.cart_button}
                        onClick={() => {
                          addtocart(variantid);
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
      </div>
    )
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
      variants(first: 250) {
        edges {
          node {
            id
            priceV2 {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
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

const addtocartquery = gql`
  mutation addtocart($cartid: ID!, $variantid: ID!, $quantity: Int!) {
    cartLinesAdd(
      cartId: $cartid
      lines: [{ quantity: $quantity, merchandiseId: $variantid }]
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

export async function getServerSideProps(context) {
  const { data } = await storefront(productquery, {
    handle: context.query.slug,
  });

  const id = data.product.id;
  const reviewid = id.substring(id.indexOf("t") + 2);

  const relatedproducts = await relatedproduct(reviewid);

  const reviews = await getreviews(reviewid);
  return {
    props: {
      product: data.product,
      reviews: reviews,
      rid: reviewid,
      relatedproducts: relatedproducts,
    },
  };
}

export default Post;
