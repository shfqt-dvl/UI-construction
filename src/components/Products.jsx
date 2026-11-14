import "./Products.css";
import {
  ArrowUpRight,
  Blocks,
  Paintbrush,
  Pipette,
  Wrench,
} from "lucide-react";



const MAIN_WEBSITE =
  "https://mushadconstructionin.vercel.app/#product-categories";
  
const categories = [
  {
    title: "Building Materials",
    description: "Cement, TMT steel, iron, coils, stones, and nails.",
    icon: Blocks,
    image: "/Brands/material.png",
    number: "01",
    link: MAIN_WEBSITE,
  },
  {
    title: "Paints & Finishes",
    description: "Interior and exterior paints, primers, and putty.",
    icon: Paintbrush,
    image: "/Brands/paint.png",
    number: "02",
    link: MAIN_WEBSITE,
  },
  {
    title: "Pipes & Water Tanks",
    description: "Pipes, tanks, taps, showers, and plumbing fittings.",
    icon: Pipette,
    image: "/Brands/pipes.png",
    number: "03",
    link: MAIN_WEBSITE,
  },
  {
    title: "Sanitary & Hardware",
    description: "Sanitaryware, screws, tools, fasteners, and accessories.",
    icon: Wrench,
    image: "/Brands/sanitary.png",
    number: "04",
    link: MAIN_WEBSITE,
  },
];


export default function Products() {
  return (
    <section
      className="section products-section"
      id="products"
      data-aos="fade-up"
    >
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE OFFER</span>
          <h2>
            Explore Our <span>Products</span>
          </h2>
          <p>
            Construction essentials for projects big and small.
          </p>
        </div>

        <div className="products-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article className="product-card" key={category.title}>
                <div className="product-image">
                  <img
                    src={category.image}
                    alt={category.title}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="product-placeholder">
                    <Icon size={65} strokeWidth={1.25} />
                  </div>

                  <span className="product-number">
                    {category.number}
                  </span>
                </div>

                <div className="product-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>

                  <a
  className="product-link"
  href={category.link}
  target="_blank"
  rel="noopener noreferrer"
>
  Explore Products <ArrowUpRight size={17} />
</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
