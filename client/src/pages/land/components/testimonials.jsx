import { Wrapper } from "@/components/global/Wrapper";
import { Container } from "@/components/global/Container";
import SectionBadge from "@/components/ui/section-badge";
import Marquee from "@/components/ui/marquee";

const Testinomals = () => {
  return (
    <Wrapper className="relative flex flex-col items-center justify-center py-12">
      <div className="absolute -left-1/3 -top-1/4 -z-10 hidden h-72 w-72 rounded-full blur-[10rem] md:block"></div>
      <Container>
        <div className="mx-auto max-w-md text-start md:text-center">
          <SectionBadge title="Our Customers" />
          <div>
            <h2 className="mt-6 text-3xl font-semibold lg:text-4xl text-white">
              What people are saying
            </h2>
          </div>
          <p className="mt-6 text-muted-foreground">
            See how WattX empowers people of all backgrounds. Here&apos;s what
            real people are saying
          </p>
        </div>
      </Container>
      <Container>
        <Marquee />
      </Container>
    </Wrapper>
  );
};
export default Testinomals;
