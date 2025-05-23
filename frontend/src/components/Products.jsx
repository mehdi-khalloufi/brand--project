import React, { useEffect, useState } from "react";
import Product from "./Product";
import api from "../api/axios";
import { LifeLine } from "react-loading-indicators";

const Products = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  // Step 1: Group products by name with sizes
  const groupProductsByName = (data) => {
    const groupedByName = {};

    data.forEach((product) => {
      const name = product.name;

      if (!groupedByName[name]) {
        groupedByName[name] = {
          ...product,
          sizes: [product.size],
        };
      } else {
        // avoid duplicate sizes if any
        if (!groupedByName[name].sizes.includes(product.size)) {
          groupedByName[name].sizes.push(product.size);
        }
      }
    });

    return Object.values(groupedByName); // array of products with sizes array
  };

  // Step 2: Group products by category after grouping by name
  const groupProductsByCategory = (products) => {
    const groupedByCategory = {};

    products.forEach((product) => {
      const category = product.category || "Uncategorized";

      if (!groupedByCategory[category]) {
        groupedByCategory[category] = [];
      }
      groupedByCategory[category].push(product);
    });

    return groupedByCategory; // { category1: [...], category2: [...] }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products");
      // First group by name (sizes grouped inside each product)
      const groupedByName = groupProductsByName(response.data);
      // Then group by category
      const groupedByCategory = groupProductsByCategory(groupedByName);
      setProductsByCategory(groupedByCategory);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return  <div className="fixed inset-0 bg-opacity-70 z-50 flex items-center justify-center">
          <LifeLine color="#ee2b2b" size="medium" text="" textColor="" />
        </div>;

  return (
    <>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{category}</h2>
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14">
            {products.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                image={product.image_url}
                price={product.price}
                sizes={product.sizes} // you can pass sizes to your Product component if needed
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default Products;
