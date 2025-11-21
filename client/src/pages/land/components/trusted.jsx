import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TrustedBy() {
  const avatars = [
    {
      src: "https://randomuser.me/api/portraits/women/1.jpg",
      alt: "Student testimonial 1",
      fallback: "S1",
    },
    {
      src: "https://randomuser.me/api/portraits/men/2.jpg",
      alt: "Student testimonial 2",
      fallback: "S2",
    },
    {
      src: "https://randomuser.me/api/portraits/women/3.jpg",
      alt: "Student testimonial 3",
      fallback: "S3",
    },
    {
      src: "https://randomuser.me/api/portraits/men/4.jpg",
      alt: "Student testimonial 4",
      fallback: "S4",
    },
    {
      src: "https://randomuser.me/api/portraits/women/5.jpg",
      alt: "Student testimonial 5",
      fallback: "S5",
    },
    {
      src: "https://randomuser.me/api/portraits/men/6.jpg",
      alt: "Student testimonial 6",
      fallback: "S6",
    },
    {
      src: "https://randomuser.me/api/portraits/women/7.jpg",
      alt: "Student testimonial 7",
      fallback: "S7",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
      {/* Avatars */}
      <div className="flex -space-x-2 sm:-space-x-3">
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            className="border-2 border-white w-7 h-7 sm:w-8 sm:h-8 shadow-sm hover:scale-105 transition-transform hover:z-10 relative"
          >
            <AvatarImage
              src={avatar.src}
              alt={avatar.alt}
              loading="lazy"
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-medium bg-blue-100 text-blue-600">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Text */}
      <p className="text-xs sm:text-sm text-gray-200 font-medium text-center sm:text-left">
        Trusted by{" "}
        <span className="font-semibold text-gray-400">1000+ Travlers</span>
      </p>
    </div>
  );
}
