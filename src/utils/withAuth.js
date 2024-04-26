import useProfileStore from "@/store/profile";
import { useRouter, usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function WithAuth(Component) {
  return function WithAuth(props) {
    const { isLoggedIn } = useProfileStore();
    const [loading, setLoading] = useState(true);
    const route = useRouter();
    const path = usePathname();

    useLayoutEffect(() => {
      const checkAuth = async () => {
        if (!isLoggedIn) {
          if (path !== "/login" && path !== "/register") {
            route.push("/login"); // Redirect to login page if not logged in and trying to access a protected page
          }
        } else {
          if (path === "/login" || path === "/register") {
            route.push("/"); // Redirect to homepage if logged in and trying to access /login or /register
          }
        }
        setLoading(false);
      };
      checkAuth();
    }, []);

    if (loading) {
      return <div />; // Return an empty div until the authentication check is complete
    } else {
      return <Component {...props} />;
    }
  };
}