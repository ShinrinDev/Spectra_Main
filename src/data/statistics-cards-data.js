import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Today's Money",
    value: "R53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "This Months leads",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last year",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Profit",
    value: "R103,430",
    footer: {
      color: "text-green-500",
      value: "+15%",
      label: "than last month",
    },
  },
];

export default statisticsCardsData;
