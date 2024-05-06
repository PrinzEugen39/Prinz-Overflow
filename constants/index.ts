import { ISidebarLink, IThemes } from "@/types";

export const themes: IThemes[] = [
  {
    value: "light",
    label: "Light",
    icons: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "Dark",
    icons: "/assets/icons/moon.svg",
  },
  {
    value: "system",
    label: "System",
    icons: "/assets/icons/computer.svg",
  },
];

export const sidebarLinks: ISidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  // {
  //   imgURL: "/assets/icons/suitcase.svg",
  //   route: "/jobs",
  //   label: "Find Jobs",
  // },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];
