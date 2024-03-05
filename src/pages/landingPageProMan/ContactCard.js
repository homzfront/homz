"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {
  const users = [
    {
      id: 1,
      name: "John Daniels",
      image: "/static/images/papaDrinking.png",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "John Daniels",
      image: "/static/images/papaDrinking.png",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "John Daniels",
      image: "/static/images/papaDrinking.png",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
  ];
  const [ user, setUser] = useState(users || [])
  return (
    <div>
      <SliderComponent users={user} />
    </div>
  );
};

export default ContactCard;
