import { images } from "@/assets/assets";


export const projectsData = [
  {
    img: images.client5,
    title: "The COOPETTO",
    tag: "Client #1",
    description:
      "As Uber works through a huge amount of internal management turmoil.",
    route: "/dashboard/profile",
    members: [
      {img: images.lead1, name: "Romina Hadid" },
      { img: images.lead2, name: "Ryan Tompson" },
      { img: images.lead3, name: "Jessica Doe" },
      { img: images.lead5, name: "Alexander Smith" },
    ],
  },
  {
    img: images.client1,
    title: "Chiro Launch",
    tag: "Client #2",
    description:
      "Music is something that every person has his or her own specific opinion about.",
    route: "/dashboard/profile",
    members: [
      { img: images.lead6, name: "Alexander Smith" },
      { img: images.lead7, name: "Jessica Doe" },
      {img: images.lead8, name: "Ryan Tompson" },
      { img: images.lead4, name: "Romina Hadid" },
    ],
  },
  {
    img: images.client3,
    title: "Harris",
    tag: "Client #3",
    description:
      "Different people have different taste, and various types of music.",
    route: "/dashboard/profile",
    members: [
      { img: images.lead1, name: "Romina Hadid" },
      {img: images.lead2, name: "Ryan Tompson" },
      { img: images.lead5, name: "Jessica Doe" },
      { img: images.lead4, name: "Alexander Smith" },
    ],
  },
  {
    img: images.client4,
    title: "Vision AI",
    tag: "Client #4",
    description:
      "Why would anyone pick blue over pink? Pink is obviously a better color.",
    route: "/dashboard/profile",
    members: [
      { img: images.lead3, name: "Alexander Smith" },
      { img: images.lead6, name: "Jessica Doe" },
      { img: images.lead8, name: "Ryan Tompson" },
      { img: images.lead7, name: "Romina Hadid" },
    ],
  },
];

export default projectsData;
