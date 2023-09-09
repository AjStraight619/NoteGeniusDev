import useSWR from "swr";

export const useAddProduct = (path: string) => {
  const { mutate } = useSWR(path);

  const addProduct = async (data: any) => {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    mutate();
  };

  return addProduct;
};
