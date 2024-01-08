import React from "react";
import { useForm } from "react-hook-form";
import {useSignup} from './useSignup';
import { useNavigate } from "react-router-dom";

function SignUpPage() {
 
  const {mutate} = useSignup();
  const navigate = useNavigate();
  const { register, handleSubmit,reset, setError, clearErrors, formState: { errors } } = useForm();
  let password;
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

  const confirmPassword = (value) => {
    if (value !== password) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
    } else {
      clearErrors("confirmPassword");
    }
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
  
  return (
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(172, 90, 190, 1) 0%, rgba(86, 90, 200, 1) 35%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* White background div containing both partitions */}
      <div
        className="bg-white"
        style={{ maxWidth: "800px", padding: "20px", borderRadius: "1em" }}
      >
        <div className="row justify-content-center align-items-center">
          {/* Left side with an image */}
          <div className="col-md-6">
            <div className="p-4">
              <img
                src="https://img.freepik.com/free-vector/forms-concept-illustration_114360-4947.jpg?w=826&t=st=1703261903~exp=1703262503~hmac=79f123506c9bc7721b99c0ace286b2089dc9b418f59deb27eec3f82aafea9c85"
                alt="Logo"
                className="img-fluid rounded-circle"
              />
            </div>
          </div>

          {/* Right side with login form */}
         
          <div className="col-md-6">
            <div className="p-4">
              <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
                Member Signup
              </h2>
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
                className="btn btn-success btn-block mb-3"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
