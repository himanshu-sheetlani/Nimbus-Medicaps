import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { features } from "@/constant/land";

const Feature = () => {
  return (
    <Wrapper className="relative flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16">
      <div className="absolute -right-1/4 sm:-right-1/3 top-0 -z-10 h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 rounded-full bg-primary blur-[8rem] sm:blur-[10rem] opacity-30 lg:opacity-100"></div>
      <div className="absolute -left-1/4 sm:-left-1/3 bottom-0 -z-10 h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 rounded-full bg-indigo-600 blur-[8rem] sm:blur-[10rem] opacity-30 lg:opacity-100"></div>
      <Container>
        <div className="mx-auto max-w-md text-start md:text-center px-4 sm:px-6 lg:px-8">
          <SectionBadge title="Features" />
          <div>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-semibold lg:text-4xl text-white">
              Explore Our Cutting-Edge Features
            </h2>
          </div>
          <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-base">
            Our platform offers intelligent tools to revolutionize coding,
            learning, and productivity.
          </p>
        </div>
      </Container>
      <Container>
        <div className="mx-auto mt-6 sm:mt-8 flex items-center justify-center"></div>
      </Container>
      <Container>
        <div className="flex w-full flex-col items-center justify-center py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start px-2 sm:px-4 md:px-0 lg:items-start p-4 sm:p-6 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="mt-2 sm:mt-4 text-lg sm:text-xl font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-start text-muted-foreground lg:text-start text-sm sm:text-base">
                  {feature.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};
export default Feature;
