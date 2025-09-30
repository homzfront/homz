
"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import useBodyScroll from "@/utils/useBodyScroll";
import SliderAuth from "@/components/auth/slider";
import determineUserDashboard from "@/utils/determineUserDashboard";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";
import useTabForDocuGen from "@/store/document/useTabForDocuGen";
import useOpenDueDate from "@/store/enterpriseStore/useOpenDueDate";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import useReferalReturnPage from "@/store/enterpriseStore/useReferalReturnPage";
import ListingAuth from "@/components/auth/listingAuth";

const ListingLogin = () => {
  const { data: session, status } = useSession();
  const { homePage } = useTabForDocuGen();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(true);
  const [fromGoogle, setFromGoogle] = useState(false);
  const router = useRouter();
  const { tab } = useOpenDueDate();
  const { referalReturnPage } = useReferalReturnPage()
  console.log(referalReturnPage)
  // console.log("Session", session);
  useBodyScroll([loading]);

  const handleGoogleSignIn = () => {
    setFromGoogle(true);
    localStorage.setItem("fromGoogle", "true");
    signIn("google", { callbackUrl: "/login" });
  };

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!password || !email) {
      setLoginError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 201) {
        const data = response.data.data.token;
        localStorage.setItem("jwt", data);

        const profileResponse = await api.get("/user/profile");
        if (profileResponse?.data?.user?.isVerified === true) {
          if (
            profileResponse.status === 200 ||
            profileResponse.status === 201
          ) {
            const profileData = profileResponse.data;

            // Navigation logic based on user roles and account status
            const navigateTo = determineUserDashboard(profileData);
            if (homePage) {
              router.push("/dashboard/enterprise-property/documentGeneration");
            } else if (referalReturnPage) {
              router.push("/plans");
            } else if (tab === "dueDate") {
              router.push(
                "/dashboard/enterprise-property/tenants?dueDate=true"
              );
            } else if (!homePage && navigateTo) {
              router.push(navigateTo);
            } else {
              router.push("/");
            }

            useProfileStore.setState({
              user: data,
              profile: profileData,
              isLoggedIn: true,
              loading: false,
            });

            setTimeout(() => {
              setEmail("");
              setPassword("");
              setLoading(false);
            }, 5000); // 5 seconds
          } else {
            setLoginError(profileResponse.data.message);
          }
        } else {
          router.push(`/verify-email`);
          if (typeof window !== "undefined") {
            localStorage.setItem("email", response?.data?.data?.email);
          }
        }
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      setLoginError(error.response?.data?.message);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowLongLoadingMessage(false);
  };

  const Visible = () => {
    setVisible(!visible);
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/google",
        {
          idToken,
        }
      );

      // Optionally store token or user data
      console.log("User data from backend:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // console.log("Session data:", session);
  // console.log("Session status:", status);

  // console.log("fromGoogle state:", fromGoogle);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFromGoogle(localStorage.getItem("fromGoogle") === "true");
    }
  }, []);
  useEffect(() => {
    const verifySession = async () => {
      if (status === "authenticated" && session && fromGoogle === true) {
        try {
          setLoading(true);

          // Prepare the payload exactly as required by your backend
          const verificationPayload = {
            user: {
              name: session.user?.name,
              email: session.user?.email,
              image: session.user?.image,
            },
            accessToken: session.accessToken,
            idToken: session.idToken,
            expires: session.expires,
          };

          // console.log("Verification payload:", verificationPayload);

          // 1. First verify with Google token
          const verificationResponse = await api.post(
            "/auth/google/verification",
            verificationPayload
          );
          // console.log("Verification response:", verificationResponse);

          if (verificationResponse?.data?.data?.isVerified) {
            // Store JWT token from verification response
            const token = verificationResponse?.data?.data.token;
            localStorage.setItem("jwt", token);

            // 2. Then fetch user profile
            const profileResponse = await api.get("/user/profile");
            // console.log("Profile response:", profileResponse);

            if (profileResponse.data?.user) {
              const profileData = profileResponse.data;

              // Update Zustand store
              useProfileStore.setState({
                user: token, // Using the token from verification
                profile: profileData.user,
                isLoggedIn: true,
                loading: false,
              });
              // Navigation logic based on user roles and account status
              const navigateTo = determineUserDashboard(profileData);
              router.push(navigateTo ?? "/");
            }
          }
        } catch (error) {
          // console.log(error?.response?.data?.message);

          const errors = error?.response?.data?.error?.errors;
          const message = error?.response?.data?.message;

          if (errors) {
            // console.log(errors);
            // Show each error as a toast (or combine them into one string)
            const combinedMessage = Object.values(errors).join(", ");
            toast.error(combinedMessage);
          } else if (message) {
            // console.log(message);
            toast.error(message);
            if (
              message.toLowerCase().includes("This email is already registered")
            ) {
              signOut({ callbackUrl: "/login" });
            }
          } else {
            console.log("An unexpected error occurred:", error);
            toast.error("An unexpected error occurred");
          }
        } finally {
          setLoading(false);
          setFromGoogle(false);
          localStorage.removeItem("fromGoogle");
        }
      }
    };

    verifySession();
  }, [session, status, router, setLoading, fromGoogle]);
  
  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>

      <div className="flex flex-col lg:flex-row m-auto max-w-full sm:max-w-[1440px] h-auto max-h-[1024px]">
        {/* Mobile/tablet auth section - shows at top */}
        <div className="lg:hidden w-full">
          <ListingAuth />
        </div>
        
        {/* Desktop auth section */}
        <div className="w-[50%] hidden lg:flex flex-coljustify-around h-screen max-h-screen">
          <ListingAuth />
        </div>
        
        <div className="lg:w-[50%] px-6 flex items-center justify-center lg:min-h-screen">
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col justify-center gap-6 w-full max-w-[360px] my-5 lg:my-0">
              <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                Welcome Back
              </h1>
              <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                Welcome back, please enter your details.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div
                  className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""
                    }`}
                >
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email <span className="text-error">*</span>
                    </label>
                    <input
                      className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setLoginError("");
                      }}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  <div className="relative flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Password <span className="text-error">*</span>
                    </label>
                    <input
                      className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError("");
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <div className="absolute top-11 right-4" onClick={Visible}>
                      {visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <BashedEye className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  {loginError && (
                    <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                      {loginError}
                    </span>
                  )}
                  <Link
                    href={"/forgetpassword"}
                    className="font-[700] text-BlueHomz text-[13px]"
                  >
                    Forgot Password
                  </Link>
                </div>
                <button
                  className={`bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz ${loading
                    ? "pointer-events-none w-full flex justify-center"
                    : ""
                    } `}
                  type="Submit"
                >
                  {loading && !fromGoogle ? <LoadingFormII /> : "Log In"}
                </button>
              </form>
              <div className="mt-[-10px]">
                {/* <button onClick={() => handleGoogleSignIn()} className={`border flex justify-center items-center gap-3 font-[700] text-[16px] text-BlueHomz w-full sm:w-[360px] border-BlueHomz hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz ${loading ? "pointer-events-none w-full flex justify-center" : ""}`}>
                    <Image
                      className=""
                      src={"/Social icon.png"}
                      alt="google"
                      height={"20"}
                      width={"20"}
                      />
                    {loading && fromGoogle ? <LoadingFormII className="#006aff" /> : "Login In with google"}
                    </button> */}
                <p className="text-center font-[400] text-[14px]">
                  Don’t have an account?
                  <Link
                    className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                    href={"/listing-signup"}
                  >
                    Create Account
                  </Link>
                </p>
              </div>
              {/* <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingLogin;