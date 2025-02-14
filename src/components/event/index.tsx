import { Calendar, MapPin, Users } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { type PublishedEventsQuery } from "~/generated/generated";
import { generateEventUrl } from "~/utils/url";
import gsap from "gsap";

const Event = ({
  event,
}: {
  event: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const router = useRouter();
  const getEventAttributes = () => {
    let teamSizeText = "",
      eventTypeText = "";

    // Team Size Formatting
    if (event.minTeamSize === event.maxTeamSize) {
      if (event.minTeamSize === 1) teamSizeText = "Solo";
      else teamSizeText = `${event.minTeamSize} per Team`;
      if (event.minTeamSize === 0) teamSizeText = "";
    } else {
      teamSizeText = `${event.minTeamSize}-${event.maxTeamSize} per Team`;
    }

    // Event Type Formatting
    if (event.eventType.includes("MULTIPLE")) {
      eventTypeText = "Multi";
    } else {
      eventTypeText =
        event.eventType.split("_")[0]![0] +
        event.eventType.split("_")[0]!.slice(1).toLowerCase();
    }

    // Correctly format multiple entry
    const eventTypeWithTeamSize = `${eventTypeText} : ${teamSizeText}`;

    return [
      {
        name: "Date",
        text: event.rounds[0]?.date
          ? new Date(event.rounds[0]?.date).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "TBD",
        Icon: Calendar,
      },
      {
        name: "Type & Team Size",
        text: eventTypeWithTeamSize,
        Icon: Users,
      },
      {
        name: "Venue",
        text: event.venue,
        Icon: MapPin,
      },
    ];
  };
  const buttonRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shine = shineRef.current;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      shine,
      { x: "-100%" },
      { x: "100%", duration: 0.5, ease: "power1.inOut" },
    );

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("mouseenter", () => {
        tl.play(0); // Ensuring it's not returning a Promise
      });

      return () => {
        button.removeEventListener("mouseenter", () => {
          tl.play(0);
        });
      };
    }
  }, []);

  return (
    <div
      event-scroll
      onClick={() => router.push(generateEventUrl(event.name, event.id))}
      className={`relative flex w-full -mt-16 md:-mt-12 justify-center items-center max-w-[80%] sm:max-w-sm md:max-w-md cursor-pointer flex-col rounded-2xl transition-transform duration-300 hover:scale-[1.02] mx-auto sm:mx-0`}
      style={{ willChange: "transform" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 145.68 254"
        className="w-full h-full object-cover rounded-2xl"
        style={{ transform: "scale(0.95)", WebkitTransform: "scale(0.95)" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
                .b {
                  fill: url(#gradient1);
                  backdrop-filter: blur(var(--blur-3xl));
                }
                .e {
                  fill:url(#gradient2);
                }
              `}</style>
        </defs>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* <stop offset="0%" style={{ stopColor: "#006d44" }} />
            <stop offset="100%" style={{ stopColor: "#006d44" }} /> */}
            <stop offset="0%" style={{ stopColor: "#006d38" }} />
            <stop offset="50%" style={{ stopColor: "#006d44" }} />
            <stop offset="100%" style={{ stopColor: "#006d38" }} />
            {/* <stop offset="25%" style={{ stopColor: "rgba(5,68,50,0.5)" }} />
            <stop offset="50%" style={{ stopColor: "rgba(5,68,50,0.1)" }} />
            <stop offset="75%" style={{ stopColor: "rgba(5,68,50,0.5)" }} />
            <stop offset="100%" style={{ stopColor: "#000000" }} /> */}
          </linearGradient>
        </defs>

        <polygon
          className="b"
          points="13.1 242.61 13.07 242.61 12.78 242.29 13.06 242.57 13.1 242.61"
        />
        <path
          className="b"
          d="M145.68 236.24H145.67L145.68 237.55V240.74L135.88 253.5H13.1L12.78 253.18L13.07 253.5H9.77L0 240.74V237.6H0.05L0 237.55V155.11L13.07 142.04V89.04L0 77.65V16.23L15.8 0H54.94L64.95 9.96H131.41L137.63 16.23L141.7 20.3C141.81 20.41 141.92 20.52 142 20.64L142.16 20.81L145.68 24.34V236.24Z"
          fill="black"
          stroke="rgba(153,255,216,0.8)"
          stroke-width="0.6"
        />
        <polygon
          className="b"
          points="13.1 242.61 13.07 242.61 12.78 242.29 13.06 242.57 13.1 242.61"
        />

        <foreignObject x="0" y="86" width="17" height="60">
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-white italic font-semibold text-[8px] uppercase transform origin-center -rotate-90 whitespace-nowrap  px-8 shadow-2xl rounded-xl">
              {event.category?.toLowerCase() === "non_technical"
                ? "Non Tech"
                : event.category?.toLocaleLowerCase()}
            </span>
          </div>
        </foreignObject>

        <image
          href="/2025/logo-white.webp"
          x="21"
          y="-8"
          width="30"
          height="30"
          className="object-cover z-500"
        />
        {event.image && (
          <image
            href={event.image}
            x="19"
            y="18.5"
            width="120"
            height="123"
            preserveAspectRatio="xMidYMid slice"
            className="object-cover [clip-path:polygon(0_0,90%_0,100%_10%,100%_100%,0_100%)]"
          />
        )}

        <foreignObject
          x="-2"
          y="140"
          width="150"
          height="120"
          style={{ position: "relative" }}
        >
          <div className="text-white flex flex-col w-full items-center justify-center">
            <h2 className="font-life-craft my-1 text-center italic text-white w-32 overflow-hidden whitespace-nowrap">
              {event.name.length > 20 ? (
                <div
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    animation: "marquee 10s linear infinite",
                  }}
                >
                  {event.name}
                </div>
              ) : (
                event.name
              )}
              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(60%);
                  }
                  100% {
                    transform: translateX(-60%);
                  }
                }
              `}</style>
            </h2>

            <div className="grid grid-cols-1 gap-x-1 gap-y-1 w-full px-2 items-start -mt-1.5">
              {getEventAttributes().map((attr, i) => (
                <div
                  key={i}
                  className="flex items-center h-3.5 text-[7px] gap-1 rounded-md px-2 py-[7px]
                     bg-gradient-to-tr bg-opacity-50 from-primary-900 via-primary-800/80 to-primary-900
                     border border-primary-300/50 text-white font-medium shadow-md"
                >
                  <attr.Icon width="7" height="7" className="flex-shrink-0" />
                  <span
                    className="leading-none flex items-center mt-0.5"
                    suppressHydrationWarning
                  >
                    {attr.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </foreignObject>
      </svg>
      <div
        className="h-[6%] register-button w-[86%] aspect-square bg-gradient-to-tr bg-opacity-50 from-primary-950 via-primary-900/90 to-primary-950 flex justify-center items-center absolute -mt-[42.5%]"
        style={{
          clipPath:
            "polygon(0% 55%, 5% 0%, 95% 0%, 100% 55%, 95% 100%, 5% 100%)",
          WebkitClipPath:
            "polygon(0% 55%, 5% 0%, 95% 0%, 100% 55%, 95% 100%, 5% 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        ref={buttonRef}
        onClick={() => router.push(generateEventUrl(event.name, event.id))}
      >
        <div className="text-white font-life-craft tracking-widest italic font-semibold text-[27px] uppercase cursor-pointer mt-1">
          Register
          <div
            ref={shineRef}
            className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Event;
