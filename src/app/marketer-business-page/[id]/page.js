import React from "react";
import MarketerBuzinesPage from "../businessPage";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MarketerBusinessPage = ({ params }) => {
  let id = params.id;
  return (
    <div className="">
      <MarketerBuzinesPage marketerId={id} />
    </div>
  );
};

export default MarketerBusinessPage;
