// components/ReCaptcha.js
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import "dotenv/config";

const ReCaptcha = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA ? process.env.NEXT_PUBLIC_CAPTCHA : null}
      onChange={onChange}
    />
  );
};

export default ReCaptcha;
