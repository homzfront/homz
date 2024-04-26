"use client"
import useProfileStore from "@/store/profile";
import { useRouter, usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function withAuth(Component) {
    return function withAuth(props) {
        const { isLoggedIn } = useProfileStore();
        const [loading, setLoading] = useState(true);
        const route = useRouter();
        const path = usePathname();
        console.log(isLoggedIn)
        console.log(path);
        useLayoutEffect(() => {
            const checkAuth = async () => {
                if (!isLoggedIn) {
                    route.push("/")
                } else {
                    if (path === "/login" || path === "/register") {
                        route.push("/") // Redirect to homepage if trying to access /login or /register while logged in
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

    }
}