export function checkPlanLimits(
    data,
    planName,
    currentEstates,
    currentUsers, 
    currentTenant
) {
    const resolvedPlanName = planName === "Enterprise Trial" ? "Enterprise Free" : planName;

    // Find the plan by its name
    const plan = data?.find(plan => plan.plan_name === resolvedPlanName );

    if (!plan) {
        return
    }

    // Parse maxEstates and maxUsers (handle "unlimited" by setting it to Infinity)
    const maxEstatesLimit = plan.maxEstates === "unlimited" ? Infinity : parseInt(plan.maxEstates, 10);
    const maxUsersLimit = plan.maxUsers === "unlimited" ? Infinity : parseInt(plan.maxUsers, 10);
    const maxTenantLimit = parseInt(plan.maxTenants)
    // Compare the current values with the limits
    const reachedMaxEstates = currentEstates === maxEstatesLimit;
    const reachedMaxUsers = currentUsers === maxUsersLimit;
    const reachedMaxTenants = currentTenant === maxTenantLimit

    return { reachedMaxEstates, reachedMaxUsers, reachedMaxTenants };
}
