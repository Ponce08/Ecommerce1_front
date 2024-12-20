import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageAbout } from './components/about/PageAbout.tsx';
import { Home } from './components/home/Home.tsx';
import { PageCards } from './components/pageCards/PageCards.tsx';
import { PageDetails } from './components/pageDetails/PageDetails.tsx';
import { PageFinishShopping } from './components/pageFinishShopping/PageFinishShopping.tsx';
import { PageLogin } from './components/pageLogin/PageLogin.tsx';
import { PagePolicies } from './components/pagePolicies/PagePolicies.tsx';
import { PageRegister } from './components/register/PageRegister.tsx';
import ScrollToTop from './components/utils/ScrollToTop.tsx';
import { GlobalProvider } from './globalState/GlobalContext.tsx';
import { PageCategory } from './components/category/PageCategory.tsx';

const client = new ApolloClient({
  uri: 'https://ecommerce1-back.onrender.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<PageCards />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/details" element={<PageDetails />} />
            <Route path="/finishshopping" element={<PageFinishShopping />} />
            <Route path="/policies" element={<PagePolicies />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/products" element={<PageCards />} />
            <Route path="products/:categorys" element={<PageCategory />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </ApolloProvider>
  );
}

export default App;
