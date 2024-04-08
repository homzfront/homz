"use client"
import SliderComponent from "/src/components/mainmenu/slider";
import { useState } from "react";

const ContactCard = () => {

  const users = [
    {
      id: 1,
      name: "Engr. Simon Peter",
      image: "/static/images/OwnerImagesOne.png",
      position: "Property Owner",
      content:
        "Entrusting our property to Homz.ng was the best decision we made.",
    },
    {
      id: 2,
      name: "Sunday Ojo",
      image: "/static/images/OwnerImagesTwo.png",
      position: "Property Owner",
      content:
        "It's a relief to have such a dependable partner managing our property—efficiency at its finest!",
    },
    {
      id: 3,
      name: "Victor Akpan",
      image: "/static/images/OwnerImagesThree.png",
      position: "Property Owner",
      content:
        "Selling our property became a stress-free journey with their seller-centric approach.",
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
