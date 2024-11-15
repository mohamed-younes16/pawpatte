"use server";
import qs from "query-string";

const apiLink = process.env.NEXT_PUBLIC_API_URL;

export const getBillBoards = async () => {
  return await (
    await fetch(`${apiLink}/billboards`, {
      cache: "no-cache",
    })
  ).json();
};
export const getAllSizes = async () => {
  return await (
    await fetch(`${apiLink}/sizes`, {
      cache: "no-cache",
    })
  ).json();
};
export const getAllColors = async () => {
  return await (
    await fetch(`${apiLink}/colors`, {
      cache: "no-cache",
    })
  ).json();
};
export const getAllcategories = async () => {
  let products = [];
  const req = async () =>
    await (
      await fetch(`${apiLink}/categories`, {
        cache: "no-cache",
      })
    ).json();
  products = await req();
  return products;
};
export const getProductsByName = async (name: string) => {
  return await (
    await fetch(`${apiLink}/products/search?q=${name}`, {
      cache: "no-cache",
    })
  ).json();
};
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}
export const getAllProducts = async (query: Query) => {
  const url = qs.stringifyUrl(
    {
      url: `${apiLink}/products`,
      query: { ...query },
    },
    { skipNull: true }
  );

  return await (
    await fetch(url, {
      cache: "no-cache",
    })
  ).json();
};
export const getDiscountEligible = async (userId: string) => {

  return await (
    await fetch(`${apiLink}/discount?userId=${userId}`, {
      cache: "no-cache",
    })
  ).json();
};
export const checkDiscountCode = async (
  userId: string,
  discountCode: string
) => {
  return await (
    await fetch(
      `${apiLink}/discount/check?userId=${userId}&discountCode=${discountCode}`,
      {
        cache: "no-cache",
      }
    )
  ).json();
};
export const getProduct = async (id: string) => {
  return await (
    await fetch(`${apiLink}/products/${id}`, {
      cache: "no-cache",
    })
  ).json();
};

export const getCategory = async (query: Query) => {
  const url = qs.stringifyUrl(
    {
      url: `${apiLink}/categories/${query.categoryId}`,
      query: { ...query },
    },
    { skipNull: true }
  );

  return await (
    await fetch(url, {
      cache: "no-cache",
    })
  ).json();
};
