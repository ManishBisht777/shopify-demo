export async function storefront(query, variables = {}) {
  try {
    const data = await fetch(
      "https://inari-naturals.myshopify.com/api/2022-07/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-token":
            "0c6679d7e70c0af1fc3793ce8892433f",
        },
        body: JSON.stringify({ query, variables }),
      }
    ).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Products not fetched");
  }
}

export async function getreviews(productid) {
  try {
    const data = await fetch(
      `https://api-cdn.yotpo.com/v1/widget/ikRh6OlpXX7iMQaKtGqzjik3dvpS99TQyqzpdXzq/products/${productid}/reviews.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Reviws not fetched");
  }
}

export async function relatedproduct(productid) {
  try {
    const data = await fetch(
      `https://inari-naturals.myshopify.com/recommendations/products.json?product_id=${productid}&limit=3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Products not fetched");
  }
}
