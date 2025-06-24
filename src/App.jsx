import Home from './components/home/Home'
import Login from './components/login/Login'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" exact element={<Home />} />
    //     <Route path="/login" exact element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
