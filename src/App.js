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
import List from "./components/section-components/Listing/List";
import ListRent from './components/section-components/Listing/ListRent';
import AllListings from "./components/section-components/Listing/AllListings";
import SellerProfile from "./components/section-components/Listing/SellerProfile";
import SellerMessage from "./components/section-components/Listing/SellerMessage";
import { PrivateRoute } from "./components/AuthDashboardRoutes";
import BuyerLayout from './components/ui/BuyerAppLayout';
import AdminLogin from "./components/section-components/AdminDashboard/AdminLogin";
import AdminDashboard from "./components/section-components/AdminDashboard/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
});

function App() {

  const { isAuthenticated} = useAuth();

  function ProtectedRoute({ element }) {
  
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
      <GlobalStyle />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeV1 />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />


            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/office-map" element={<MapPage />} />
            <Route element={<ProtectedRoute />}>
            {/* Protected routes as children */}
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addlistings" element={<List />} />
              <Route path="/addlistingsrent" element={<ListRent />} />
              <Route path="/alllistings" element={<AllListings />} />
              <Route path="/user" element={<SellerProfile />} />
              <Route path="/message/*" element={<SellerMessage />} />
          </Route>

          <Route
                path="/dashboardlinks/*"
                element={
                  <PrivateRoute
                    element={<BuyerLayout />}
                    path="/dashboardlinks/*"
                  />
                }
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