export type Founder = {
  name: string;
  role: string;
  username: string;
  description: string;
};

const founders: Founder[] = [
  {
    name: "Melvin Jones Repol",
    role: "Founder",
    username: "mrepol742",
    description:
      "A custom software engineer with more than a decade of experience, focused on removing barriers between people, projects, and useful outcomes.",
  },
  {
    name: "Samiun Nafis",
    role: "Co-Founder",
    username: "samiunnafis",
    description:
      "A full-stack developer and open-source advocate focused on creating spaces where developers can learn, contribute, and grow together.",
  },
];

export default founders;
