const Header = () => {
    return (
        <>
            <div className="header-title d-flex justify-content-between align-items-center">
                <div className="section-title">
                    <div className="breadcumb d-flex">
                        <div className="me-1">Projects </div> / <div className="ms-1"> RCS Admin Site</div>
                    </div>
                    <div className="title fs-6 fw-bold">ISSUES</div>
                </div>

                <div className="section-filter">
                    <button className="btn btn-sm btn-filter me-2">Share</button>
                    <button className="btn btn-sm btn-filter me-2">Export issues</button>
                    <button className="btn btn-sm btn-filter me-2">Go to all issues</button>
                    <button className="btn btn-sm btn-filter me-2">Detail view id</button>
                    <button className="btn btn-sm btn-filter me-2">...</button>
                </div>
            </div>

            <div className="header-filter mt-4 d-flex justify-content-between align-items-center">
                <div className="left-side">
                    <input className="form-filter p-1 me-1" placeholder="Search..."/>
                    <button className="btn btn-sm btn-filter me-1">Project</button>
                    <button className="btn btn-sm btn-filter me-1">Type</button>
                    <button className="btn btn-sm btn-filter me-1">Status</button>
                    <button className="btn btn-sm btn-filter me-1">Assignee</button>
                    <button className="btn btn-sm btn-filter me-1">More</button>
                    |
                    <button type="button" class="btn btn-link">Filter</button>
                </div>
                <div className="right-side">
                    <button className="btn btn-sm btn-filter me-1">Basic</button>
                    <button className="btn btn-sm btn-filter me-1">JQL</button>
                </div>
            </div>
        </>
    )
}

export default Header;