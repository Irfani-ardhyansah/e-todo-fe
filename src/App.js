import Page from './components/plain/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
