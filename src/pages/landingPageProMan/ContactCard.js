"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {
  const users = [
    {
      id: 1,
      name: "Sylvester Chukwuka",
      image: "/ManWithCup.jpg",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Sylvester Chukwuka",
      image: "/ManOnCall.jpg",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Sylvester Chukwuka",
      image: "/ManLeanOnCar.jpg",
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
