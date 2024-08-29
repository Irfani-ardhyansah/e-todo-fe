import Sidebar from './Sidebar';
import './Sidebar.css'

const Content = () => {
    return (
        <>
            <div className="row mt-4">
                <Sidebar />
                <div className="col-6"></div>
                <div className="col-4"></div>
            </div>
        </>
    )
}

export default Content;