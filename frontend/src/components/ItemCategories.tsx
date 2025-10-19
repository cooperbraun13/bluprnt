import "./ItemCategories.css";

const categories = [
  { name: "Bathroom", imgSrc: "/bathroombluprnt.jpg" },
  { name: "Kitchen", imgSrc: "/kitchenbluprnt.jpg" },
  { name: "Flooring", imgSrc: "/flooringbluprnt.jpg" },
  { name: "Lighting", imgSrc: "/lightingbluprnt.jpg" },
  { name: "Outdoor", imgSrc: "/outdoorsbluprnt.jpg" },
  { name: "Appliances", imgSrc: "/appliancesbluprnt.jpg" },
];
export default function itemCat() {
  return (
    <div className="item-categories">
      {categories.map((category) => (
        <div key={category.name} className="category-card">
          <img
            src={category.imgSrc}
            alt={category.name}
            className="category-img"
          />
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
