import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeV1 from "./components/home-v1";
import PropertyDetailsRent from "./components/property-details-rent";
import PropertyDetailsSale from "./components/property-details-sale";
import PropertyForSale from "./components/property-grid-for-sale";
import PropertyForRent from "./components/property-grid-for-rent";
import About from "./components/about";
import Team from "./components/team";
import Gallery from "./components/gallery";
import SignIn from "./components/sign-in";
import MapPage from "./components/map";
import AddProperty from "./components/add-property";
import Contact from "./components/contact";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./components/sign-up";
import Dashboard from './components/Dashboard';
import GlobalStyle from './GlobalCss';
import AppLayout from "./components/ui/AppLayout";
import { useAuth } from './components/AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types"; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
});

function App() {

  function ProtectedRoute({ element }) {
    const { isAuthenticated} = useAuth();
  
    return isAuthenticated ? (
      <AppLayout>{element}</AppLayout>
    ) : (
      <Navigate to="/sign-in" replace />
    );
  }

  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* <GlobalStyle /> */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeV1 />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/office-map" element={<MapPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="/property-for-sale" element={<PropertyForSale />} />
            <Route path="/property-for-rent" element={<PropertyForRent />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property-details-rent" element={<PropertyDetailsRent />} />
            <Route path="/property-details-sale" element={<PropertyDetailsSale />} />
          </Routes>
        </div>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#374151'
          }
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
