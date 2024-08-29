const Sidebar = () => {
    const items = Array.from({ length: 11 }, (_, index) => index + 1);
    
    return (
        <>
            <div className="col-2">
                <div className="card" style={{width: '15.9rem'}}>
                    <div className="card-header">
                        <button className="btn-filter-sidebar" > Created </button>
                    </div>
                    <ul className="list-group list-group-flush">
                        {items.map((item) => (
                            <li className="list-group-item">
                                <div className="content-top mb-2">
                                    CRM on Dev is Broken
                                </div>
                                <div className="content-bottom d-flex justify-content-between mb-2">
                                    <div className="left-side">
                                        RAS-1093
                                    </div>
                                    <div className="right-side">
                                        IM
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer">
                        10 of 10000
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;