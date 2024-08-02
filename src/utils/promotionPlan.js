import promoteProperty from "@/utils/promoteProperty";

export default async function handleSelectPlan(
  date,
  index,
  propertyId,
  planType,
  propertyIds,
  setLoadingStates,
  setModalIsOpen,
  setSuccessModalIsOpen
) {


  setLoadingStates((prev) => ({ ...prev, [index]: true }));
  try {
    const results = await promoteProperty(
      date,
      propertyId,
      planType,
      propertyIds
    );
    // console.log(results);
    if (results.status === false) {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      setModalIsOpen(true);
    } else if (results.status === true) {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      setSuccessModalIsOpen(true);
    } else {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
      return;
    }
  } catch (error) {
    console.error("Error selecting plan:", error);
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  }
}
