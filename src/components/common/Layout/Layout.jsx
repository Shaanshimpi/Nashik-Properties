import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({children}) => {
  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {/* Critical: This renders all child routes */}
        {children}
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;