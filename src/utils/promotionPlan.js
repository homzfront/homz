import PromotionHooks from "@/utils/promoteProperty";
// import { useRouter } from "next/navigation";

async function handleSelectPlan(
  index,
  planType,
  interval,
  setLoadingStates,
  amount,
  setModalIsOpen,
  setSuccessModalIsOpen,
  router,startTransition
) {

// const router= useRouter();
  setLoadingStates((prev) => ({ ...prev, [index]: true }));
  try {
    // const results = await PromotionHooks.promoteProperty(
    //   date,
    //   propertyId,
    //   planType,
    //   propertyIds
    // );
    const results= await PromotionHooks.createSubscription(planType,interval,amount )

    // console.log(results);
    if (results.status === false) {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      // setModalIsOpen(true);
    } else if (results.status === true) {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      let url=results.data.authorization_url
         startTransition(() => {
          router.push(url)
        });
      // setSuccessModalIsOpen(true);
    } else {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      return;
    }
  } catch (error) {
    console.error("Error selecting plan:", error);
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  }
}


export default {handleSelectPlan}