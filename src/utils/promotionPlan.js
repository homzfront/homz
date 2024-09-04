import PromotionHooks from "@/utils/promoteProperty";

async function handleSelectPlan(
  index,
  planType,
  interval,
  setLoadingStates,
  amount,
  upgradePlan,
  setModalIsOpen,
  setSuccessModalIsOpen,
  router,
  startTransition
) {
  setLoadingStates((prev) => ({ ...prev, [index]: true }));
  
  try {
    const results = await PromotionHooks.createSubscription(planType, interval, amount, upgradePlan);
    // console.log(results);
    if (results.status === true) {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      let url = results?.data?.authorization_url;
      
      startTransition(() => {
        router.push(url);
      });
    } else {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }
  } catch (error) {
    console.error("Error selecting plan:", error);
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  }
}

export default { handleSelectPlan };
