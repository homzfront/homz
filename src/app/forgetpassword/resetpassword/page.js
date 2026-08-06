import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const ResetPasswordClient = dynamic(
  () => import("@/app/forgetpassword/resetpassword/ResetPasswordClient"),
  { ssr: false }
);

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
};

export default ResetPasswordPage;
