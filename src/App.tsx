import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/about/About.tsx';
import { Home } from './components/home/Home.tsx';
import { Cards } from './components/pageCards/Cards.tsx';
import { Details } from './components/pageDetails/Details.tsx';
import { FinishShopping } from './components/pageFinishShopping/FinishShopping.tsx';
import { Login } from './components/pageLogin/Login.tsx';
import { PagePolicies } from './components/pagePolicies/PagePolicies.tsx';
import { RegisterForm } from './components/register/RegisterForm.tsx';
import ScrollToTop from './utils/ScrollToTop.tsx';
import { GlobalProvider } from './globalState/GlobalContext.tsx';
import { CardsCategory } from './components/category/CardsCategory.tsx';
import { Favorites } from '@/components/favorites/Favorites.tsx';
import Dashboard from '@/components/dashboard/Dashboard.tsx';
import { ProductsDashboard } from '@/components/dashboard/ProductsDashboard.tsx';
import { EditProductAdmin } from '@/components/dashboard/EditProductAdmin.tsx';
import { AddProductAdmin } from '@/components/dashboard/AddProductAdmin.tsx';
import { ProtectedRoute } from '@/utils/FunctionsDashboard.tsx';

// import ImageUploader from '@/components/dashboard/Ensayo.tsx';

const client = new ApolloClient({
  uri: 'https://ecommerce1-back.onrender.com/graphql',
  // uri: 'http://localhost:4000/graphql',
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
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/finishshopping" element={<FinishShopping />} />
            <Route path="/policies" element={<PagePolicies />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Cards />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/product/:id" element={<Details />} />
            <Route path="/products/:categorys" element={<CardsCategory />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products_dashboard"
              element={
                <ProtectedRoute>
                  <ProductsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products_dashboard/:id"
              element={
                <ProtectedRoute>
                  <EditProductAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_product_admin"
              element={
                <ProtectedRoute>
                  <AddProductAdmin />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/ensayo" element={<ImageUploader />} /> */}
          </Routes>
        </Router>
      </GlobalProvider>
    </ApolloProvider>
  );
}

export default App;
