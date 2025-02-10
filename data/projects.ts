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
      "Tasked with modernizing the Association of Engineers Kerala’s digital presence, we redesigned their two-decade-old website and created a mobile application for real-time updates. With a focus on speed, accessibility, and intuitive design, members now have a seamless way to stay connected. The AOEK app will soon be available on Google Play and the App Store.",
    services: ["UI/UX Design", "Development (Web & App)"],
    website: "https://www.aoek.org",
    image: "/projects/aoek_thumbnail.webp",
  },
  {
    id: 2,
    client: "Cutlys",
    projectName: "Cutlys",
    description:
      "Cutlys, a renowned snack bar chain, needed a website that captured its legacy and brand presence. We delivered a sleek, high-performance site in record time, complete with cutting-edge SEO implementation—securing top rankings on Google from the moment it launched.",
    services: ["UI/UX Design", "Web Development"],
    website: "https://cutlys.com",
    image: "/projects/cutlys_thumbnail.webp",
  },
  {
    id: 3,
    client: "Dr. Arun Kumar Vidhyadharan",
    projectName: "Ilili Dental Spa",
    description:
      "We transformed Ilili Dental Spa’s website for Dr. Arun by making sleek and intuitive. Prioritizing an easy user experience, the site offers effortless access to their specialties, team, and contact details. All within a bright, visually appealing interface.",
    services: ["UI/UX Design", "Web Development"],
    website: "https://ililidentalspa.com",
    image: "/projects/ilili_thumbnail.webp",
  },
  {
    id: 4,
    client: "Sarath Menon",
    projectName: "Sarath Menon Films",
    description:
      "We developed a tailored portfolio for Sarath Menon, a filmmaker and artist whose creative work spans film, poetry, and photography. Designed with an ultra-minimalist approach, the interface ensures nothing stands between his audience and his art. Only his creative works and contact details remain in focus.",
    services: ["UI/UX Design", "Web Development"],
    website: "https://sarathmenonfilms.com",
    image: "/projects/sarath_thumbnail.webp",
  },
];
