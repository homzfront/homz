import MarketerBuzinesPage from "../businessPage";
import { listingMarketerProfile } from "@/api/listingServices";


export async function generateMetadata({ params }) {
  try {
    const agent = await listingMarketerProfile(params.id);

    return {
      title: `${agent?.name || "Agent"} | Homz.ng`,

      description:
        `View properties listed by ${agent?.name || "this agent"} on Homz.ng`,

      openGraph: {
        title: `${agent?.name || "Agent"} | Homz.ng`,
        description:
          `View properties listed by ${agent?.name || "this agent"} on Homz.ng`,
      },

      twitter: {
        card: "summary_large_image",
        title: `${agent?.name || "Agent"} | Homz.ng`,
        description:
          `View properties listed by ${agent?.name || "this agent"} on Homz.ng`,
      },
    };

  } catch (error) {

    return {
      title: "Agent Profile | Homz.ng",

      description:
        "View real estate agents and properties on Homz.ng",

      openGraph: {
        title: "Agent Profile | Homz.ng",
        description:
          "View real estate agents and properties on Homz.ng",
      },

      twitter: {
        card: "summary_large_image",
        title: "Agent Profile | Homz.ng",
        description:
          "View real estate agents and properties on Homz.ng",
      },
    };

  }
}


const MarketerBusinessPage = ({ params }) => {

  return (
    <div>
      <MarketerBuzinesPage marketerId={params.id} />
    </div>
  );

};


export default MarketerBusinessPage;