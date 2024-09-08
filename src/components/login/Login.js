import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    return (
        <>
            <div class="container h-100" style={{width: '50%'}}>
                <div class="card p-3 row h-100">
                    <div className="d-flex justify-content-center mb-4">
                        <h3 className="text-white">LOGIN</h3>
                    </div>
                    <form class="col-12">
                        <div class="form-group mb-4">
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email"/>
                        </div>
                        <div class="form-group mb-4">
                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Password"/>
                        </div>
                        <div class="form-group d-flex justify-content-center align-items-center">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>   
                </div>
            </div>
        </>
    )
}

export default Login;