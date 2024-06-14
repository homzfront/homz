// components/ReCaptcha.js
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import "dotenv/config";

const ReCaptcha = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA ? process.env.NEXT_PUBLIC_CAPTCHA : "6Lc9s-opAAAAAEZpd9dnyHr2PwqnMarBED6YDyeN"}
      onChange={onChange}
    />
  );
};

export default ReCaptcha;
