// Helper function to determine user dashboard based on roles and accounts
export default function determineUserDashboard(profileData) {
  if (profileData?.user?.isVerified && profileData?.user?.accounts.length === 0) {
    return "/select-plan"; // Redirect to select plan for verified users with no accounts
  } else if (profileData?.user?.accounts?.[0].name === "TENANT") {
    return "/dashboard/tenant/dashboard";
  } else if (profileData?.user?.accounts?.[0].name === "ENTERPRISE_PLAN") {
    return "/dashboard/enterprise-property/dashboard";
  } else if (profileData?.user?.accounts?.[0].name === "MANAGE_PROPERTY") {
    return "/dashboard/property-owner/dashboard";
  } else if (profileData?.user?.accounts?.[0].name === "LIST_PROPERTY") {
    return "/dashboard/list_Property";
  } else {
    return null; // No specific dashboard identified
  }
}