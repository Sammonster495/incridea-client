import Image from "next/image";
import { MdMailOutline } from "react-icons/md";
import { VscCallOutgoing } from "react-icons/vsc";

const TeamCard = ({
  name,
  image,
  committee,
  designation,
  phone,
  email,
}: {
  name: string;
  image: string;
  committee: string;
  designation: string;
  phone: string;
  email: string;
}) => {
  return (
    <div className="flex w-[20rem] gap-4 rounded-xl border text-white border-primary-200/80 bg-primary-500 bg-opacity-20 pb-12 bg-clip-padding px-5 pt-5 duration-200 hover:scale-[1.02]">
      <div className="flex h-full w-full flex-col gap-4">
        <Image
          src={image}
          alt={name}
          height={300}
          width={300}
          className="top-0 aspect-square w-[18rem] rounded-xl object-cover"
        />
        <div>
          <h3 className="text-center font-life-craft text-4xl tracking-wide ">
            {name}
          </h3>
          <h1 className="text-center text-xl font-semibold ">
            {`${designation} | ${committee}`}
          </h1>
        </div>

        <div className="flex w-full justify-center gap-4">
          <a
            href={email}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#2b6f3d] bg-primary-500 bg-opacity-20 bg-clip-padding p-2 duration-300 hover:scale-105"
          >
            <MdMailOutline className="" size={20} />
          </a>
          <a
            href={phone}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#2b6f3d] bg-primary-500 bg-opacity-20 bg-clip-padding p-2 duration-300 hover:scale-105"
          >
            <VscCallOutgoing className="" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
