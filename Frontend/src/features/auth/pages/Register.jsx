import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import "../styles/register.scss";

const Register = () => {
  const {handleRegister} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister({
      fullname: formData.fullName,
      contact:formData.contactNumber,
      email:formData.email,
      password:formData.password,
      isSeller:formData.isSeller

    })

    // if(success){
      
    // }
navigate("/");
   

    
  };

  return (
    <main className="register-page">
      {/* IMAGE SIDE */}
      <section className="register-visual">
        <img
          src="https://i.pinimg.com/564x/22/16/cb/2216cb697b01fab003ee047eab4baba6.jpg"
          alt="Fashion editorial"
        />

        <div className="register-visual__overlay" />

        <div className="register-visual__top">
          <span>SNITCH.</span>
        </div>

        <div className="register-visual__bottom">
          <p className="eyebrow">THE NEW STANDARD</p>

          <h2>
            Define your
            <br />
            <em>aesthetic.</em>
          </h2>

          <p className="description">
            Join a new generation of creators, individuals and brands
            shaping modern fashion.
          </p>
        </div>
      </section>

      {/* FORM SIDE */}
      <section className="register-form">
        <div className="register-form__inner">
          <div className="mobile-brand">SNITCH.</div>

          <div className="register-form__heading">
            <span>WELCOME TO SNITCH</span>
            <h1>
              Elevate
              <br />
              Your Style
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contactNumber">Contact Number</label>

              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <label className="seller-option">
              <input
                type="checkbox"
                name="isSeller"
                checked={formData.isSeller}
                onChange={handleChange}
              />

              <span className="custom-checkbox">
                <span>✓</span>
              </span>

              <span>Register as Seller</span>
            </label>

            <button type="submit" className="signup-btn">
              <span>Sign Up</span>
              <span className="arrow">↗</span>
            </button>

            <div className="or-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            {/* <ContinueWithGoogle /> */}
             <a href="/api/auth/google">continue with google</a>

            <p className="login-link">
              Already have an account?
              <a href="/login"> Sign in</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;