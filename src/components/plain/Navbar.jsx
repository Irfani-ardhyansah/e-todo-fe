import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../provider/authProvider";

const Navbar = () => {
  const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useAuth();

  const handleLogout = () => {
    setAccessToken("")
    setRefreshToken("")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Client Side</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
