import { type NextPage } from "next";

import TeamCard from "~/components/general/about/teamCard";

const Team: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-y-8 bg-transparent pb-10 pt-32">
      <div className="px-4">
        <h1
          className={`text-center font-life-craft text-5xl text-white lg:text-6xl`}
        >
          Incridea&apos;s Technical Team
        </h1>
        <p className="mt-5 text-center text-2xl font-bold text-white lg:text-3xl">
          Meet the developers
        </p>
      </div>
      <div className="mx-auto flex max-w-[80rem] flex-wrap justify-center gap-10 px-2">
        {teamMembers.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            linkedin={member.linkedin}
            instagram={member.instagram}
            github={member.github}
            quote={member.quote}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

const teamMembers: {
  name: string;
  role: string;
  instagram: string;
  github: string;
  linkedin: string;
  image: string;
  quote: string;
}[] = [
  {
    name: "Satwik Prabhu",
    role: "Team Lead | Full Stack",
    instagram: "https://www.instagram.com/satwikprabhu",
    github: "https://github.com/satwikrprabhu",
    linkedin: "https://www.linkedin.com/in/satwik_prabhu",
    image: "/2025/team/satwik_prabhu.webp",
    quote: "I know where you live!",
  },
  {
    name: "A Omkar G Prabhu",
    role: "Co-Head | Full Stack",
    instagram: "-",
    github: "https://github.com/Prabhuomkar9",
    linkedin: "https://www.linkedin.com/in/prabhuomkar9/",
    image: "/2025/team/omkar.webp",
    quote: "Control yourself, Not others! Tbh atp idc",
  },
  {
    name: "Keerthan K",
    role: "Full Stack",
    instagram: "https://www.instagram.com/keetha_k11",
    github: "https://github.com/keetha1011",
    linkedin: "https://www.linkedin.com/in/kkeerthan/",
    image: "/2025/team/keerthan_k.webp",
    quote: "passion && :) >>>",
  },
  {
    name: "Aryan Singh",
    role: "Frontend",
    instagram: "https://www.instagram.com/just_aryansingh",
    github: "https://github.com/Wizhill05",
    linkedin: "https://www.linkedin.com/in/justaryansingh",
    quote: "but Attendance <<<",
    image: "/2025/team/aryan_singh.webp",
  },
  {
    name: "Samarth H Shetty",
    role: "Full Stack",
    instagram: "https://www.instagram.com/sammonster1920/",
    github: "https://github.com/Sammonster495",
    linkedin: "https://www.linkedin.com/in/samarth-shetty-a53018247/",
    image: "/2025/team/samarth.webp",
    quote: "Coding and dancing my way through life",
  },
  {
    name: "Pratham A Kadekar",
    role: "Full Stack",
    instagram: "https://www.instagram.com/pratham_ak2004?igsh=dHh5NWJleTUzZnM2",
    github: "https://github.com/pratham-ak2004",
    linkedin:
      "https://www.linkedin.com/in/pratham-a-kadekar-8397a7249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: "/2025/team/pratham_a_kadekar.webp",
    quote: "Kon'nichiwa",
  },
  {
    name: "Karthik Salian",
    role: "Frontend",
    github: "https://github.com/Karthik-S-Salian",
    instagram: "https://www.instagram.com/karthik_s_.salian/",
    linkedin: "https://www.linkedin.com/in/karthik-salian-3a7a26246/",
    image: "/2025/team/karthik.webp",
    quote: "Once take a deep breath and say NO",
  },
  {
    name: "Nandan R Pai",
    role: "Full Stack",
    instagram: "https://www.instagram.com/nandanpi__/",
    github: "https://github.com/nandanpi",
    linkedin: "https://www.linkedin.com/in/nandanpai09",
    image: "/2025/team/nandan.webp",
    quote: "My touch is the solution to all problems 🥰",
  },
  {
    name: "Rahul N Bangera",
    role: "Full Stack",
    instagram: "https://www.instagram.com/rahul_n_bangera",
    github: "https://github.com/Bnir",
    linkedin: "https://www.linkedin.com/in/rahul-n-bangera",
    image: "/2025/team/rahul.webp",
    quote: "Give 200% or Give nothing",
  },
  {
    name: "Shishir G Karkera",
    role: "Media Co-Head | Capture Incridea Head",
    instagram: "https://www.instagram.com/shishir.karkeraa",
    github: "https://github.com/shishirkarkeraa",
    linkedin: "https://www.linkedin.com/in/shishir-girish-karkera-a61542262/",
    image: "/2025/team/shishir.webp",
    quote: "Never gonna let you down!",
  },
  {
    name: "Athul D Bhandary",
    role: "Full Stack",
    instagram: "https://www.instagram.com/athul_bhandary?igsh=cWs0cTVldzAwdXg1",
    github: "https://github.com/athul28",
    linkedin: "https://www.linkedin.com/in/athul-d-bhandary-0b1912247/",
    image: "/2025/team/athul_ d_bhandary.webp",
    quote: "Hey wassup!!!",
  },
  {
    name: "Varshith Pawar H R",
    role: "Frontend",
    instagram: "https://www.instagram.com/mr.pawar_10/",
    github: "https://github.com/VarshithPawarHR",
    linkedin: "www.linkedin.com/in/varshithpawarhr",
    image: "/2025/team/varshith.webp",
    quote:
      "No bugs here—just your system struggling to keep up with our brilliance",
  },
  {
    name: "Snehal Shetty",
    role: "Full Stack",
    instagram: "https://www.instagram.com/shettysnehal__05",
    github: "https://github.com/shettysnehal",
    linkedin: "https://www.linkedin.com/in/snehalshetty105",
    image: "/2025/team/snehal_shetty.webp",
    quote: "Life so cooked that my luck is on airplane mode",
  },
  {
    name: "Karthik P K",
    role: "Backend",
    instagram: "https://www.instagram.com/_karthik_p_k/",
    github: "https://github.com/karthikpk-o",
    linkedin: "https://linkedin.com/in/karthik-p-k",
    image: "/2025/team/karthik_p_k.webp",
    quote: "The trouble is, you think you have time.",
  },
  {
    role: "Full Stack",
    name: "Ishan Shetty",
    github: "https://github.com/Ishan-Shetty",
    linkedin: "https://www.linkedin.com/in/ishan-shetty-0a889821a/",
    instagram: "https://www.instagram.com/ishanshetty_",
    image: "/2025/team/ishan.webp",
    quote: "I'm just a chill guy 👾",
  },
  {
    name: "Ashton Prince Mathias",
    role: "Frontend",
    instagram: "https://www.instagram.com/_ashtonmathias_/",
    github: "https://github.com/Subtilizer28",
    linkedin: "https://www.linkedin.com/in/ashtonmths/",
    image: "/2025/team/ashton_mathias.webp",
    quote: '"your fone linging 📞"',
  },
  {
    name: "Riyaz Ahmed",
    role: "Frontend",
    instagram: "https://www.instagram.com/ria_yz24",
    github: "https://github.com/RiaAug24",
    linkedin: "https://www.linkedin.com/in/riyaz-ahmed24",
    image: "/2025/team/riyaz_ahmed.webp",
    quote: "Try to be the fitting piece, for a missing piece. 🧩",
  },
  {
    name: "Len Mendonca",
    role: "Frontend",
    instagram: "https://www.instagram.com/lendanieo/",
    github: "https://github.com/len-mendonca",
    linkedin: "https://in.linkedin.com/in/len-mendonca",
    image: "/2025/team/len_mendonca.webp",
    quote: "Maria Pitache",
  },
  {
    name: "Sathwik Nayak",
    role: "Frontend",
    instagram: "https://www.instagram.com/sathwik_hh",
    github: "https://github.com/002sathwik",
    linkedin: "https://www.linkedin.com/in/sathwik-h-085758246",
    image: "/2025/team/satwik_h.webp",
    quote: "Being part of a team is the greatest contribution I've made.",
  },
  {
    name: "Chaithra S Nayak",
    role: "Backend",
    instagram: "https://www.instagram.com/chaithrasnayak3/",
    github: "https://github.com/Chaithra-S-Nayak",
    linkedin: "https://www.linkedin.com/in/chaithra-s-nayak/",
    image: "/2025/team/chaitra.webp",
    quote: "git commit, git push, git regret",
  },
  {
    name: "Gaurav Dhanraja ",
    role: "Frontend",
    instagram: "https://instagram.com/gaurav.dhanraja",
    github: "https://github.com/gauravdhanraja",
    linkedin: "https://linkedin.com/in/gauravdhanraja",
    image: "/2025/team/gaurav_dhanraja.webp",
    quote: "Ishan's a stalker",
  },
  {
    name: "M Sayeem Ahmed",
    role: "Backend",
    instagram: "https://www.instagram.com/ahmedmsayeem/",
    github: "https://github.com/ahmedmsayeem",
    linkedin: "https://www.linkedin.com/in/m-sayeem-ahmed-651a7b254",
    image: "/2025/team/sayeem_ahmed.webp",
    quote: "womp womp",
  },

  {
    name: "Prakash Waddar",
    role: "Frontend",
    instagram: "https://www.instagram.com/____prakash____28",
    github: "https://github.com/prakashwaddar628",
    linkedin:
      "https://www.linkedin.com/in/prakash-l-waddar-422760203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: "/2025/team/prakash_waddar.webp",
    quote: "Break loops, not your spirit. Go beyond your limits",
  },
  {
    name: "Mustafa",
    role: "Frontend",
    instagram: "https://www.instagram.com/mustafa._._.raza/",
    github: "https://github.com/Mustafa-DEV0",
    linkedin:
      "https://www.linkedin.com/in/mustafa-raza-b98163350?trk=contact-info",
    image: "/2025/team/mustafa.webp",
    quote: "I write clean code… until the deadline says otherwise.",
  },
];
