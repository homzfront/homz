import { useLayoutEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth/authStore';
import { useRouter, usePathname } from 'next/navigation';
import keepTwo from '@/utils/keepTwo';

const withAuth = (WrappedComponent) => {
    const WithAuthComponent = (props) => {
        const [compon, setCompon] = useState(false);
        const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
        const user = useAuthStore((state) => state.user);
        useLayoutEffect(() => {
            const loadData = async () => {
                await fetchUserProfile();
                setCompon(!compon);
            };
            loadData();
        }, [fetchUserProfile]);
        const [loading, setLoading] = useState(true);
        const route = useRouter();
        const path = usePathname();
        const pathnameII = keepTwo(path);
        useLayoutEffect(() => {
            const checkAuth = async () => {
                const userAccounts = user?.accounts.map((account) => account.name);
                if (user) {
                    if (path === '/login' || path === '/register') {
                        route.push('/');
                    } else if (!userAccounts.includes('TENANT') && pathnameII === '/dashboard/tenant') {
                        route.push('/');
                    } else if (!userAccounts.includes('ENTERPRISE_PLAN') && pathnameII === '/dashboard/enterprise-property') {
                        route.push('/');
                    } else if (!userAccounts.includes('MANAGE_PROPERTY') && pathnameII === '/dashboard/property-owner') {
                        route.push('/');
                    } else if (!userAccounts.includes('LIST_PROPERTY') && pathnameII === '/dashboard/list_property') {
                        route.push('/');
                    }
                }
                if (user === null && compon) {
                    if (path !== '/login' && path !== '/register') {
                        route.push('/login');
                    }
                }
                setLoading(false);
            };
            checkAuth();
        }, [user, compon]);
        if (loading) {
            return <div />;
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    // Adding displayName to the component
    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};

export default withAuth;
