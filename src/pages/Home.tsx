import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">Welcome to the Fashion Store!</h1>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Home</h2>
            <p className="text-lg text-blue-700 text-blue-600">Explore our latest collections and enjoy shopping!</p>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate("/products")}
            >
                View Products
            </button>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate("/wishlist")}
            >
                View Wishlist
            </button>
        </div>
    )
}

export default Home