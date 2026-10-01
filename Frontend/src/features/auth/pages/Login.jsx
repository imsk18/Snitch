import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import "../styles/login.scss";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await handleLogin({
  //     email: formData.email,
  //     password: formData.password,
  //   });

    
  //     navigate("/");
    
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await handleLogin({
    email: formData.email,
    password: formData.password,
  });

  console.log("success:", success);

  if (success) {
    navigate("/");
  }
};
  return (
    <main className="login-page">
      {/* IMAGE SIDE */}
      <section className="login-visual">
        <img
          src="https://i.pinimg.com/564x/22/16/cb/2216cb697b01fab003ee047eab4baba6.jpg"
          alt="Fashion editorial"
        />

        <div className="login-visual__overlay" />

        <div className="login-visual__top">
          <span>SNITCH.</span>
        </div>

        <div className="login-visual__bottom">
          <p className="eyebrow">THE NEW STANDARD</p>

          <h2>
            Define your
            <br />
            <em>aesthetic.</em>
          </h2>

          <p className="description">
            Discover contemporary fashion designed for
            individuals who create their own style.
          </p>
        </div>
      </section>

      {/* FORM SIDE */}
      <section className="login-form">
        <div className="login-form__inner">
          <div className="mobile-brand">SNITCH.</div>

          <div className="login-form__heading">
            <span>WELCOME BACK</span>

            <h1>
              Welcome
              <br />
              Back
            </h1>

            <p>
              Sign in to access your account, orders and
              personalized fashion experience.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div className="form-field">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <a href="/forgot-password">
                  Forgot password?
                </a>
              </div>

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

            {/* LOGIN BUTTON */}
            <button type="submit" className="login-btn">
              <span>Sign In</span>
              <span className="arrow">↗</span>
            </button>

            {/* DIVIDER */}
            <div className="or-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            {/* GOOGLE */}
            {/* <ContinueWithGoogle /> */}

            <a href="/api/auth/google">continue with google</a>

            {/* REGISTER */}
            <p className="register-link">
              Don't have an account?
              <a href="/register"> Create account</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;