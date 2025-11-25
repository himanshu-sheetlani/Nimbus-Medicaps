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
    <Wrapper className="relative flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="max-w-md text-start md:mx-auto md:text-center px-4 sm:px-6 lg:px-8">
          <SectionBadge title="Pricing" />
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-semibold lg:text-4xl text-white">
            Unlock the right plan for your business
          </h2>
          <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-base">
            Choose the best plan for your business and start building your dream
            website today
          </p>
        </div>
      </Container>
      <Container className="flex items-center justify-center">
        <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn(
                "relative flex w-full flex-col border border-neutral-700 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 overflow-hidden backdrop-blur-sm",
                card.title === "Unlimited Saas" &&
                  "border-2 border-zinc-700 scale-105 lg:scale-110",
                "before:absolute before:top-0 before:left-1/2 before:h-[2px] before:w-40 sm:before:w-60 before:-translate-x-1/2",
                "before:bg-gradient-to-r before:from-transparent before:via-purple-500 before:to-transparent",
                "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              )}
            >
              <CardHeader className="p-4 sm:p-6">
                <span className="text-base sm:text-lg text-white font-medium">
                  {card.title}
                </span>
                <span className="text-xs sm:text-sm text-zinc-400">
                  {card.description}
                </span>
                <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-white">
                  {card.price}
                  <span className="text-xs sm:text-sm text-zinc-400">
                    /{card.duration}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 p-4 sm:p-6 flex-grow">
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <CiCircleCheck className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="mt-auto w-full p-4 sm:p-6">
                <Link
                  href="#"
                  className={cn(
                    "w-full rounded-md p-2 sm:p-3 text-center text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105",
                    card.title === "Unlimited Saas"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
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
