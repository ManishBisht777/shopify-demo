import { storefront } from ".";
// {
//     "data": {
//       "cart": {
//         "checkoutUrl": "https://curlcure.com/cart/c/0fb16a488ea3b433033c48150c5f1141",
//         "id": "gid://shopify/Cart/0fb16a488ea3b433033c48150c5f1141",
//         "updatedAt": "2022-07-19T10:21:47Z",
//         "createdAt": "2022-07-19T10:21:46Z",
//         "cost": {
//           "totalAmount": {
//             "amount": "0.0"
//           }
//         },
//         "lines": {
//           "edges": []
//         }
//       }
//     }
//   }

const gql = String.raw;

const addtocartquery = gql`
  mutation addtocart($cartid: ID!, $variantid: ID!) {
    cartLinesAdd(
      cartId: $cartid
      lines: [{ quantity: 1, merchandiseId: $variantid }]
    ) {
      cart {
        lines {
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

// {
//     products(first:1){
//       edges{
//         node{
//           id
//           handle
//           variants(first:10){
//            edges{
//             node{
//               id
//               priceV2{
//                 amount
//               }
//             }
//           }
//           }
//         }
//       }
//     }
//   }
export async function addtocart() {
  //   let localcartdata = await JSON.parse(
  //     window.localStorage.getItem("curlcure:cart")
  //   );

  //   const { data } = await storefront(addtocartquery, {
  //     cartid: localcartdata.id,
  //     variantid: variantid,
  //   });

  //   console.log(data);

  const data = "hello";

  console.log("hello");

  return {
    body: JSON.stringify(data),
  };
}
