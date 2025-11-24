import { cn } from "@/lib/utils";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SectionBadge from "@/components/ui/section-badge";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
import { pricingCards } from "@/constant/land";

const Pricing = () => {
  return (
    <Wrapper className="relative flex flex-col items-center justify-center py-12">
      <Container>
        <div className="max-w-md text-start md:mx-auto md:text-center">
          <SectionBadge title="Pricing" />
          <h2 className="mt-6 text-3xl font-semibold lg:text-4xl text-white">
            Unlock the right plan for your business
          </h2>
          <p className="mt-6 text-muted-foreground">
            Choose the best plan for your business and start building your dream
            website today
          </p>
        </div>
      </Container>
      <Container className="flex items-center justify-center">
        <div className="grid w-full max-w-6xl grid-cols-1 flex-wrap justify-center gap-5 py-10 md:gap-8 md:py-20 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn(
                "relative flex w-full flex-col border border-neutral-700 bg-[#0b0b0b] overflow-hidden",
                card.title === "Unlimited Saas" && "border-2 border-zinc-900",
                "before:absolute before:top-0 before:left-1/2 before:h-[2px] before:w-60 before:-translate-x-1/2",
                "before:bg-gradient-to-r before:from-transparent before:via-purple-500 before:to-transparent"
              )}
            >
              <CardHeader>
                <span className="text-lg text-white">{card.title}</span>
                <span className="text-sm text-zinc-400">
                  {card.description}
                </span>
                <CardTitle className="text-4xl text-white">
                  {card.price}
                  <span className="text-sm text-zinc-400">
                    /{card.duration}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 pt-6">
                {card.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CiCircleCheck className="h-4 w-4 text-purple-500" />
                    <p className="text-sm font-light text-zinc-400">
                      {feature}
                    </p>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="mt-auto w-full">
                <Link
                  href="#"
                  className={cn(
                    "w-full rounded-md p-2 text-center text-sm font-medium",
                    card.title === "Unlimited Saas"
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background"
                  )}
                >
                  {card.buttonText}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};
export default Pricing;
