import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { ArrowRight } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import SectionBadge from "@/components/ui/section-badge";
import TrustedBy from "./trusted";
import { Link } from "react-router-dom";
import { Earth } from "lucide-react";

// constants
import { paragraph } from "@/constant/land";
import { words } from "@/constant/land";

const Hero = () => {
  return (
    <Wrapper className="min-h-screen flex items-center justify-center">
      <Container delay={0.1} className="w-full">
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          {/* Welcome Badge */}
          <Container delay={0.2} className="flex justify-center">
            <SectionBadge title="Welcome to Nimbus" />
          </Container>

          {/* Main Heading */}
          <Container delay={0.3} className="flex justify-center">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-200 leading-tight font-inter-medium mb-2 text-center">
                Your AI-Powered Journey to <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                    Incredible India
                  </span>
                </span>
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-300 font-light italic mb-6 sm:mb-8 overflow-hidden font-heading text-center">
                Travel that's truly{" "}
                <FlipWords
                  words={words}
                  className="inline-block text-blue-300 p-2 sm:p-4"
                />
              </div>
            </div>
          </Container>

          {/* Subtitle */}
          <Container delay={0.4} className="flex justify-center">
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 text-center mb-8 sm:mb-10 lg:mb-12 max-w-3xl leading-relaxed px-4 font-sans">
              {paragraph}
            </p>
          </Container>

          {/* Action Buttons */}
          <Container delay={0.5} className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-6 sm:mb-8 w-full max-w-md sm:max-w-none">
              <div className="border border-zinc-800 rounded-md p-1 w-full sm:w-auto">
                <Link className="flex items-center justify-center px-4 sm:px-6 bg-black py-3 sm:py-4 rounded-md inter text-white hover:bg-zinc-900 transition-colors w-full text-sm sm:text-base">
                  Explore Features
                  <ArrowRight size={16} className="ml-2 sm:hidden" />
                  <ArrowRight size={20} className="ml-2 hidden sm:block" />
                </Link>
              </div>

              <div className="border border-zinc-800 rounded-md p-1 w-full sm:w-auto">
                <Link
                  to="/auth"
                  className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 rounded-md bg-white text-black inter hover:bg-gray-100 transition-colors w-full text-sm sm:text-base"
                >
                  Let's Get Started
                </Link>
              </div>
            </div>
          </Container>

          {/* Stats or Trust Indicators */}
          <Container delay={0.6} className="flex justify-center">
            <div className="mt-0 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-gray-600">
              <TrustedBy />
            </div>
          </Container>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Hero;
