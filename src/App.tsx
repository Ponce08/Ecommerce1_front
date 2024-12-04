import './App.css';
import { Home } from './components/home/Home.tsx';
import { PageCards } from './components/pageCards/PageCards.tsx';
import { PageDetails } from './components/pageDetails/PageDetails.tsx';
import { PageFinishShopping } from './components/pageFinishShopping/PageFinishShopping.tsx';
import { PageLogin } from './components/pageLogin/PageLogin.tsx';
import { PageRegister } from './components/register/PageRegister.tsx';

function App() {
  return (
    <>
      {/* <Home /> */}
      {/* <PageCards/> */}
      {/* <PageRegister /> */}
      {/* <PageLogin /> */}
      {/* <PageDetails /> */}
      <PageFinishShopping />
    </>
  );
}

export default App;
