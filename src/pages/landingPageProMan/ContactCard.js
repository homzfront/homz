"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {
  const users = [
    {
      id: 1,
      name: "Sylvester Chukwuka",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181070/public/images/ManWithCup_tg0v5m.jpg",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Sylvester Chukwuka",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181064/public/images/ManOnCall_fatkxv.jpg",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Sylvester Chukwuka",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181061/public/images/ManLeanOnCar_vosqdg.jpg",
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
