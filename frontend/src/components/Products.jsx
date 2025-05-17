import React from "react";
import Product from "./Product";
import { useEffect, useState } from "react";
import api from "../api/axios";
const Products = () => {
  const [products, setProducts] = useState([]);

  const groupProductsByName = (data) => {
    const grouped = {};

    data.forEach((product) => {
      const name = product.name;

      if (!grouped[name]) {
        grouped[name] = {
          ...product,
          sizes: [product.size],
        };
      } else {
        grouped[name].sizes.push(product.size);
      }
    });

    return Object.values(grouped);
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products");
      const grouped = groupProductsByName(response.data);
      console.log(grouped);
      setProducts(grouped);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section
        id="Projects"
        class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => {
          console.log("Image URL:", product.image_url);
          return (
            <Product
              name={product.name}
              image={product.image_url}
              price={product.price}
            />
          );
        })}
        {/* <Product name="Astronomic Hoodie" image="/photos/pic5.png" price={199}/>
        <Product name="Japaneese" image="/photos/pic8.png" price={299}/>
        <Product name="Sacrifice Hoodie" image="/photos/pic6.png" price={99}/>
        <Product name="Angelic" image="/photos/pic9.png" price={249}/>
        <Product name="Berserk Guts Hoodie" image="/photos/pic10.png" price={199}/>
        <Product name="Ninja Hoodie" image="/photos/pic3.png" price={199}/> */}
      </section>

      {/* <!-- credit -->
<div class="text-center py-10 px-10">
    <h2 class="font-bold text-2xl md:text-4xl mb-4">Thanks to <a href="https://unsplash.com/@nixcreative"
            class="underline font-black">Tyler Nix</a> for those AMAZING product images!</h2>
</div> */}

      <script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
      {/* <script>
    kofiWidgetOverlay.draw('mohamedghulam', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#323842',
            'floating-chat.donateButton.text-color': '#fff'
        });
</script> */}
    </>
  );
};

export default Products;
