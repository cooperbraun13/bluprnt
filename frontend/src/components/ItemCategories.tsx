import './ItemCategories.css';

const categories = [
    {name: 'Bathroom', imgSrc: 'public/images/bathroombluprnt.jpeg'},
    {name: 'Kitchen', imgSrc: 'public/images/kitchenbluprnt.jpeg'},
    {name: 'Flooring', imgSrc: 'public/images/flooringbluprnt.jpeg'},
    {name: 'Lighting', imgSrc: 'public/images/lightingbluprnt.jpeg'},
    {name: 'Outdoor', imgSrc: 'public/images/outdoorsbluprnt.jpg'},
    {name: 'Appliances', imgSrc: 'public/images/appliancesbluprnt.jpg'},
]
export default function itemCat(){
    return (
    <div className="item-categories">
        {categories.map((category) => (
            <div key={category.name} className="category-card">
                <img src={category.imgSrc} alt={category.name} className="category-img" />
                <p className="category-name">{category.name}</p>
            </div>
        ))}
    </div>);
}