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

  return (
    <div className="signin-page-area pd-top-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
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
