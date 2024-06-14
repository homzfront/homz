"use client"
import SliderComponent from "@/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = ({routeTo, profile}) => {

  const users = [
    {
      id: 1,
      name: "Engr. Simon Peter",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181068/public/images/ManWithHeadphone_zlc3lb.jpg",
      position: "Landlord",
      content:
        "Entrusting our property to Homz.ng was the best decision we made.",
    },
    {
      id: 2,
      name: "Sunday Ojo",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181036/public/images/ManJeanJacket_yrzxko.jpg",
      position: "Landlord",
      content:
        "It's a relief to have such a dependable partner managing our property—efficiency at its finest!",
    },
    {
      id: 3,
      name: "Victor Akpan",
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181057/public/images/ManLegCrossed_ym0tqo.jpg",
      position: "Landlord",
      content:
        "Selling our property became a stress-free journey with their seller-centric approach.",
    },
  ];

  const [ user, setUser] = useState(users || [])
  return (
    <div>
        <SliderComponent users={user} routeTo={routeTo} profile={profile}/>
    </div>
  );
};

export default ContactCard;
