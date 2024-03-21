"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {
  const users = [
    {
      id: 1,
      name: "Gbenga Peters",
      image: "/ManFoldingHands.jpg",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Stephanie Collins",
      image: "/FineBlackLady.jpg",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Blessing George",
      image: "/orangeLady.jpg",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
  ];

  const [ user, setUser] = useState(users || [])

  return (
      <div>
        <SliderComponent users={user}/>
      </div>
  );
};

export default ContactCard;
