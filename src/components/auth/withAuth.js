import { useLayoutEffect, useState, useCallback, } from 'react';
import useAuthStore from '@/store/useAuth/authStore';
import { useRouter, usePathname } from 'next/navigation';
import keepTwo from '@/utils/keepTwo';
import useOpenDueDate from '@/store/enterpriseStore/useOpenDueDate';

const withAuth = (WrappedComponent) => {
    const WithAuthComponent = (props) => {
        const { setTab } = useOpenDueDate();
        let dueDate = null
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            dueDate = params.get('dueDate');
        }
        useLayoutEffect(() => {
            if (dueDate) {
                setTab("dueDate")
            }
        }, [dueDate]);

        const [loading, setLoading] = useState(true);
        const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
        const user = useAuthStore((state) => state.user);
        const route = useRouter();
        const path = usePathname();
        const pathnameII = keepTwo(path);

        const loadData = useCallback(async () => {
            await fetchUserProfile();
            setLoading(false);
        }, [fetchUserProfile]);

        useLayoutEffect(() => {
            loadData();
        }, [loadData]);

        useLayoutEffect(() => {
            const checkAuth = async () => {
                if (loading) return;

                const userAccounts = user?.accounts.map((account) => account.name) || [];

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
                } else if (user === null && !['/login', '/register'].includes(path)) {
                    route.push('/login');
                }
            };
            checkAuth();
        }, [user, loading, path, pathnameII, route]);

        if (loading) {
            return <div />;
        } else {
            return (
                <WrappedComponent {...props} />
            );
        }
    };

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};

export default withAuth;
