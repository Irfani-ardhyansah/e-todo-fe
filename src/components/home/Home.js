import Navbar from '../plain/Navbar'
import Header from '../plain/Header'
import Content from './Content'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="container-body">
                <Header />
                <Content />
            </div>
        </>
    )
}

export default Home;