import "../../styles/product.css"

const ProductFilter = () => {
    return (
        <aside className="filter-section">

            <h3>Filter by:</h3>

            <div className="filter-options">

                <div className="filter-btn">
                    Category

                    <select className="filter-dropdown">
                        <option>All</option>
                        <option>Frocks</option>
                        <option>Blouses</option>
                        <option>Tops</option>
                        <option>Skirts</option>
                    </select>
                </div>

                <div className="filter-btn">
                    Price

                    <select className="filter-dropdown">
                        <option>All</option>
                        <option>0-1000</option>
                        <option>1000-3000</option>
                        <option>3000-5000</option>
                    </select>
                </div>

                <div className="filter-btn">
                    Type

                    <select className="filter-dropdown">
                        <option>All</option>
                        <option>Casual</option>
                        <option>Formal</option>
                    </select>
                </div>

            </div>

        </aside>
    );
};

export default ProductFilter;