"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {
  const users = [
    {
      id: 1,
      name: "Gbenga Peters",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181041/public/images/ManFoldingHands_gcl4ox.jpg",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Stephanie Collins",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181021/public/images/FineBlackLady_orq5i0.jpg",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Blessing George",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181076/public/images/orangeLady_b8srks.jpg",
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
