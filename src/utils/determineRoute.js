function determineRoute(profile, data) {
  let user;
  if (profile?.isVerified === false) {
    return "/switch-profile"
  }
  if (typeof profile === "string") {
    // If the input is a string, assume it's an email
    user = { email: profile }; // Assuming email is stored in profile object
  } else if (profile && profile.isVerified) {
    user = profile;
  } else if (profile?.user && profile?.user.isVerified) {
    user = profile.user;
  }

  if (user?.isVerified && user?.accounts.length === 0) {
    return ["/select-plan"]; // Redirect to select plan for verified users with no accounts
  }
  
  let routes = [];
  if (!user) {
    return "/register"
  }
  // Iterate through user accounts
  for (let account of user?.accounts) {
    if (account?.name === "TENANT") {
      routes.push("/dashboard/tenant/dashboard");
    } else if (account?.name === "ENTERPRISE_PLAN") {
      routes.push("/dashboard/enterprise-property/dashboard");
    } else if (account?.name === "MANAGE_PROPERTY") {
      routes.push("/dashboard/property-owner/dashboard");
    }
  }

  if (routes.length === 0) {
    routes.push('/'); // No specific dashboard identified
  }

  // Check if any route in "page" matches "data"
  if (routes.some(route => route === data)) {
    return data; // Return matched route from "page"
  }

  return "/switch-profile"; // No match found, return switch-profile route
}

export default determineRoute;
