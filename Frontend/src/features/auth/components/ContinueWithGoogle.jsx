import React from "react";
import "../styles/continueWithGoogle.scss";

const ContinueWithGoogle = () => {
  return (
    <a
      href="/api/auth/google"
      className="google-btn"
      aria-label="Continue with Google"
    >
      <span className="google-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
          />
          <path
            fill="#34A853"
            d="M12 21.98c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.98z"
          />
          <path
            fill="#FBBC05"
            d="M6.54 14.07A5.86 5.86 0 0 1 6.23 12c0-.72.12-1.42.31-2.07V7.4H3.29A9.99 9.99 0 0 0 2.23 12c0 1.61.39 3.13 1.06 4.6l3.25-2.53z"
          />
          <path
            fill="#EA4335"
            d="M12 5.9c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 2.98 14.63 2.02 12 2.02a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.62 9.46 5.9 12 5.9z"
          />
        </svg>
      </span>

      <span className="google-text">Continue with Google</span>
    </a>
  );
};

export default ContinueWithGoogle;