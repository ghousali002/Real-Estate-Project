import React, {useState} from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import SignIn from "./section-components/sign-in";
import Footer from "./global-components/footer-v2";
import BuyerSignIn from './section-components/BuyerDashboard/BuyerSignIn';
import { Button } from "react-bootstrap";

const SignInPage = () => {
  
  const [role, setRole] = useState('seller'); 

  const toggleRole = () => {
    setRole(role === "seller" ? "buyer" : "seller");
  };

  return (
    <div>
      <Navbar />
      { role === "seller" ?
      <PageHeader headertitle=" Sign In as Seller" role={role} toggleRole={toggleRole}/>
      :  <PageHeader headertitle=" Sign In as Buyer" role={role} toggleRole={toggleRole}/>
  }
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {role === "seller" ?
          <Button onClick={toggleRole} style={{ cursor: 'pointer', color: 'white' }}>Sign in as Buyer</Button>
          : <Button onClick={toggleRole} style={{ cursor: 'pointer', color: 'white' }}>Sign in as Seller</Button>
        }
      </div>
      { role === "seller" ?
      <SignIn />
      : <BuyerSignIn/>
}
      <Footer />
    </div>
  );
};

export default SignInPage;
