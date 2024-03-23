import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {useSignup} from './useSignup';
import { useNavigate } from "react-router-dom";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import Footer from "./global-components/footer-v2";
import { Button } from "react-bootstrap";
import {useBuyerSignup} from './useBuyerSignup';

function SignUpPage() {
  const { mutate: mutateBuyerSignup } = useBuyerSignup();
  const {mutate} = useSignup();
  const navigate = useNavigate();
  const { register, handleSubmit,reset, setError, clearErrors, formState: { errors } } = useForm();
  let password;
  let buyerpassword;
  const validateEmail = (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      setError("email", { type: "manual", message: "Please provide a valid email address" });
    } else {
      clearErrors("email");
    }
  };

  const validatePassword = (value) => {
    const minLengthRegex = /^.{8,}$/;
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterPattern = "[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-=|\\\\/]";
    const specialCharacterRegex = new RegExp(specialCharacterPattern);
    password = value;

    if (!minLengthRegex.test(value) ||
    !capitalLetterRegex.test(value) ||
    !specialCharacterRegex.test(value)) {
      setError("password", { type: "manual", message:  "Password must be at least 8 characters long and contain at least one capital letter and one special character." });
    } else {
      clearErrors("password");
    }
  };

  const validateBuyerPassword = (value) => {
    const minLengthRegex = /^.{8,}$/;
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterPattern = "[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-=|\\\\/]";
    const specialCharacterRegex = new RegExp(specialCharacterPattern);
    buyerpassword = value;

    if (!minLengthRegex.test(value) ||
    !capitalLetterRegex.test(value) ||
    !specialCharacterRegex.test(value)) {
      setError("buyerpassword", { type: "manual", message:  "Password must be at least 8 characters long and contain at least one capital letter and one special character." });
    } else {
      clearErrors("buyerpassword");
    }
  };

  const confirmPassword = (value) => {
    if (value !== password) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
    } else {
      clearErrors("confirmPassword");
    }
  };

  const confirmBuyerPassword = (value) => {
    if (value !== password) {
      setError("buyerconfirmPassword", { type: "manual", message: "Passwords do not match" });
    } else {
      clearErrors("buyerconfirmPassword");
    }
  };

  const [role, setRole] = useState('seller'); 

  const toggleRole = () => {
    setRole(role === "seller" ? "buyer" : "seller");
  };

  const onSubmit = ({ name, email, password }) => {
    mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          reset();
          if (data && data.redirectUrl) {
            navigate(data.redirectUrl, { replace: true });
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const onBuyerSubmit = ({ buyername, buyeremail, buyerpassword }) => {
    mutateBuyerSignup(
      { buyername, buyeremail, buyerpassword },
      {
        onSuccess: (data) => {
          reset();
          if (data && data.redirectUrl) {
            navigate(data.redirectUrl, { replace: true });
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };
  
  return (
    <div
      className="container-fluid p-0"
      style={{background:"whitesmoke"}}
    >
      
       <Navbar />
       { role === "seller" ?
      <PageHeader headertitle=" Sign up as Seller" role={role} toggleRole={toggleRole}/>
      :  <PageHeader headertitle=" Sign up as Buyer" role={role} toggleRole={toggleRole}/>
  }

<div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {role === "seller" ?
          <Button onClick={toggleRole} style={{ cursor: 'pointer', color: 'white' }}>Sign up as Buyer</Button>
          : <Button onClick={toggleRole} style={{ cursor: 'pointer', color: 'white' }}>Sign up as Seller</Button>
        }
      </div>

      {/* White background div containing both partitions */}
      <div
        className="bg-white"
        style={{ margin: "auto",marginTop: "5rem" ,maxWidth: "800px", padding: "20px",
        borderRadius: '8px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'}}
       
      >
        <div className="row justify-content-center align-items-center" >
          {/* Left side with an image */}
          <div className="col-md-6">
            <div className="p-4">
              <img
                src="https://img.freepik.com/free-vector/forms-concept-illustration_114360-4947.jpg?w=826&t=st=1703261903~exp=1703262503~hmac=79f123506c9bc7721b99c0ace286b2089dc9b418f59deb27eec3f82aafea9c85"
                alt="Sign up Logo"
                className="img-fluid rounded-circle"
              />
            </div>
          </div>

          {/* Right side with login form */}
         
          <div className="col-md-6">
            <div className="p-4">
              {role === "seller" ?
              <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
                 Sign-up as <br /> Seller
              </h2>
              :
              <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
              Sign-up as <br /> Buyer
            </h2>
}
{ role === "seller" ?
  <>
              <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name</label>
              <input
                type="name"
                placeholder="John Doe"
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
                {...register("name", {
                  required: "This field is required",
                })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                {...register("email", {
                  required: "This field is required",
                })}
                onBlur={(e) => validateEmail(e.target.value)}
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                {...register("password", {
                  required: "This field is required",
                })}
                onBlur={(e) => validatePassword(e.target.value)}
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              <label>Confirm Password</label>
        <input
          type="password"
          placeholder=""
          {...register("confirmPassword", {
            required: "This field is required",
          })}
          onBlur={(e) => confirmPassword(e.target.value)}
          className="form-control mb-3"
          style={{ borderRadius: "3em", background: "#E6E6E6" }}
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

              <button type="submit"
                className="btn btn-base w-100"
                style={{ borderRadius: "3em" }}
              >
                Create Account
              </button>
               </form>
              <div className="text-center mt-5">
                <a href="sign-in" className="text-decoration-none">
                  <strong style={{ color: "#B7B7B7" }}>
                    Already have an account ? <strong>Login</strong>
                  </strong>
                </a>
              </div>
              </>
              :
              <>
                <form onSubmit={handleSubmit(onBuyerSubmit)}>
              <label>Name</label>
              <input
                type="name"
                placeholder="Abdullah"
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
                {...register("buyername", {
                  required: "This field is required",
                })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                {...register("buyeremail", {
                  required: "This field is required",
                })}
                onBlur={(e) => validateEmail(e.target.value)}
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
              />
              {errors.buyeremail && <p style={{ color: 'red' }}>{errors.buyeremail.message}</p>}
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                {...register("buyerpassword", {
                  required: "This field is required",
                })}
                onBlur={(e) => validateBuyerPassword(e.target.value)}
                className="form-control mb-3"
                style={{ borderRadius: "3em", background: "#E6E6E6" }}
              />
              {errors.buyerpassword && <p style={{ color: 'red' }}>{errors.buyerpassword.message}</p>}
              <label>Confirm Password</label>
        <input
          type="password"
          placeholder=""
          {...register("buyerconfirmPassword", {
            required: "This field is required",
          })}
          onBlur={(e) => confirmBuyerPassword(e.target.value)}
          className="form-control mb-3"
          style={{ borderRadius: "3em", background: "#E6E6E6" }}
        />
        {errors.buyerconfirmPassword && <p style={{ color: 'red' }}>{errors.buyerconfirmPassword.message}</p>}

              <button type="submit"
                className="btn btn-base w-100"
                style={{ borderRadius: "3em" }}
              >
                Create Account
              </button>
               </form>
              <div className="text-center mt-5">
                <a href="sign-in" className="text-decoration-none">
                  <strong style={{ color: "#B7B7B7" }}>
                    Already have an account ? <strong>Login</strong>
                  </strong>
                </a>
              </div>
              </>
}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
