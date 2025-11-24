import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import SectionBadge from "@/components/ui/section-badge";
import { features } from "@/constant/land";

const Feature = () => {
  return (
    <Wrapper className="relative flex flex-col items-center justify-center py-12">
      <div className="absolute -right-1/3 top-0 -z-10 hidden h-72 w-72 rounded-full bg-primary blur-[10rem] md:block"></div>
      <div className="absolute -left-1/3 bottom-0 -z-10 hidden h-72 w-72 rounded-full bg-indigo-600 blur-[10rem] md:block"></div>
      <Container>
        <div className="mx-auto max-w-md text-start md:text-center">
          <SectionBadge title="Features" />
          <div>
            <h2 className="mt-6 text-3xl font-semibold lg:text-4xl text-white">
              Explore Our Cutting-Edge Features
            </h2>
          </div>
          <p className="mt-6 text-muted-foreground">
            Our platform offers intelligent tools to revolutionize coding,
            learning, and productivity.
          </p>
        </div>
      </Container>
      <Container>
        <div className="mx-auto mt-8 flex items-center justify-center"></div>
      </Container>
      <Container>
        <div className="flex w-full flex-col items-center justify-center py-10 md:px-10 md:py-20">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start px-0 md:px-0 lg:items-start"
              >
                <div className="flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-start text-muted-foreground lg:text-start">
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
