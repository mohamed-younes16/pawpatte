"use server";
import qs from "query-string";

const apiLink = process.env.NEXT_PUBLIC_API_URL;

const safeJSONParse = async (response: Response) => {
  try {
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

export const getBillBoards = async () => {
  const response = await fetch(`${apiLink}/billboards`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const getAllSizes = async () => {
  const response = await fetch(`${apiLink}/sizes`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const getAllColors = async () => {
  const response = await fetch(`${apiLink}/colors`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const getAllcategories = async () => {
  try {
    const response = await fetch(`${apiLink}/categories`, {
      cache: "no-cache",
    });
    
    const data = await safeJSONParse(response);
    
    // Ensure the data is serializable
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getProductsByName = async (name: string) => {
  const response = await fetch(`${apiLink}/products/search?q=${name}`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
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

  const response = await fetch(url, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const getDiscountEligible = async (userId: string) => {
  const response = await fetch(`${apiLink}/discount?userId=${userId}`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const checkDiscountCode = async (
  userId: string,
  discountCode: string
) => {
  const response = await fetch(
    `${apiLink}/discount/check?userId=${userId}&discountCode=${discountCode}`,
    {
      cache: "no-cache",
    }
  );
  return safeJSONParse(response);
};

export const getProduct = async (id: string) => {
  const response = await fetch(`${apiLink}/products/${id}`, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};

export const getCategory = async (query: Query) => {
  const url = qs.stringifyUrl(
    {
      url: `${apiLink}/categories/${query.categoryId}`,
      query: { ...query },
    },
    { skipNull: true }
  );

  const response = await fetch(url, {
    cache: "no-cache",
  });
  return safeJSONParse(response);
};
