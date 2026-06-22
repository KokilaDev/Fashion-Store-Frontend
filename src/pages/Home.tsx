import Logout from "../components/auth/Logout"

const Home = () => {

    return (
        <div className="box-container">
            <div className="home-header">
                <h1 className="home-title">Home</h1>
                <Logout />
            </div>
        </div>
    )
}

export default Home