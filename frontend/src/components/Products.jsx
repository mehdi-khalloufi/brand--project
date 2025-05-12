import React from "react";
import Product from "./Product";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Astronomic ",
      image: "/photos/pic5.png",
      price: 199,
    },
    {
      id: 2,
      name: "Nebula",
      image: "/photos/pic6.png",
      price: 89,
    },
    {
      id: 3,
      name: "Lunar t",
      image: "/photos/pic7.png",
      price: 249,
    },
    {
      id: 4,
      name: "Galaxy ",
      image: "/photos/pic8.png",
      price: 49,
    },
    {
      id: 5,
      name: "Meteor ",
      image: "/photos/pic9.png",
      price: 179,
    },
    {
      id: 6,
      name: "Sacrifice",
      image: "/photos/pic10.png",
      price: 199,
    },
  ];

  return (
    <>
      <section
        id="Projects"
        class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => (
          <Product
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
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
