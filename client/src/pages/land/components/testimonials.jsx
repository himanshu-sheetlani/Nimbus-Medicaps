import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import Marquee from "@/components/ui/marquee";

const Testinomals = () => {
  return (
    <Wrapper className="relative flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16">
      <div className="absolute -left-1/4 sm:-left-1/3 -top-1/4 -z-10 h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 rounded-full blur-[8rem] sm:blur-[10rem] opacity-30 lg:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <Container>
        <div className="mx-auto max-w-md text-start md:text-center px-4 sm:px-6 lg:px-8">
          <SectionBadge title="Our Customers" />
          <div>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-semibold lg:text-4xl text-white">
              What people are saying
            </h2>
          </div>
          <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-base">
            See how WattX empowers people of all backgrounds. Here&apos;s what
            real people are saying
          </p>
        </div>
      </Container>
      <Container>
        <div className="w-full mt-6 sm:mt-8 lg:mt-12">
          <Marquee />
        </div>
      </Container>
    </Wrapper>
  );
};
export default Testinomals;
