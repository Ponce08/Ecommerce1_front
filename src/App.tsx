import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageAbout } from './components/about/PageAbout.tsx';
import { Home } from './components/home/Home.tsx';
import { PageCards } from './components/pageCards/PageCards.tsx';
import { PageDetails } from './components/pageDetails/PageDetails.tsx';
import { PageFinishShopping } from './components/pageFinishShopping/PageFinishShopping.tsx';
import { PageLogin } from './components/pageLogin/PageLogin.tsx';
import { PagePolicies } from './components/pagePolicies/PagePolicies.tsx';
import { PageRegister } from './components/register/PageRegister.tsx';
import { CartProvider } from './components/shoppingCart/CartContext.tsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<PageCards />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/details" element={<PageDetails />} />
          <Route path="/finishshopping" element={<PageFinishShopping />} />
          <Route path="/policies" element={<PagePolicies />} />
          <Route path="/about" element={<PageAbout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
