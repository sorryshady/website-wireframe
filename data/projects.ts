export type Project = {
  id: number;
  client: string;
  projectName: string;
  description: string;
  services: string[];
  website: string;
  image: string;
};
export const projects: Project[] = [
  {
    id: 1,
    client: "Association of Engineers, Kerala",
    projectName: "AOEK",
    description:
      "This project for the Association of Engineers Kerala was to redesign their website which has a legacy spanning over 2 decades, and to develop a user-friendly mobile application that keeps them up to date with the news and events within the association. Through intuitive design and seamless functionality, the users can now access a faster and more optimised website with no hassle.",
    services: ["UI/UX Design", "Development (Web & App)"],
    website: "https://www.aoek.org",
    image: "/projects/aoek_thumbnail.png",
  },
  {
    id: 2,
    client: "Cutlys",
    projectName: "Cutlys",
    description:
      "Cutlys, a familiar name in the heart of Thrissur, wanted us to design a landing page and create a website for their chain of snack bars. Our fastest project yet, we created a website which conveys their heritage and brand identity. Oh, and all of this was done in just a couple of days, with a remarkable SEO implemented along with the website.",
    services: ["UI/UX Design", "Web Development"],
    website: "https://cutlys.com",
    image: "/projects/aoek_thumbnail.png",
  },
  {
    id: 3,
    client: "Dr. Arun Kumar Vidhyadharan",
    projectName: "Ilili Dental Spa",
    description:
      "Ilili Dental Spa, the multi speciality dental clinic in Trivandrum, has been around for more than a decade. They required a website where they showed their specialties, team, and contact info. We made a simple website with clean and intuitive UI, along with a bright theme to resemble your teeth after you pay them a visit. This project took us less than a week.",
    services: ["UI/UX Design", "Web Development"],
    website: "https://ililidentalspa.com",
    image: "/projects/aoek_thumbnail.png",
  },
  {
    id: 4,
    client: "Sarath Menon",
    projectName: "Sarath Menon Films",
    description:
      "We had the opportunity to work with the talented artist and filmmaker Sarath Menon, who needed a portfolio to showcase his artworks, filmography, and the rest of his creative endeavours. We designed the website in a way where you won't encounter anything in the UI except his craft (and his contact info, of course).",
    services: ["UI/UX Design", "Web Development"],
    website: "https://sarathmenonfilms.com",
    image: "/projects/aoek_thumbnail.png",
  },
];
