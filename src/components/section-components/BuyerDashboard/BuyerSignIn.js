import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useSignin} from './useSignin';

const SignIn = () => {
  const {mutate} = useSignin();
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors }  } = useForm();

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


    if (!minLengthRegex.test(value) ||
    !capitalLetterRegex.test(value) ||
    !specialCharacterRegex.test(value)) {
      setError("password", { type: "manual", message:  "Password must be at least 8 characters long and contain at least one capital letter and one special character." });
    } else {
      clearErrors("password");
    }
  };

  useEffect(() => {
    const $ = window.$;
    $("body").addClass("bg-gray");

    // Cleanup function
    return () => {
      $("body").removeClass("bg-gray");
    };
  }, []);

  const onSubmit = ({email, password}) => {
    mutate(
      { email, password },
      {
        onSettled: () => reset(),
      })
  };
  const boxStyle = {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div className="signin-page-area " >
      <div className="bg-white" style={{ margin: "auto",marginTop: "5rem" ,maxWidth: "800px", padding: "30px",
        borderRadius: '8px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'}} >
        <div className=" row justify-content-center align-items-center" >
        <div className="col-md-6">
            <div className="p-4">
              <img
                
                src={"/assets/img/LoginPic.jpg"}
                alt="Logo"
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
          <div className="col-md-6">  
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
              Login as  <br/> Buyer
              </h2>
            <form className="signin-inner" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                  
                    <input
                      type="text"
                      placeholder="email"
                      {...register("email", {
                        required: "This field is required",
                      })}
                      onBlur={(e) => validateEmail(e.target.value)}
                      style={{ borderRadius: "3em"}}
                    />
                     {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                  </label>
                </div>

                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "This field is required",
                      })}
                      onBlur={(e) => validatePassword(e.target.value)}
                    />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                  </label>
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="col-12">
                  <a href="#">Forgotten Your Password</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
