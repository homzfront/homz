import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const ForgotPasswordClient = dynamic(
  () => import("@/app/forgetpassword/ForgotPasswordClient"),
  { ssr: false }
);

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordClient />
    </Suspense>
  );
};

export default ForgotPasswordPage;
