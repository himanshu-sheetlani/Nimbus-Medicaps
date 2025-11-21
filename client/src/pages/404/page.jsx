import { Wrapper } from "@/components/global/Wrapper";
import { Container } from "@/components/global/Container";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute -right-1/3 top-0 -z-10 h-72 w-72 rounded-full bg-purple-600 blur-[10rem] opacity-30"></div>
      <div className="absolute -left-1/3 bottom-0 -z-10 h-72 w-72 rounded-full bg-purple-800 blur-[10rem] opacity-30"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 h-1 w-1 bg-purple-300 rounded-full opacity-40 animate-pulse delay-75"></div>
        <div className="absolute bottom-1/4 left-3/4 h-3 w-3 bg-purple-500 rounded-full opacity-20 animate-pulse delay-150"></div>
      </div>

      <Wrapper className="relative flex flex-col items-center justify-center py-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            {/* Large 404 number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[4rem] font-inter-bold text-white">
                404
              </h1>
            </div>

            {/* Page not found text */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-inter-semibold text-purple-100 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-zinc-400 font-inter-regular leading-relaxed">
                The page you're looking for seems to have wandered off into the
                digital void. Don't worry, even the best explorers sometimes
                take a wrong turn.
              </p>
            </div>

            {/* Search suggestion */}
            <div className="mb-8 p-4 bg-zinc-950/80 border border-purple-800/50 rounded-lg">
              <div className="flex items-center justify-center text-purple-200 mb-2">
                <Search className="h-5 w-5 mr-2" />
                <span className="font-inter-medium text-sm">Suggestion</span>
              </div>
              <p className="text-purple-300 font-inter-light text-sm">
                Try checking the URL for typos or head back to our homepage to
                continue your journey.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {/* Go back button */}
              <div className="border border-zinc-600 rounded-lg p-1 hover:border-purple-600 transition-colors">
                <Link
                  to="/"
                  className="flex items-center justify-center px-6 py-3 bg-zinc-900/50 text-purple-100 rounded-md font-inter-medium hover:bg-purple-800/50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Link>
              </div>

              {/* Home button */}
              <div className="border border-zinc-400 rounded-lg p-1 hover:border-purple-500 transition-colors">
                <Link
                  to="/"
                  className="flex items-center justify-center px-6 py-3 bg-white text-black rounded-md font-inter-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Additional help text */}
            <div className="mt-12 text-center">
              <p className="text-zinc-400 font-inter-light text-sm">
                Still lost? Contact our support team for assistance.
              </p>
              <Link
                to="/contact"
                className="text-white font-inter-medium text-sm hover:text-purple-200 underline underline-offset-4 decoration-purple-500 hover:decoration-purple-400 transition-colors"
              >
                Get Help →
              </Link>
            </div>

            {/* Fun element - floating icons */}
            <div className="absolute top-20 right-10 text-purple-400 opacity-20 animate-bounce">
              <div className="text-4xl transform rotate-12">🚀</div>
            </div>
            <div className="absolute bottom-20 left-10 text-purple-400 opacity-20 animate-bounce delay-1000">
              <div className="text-3xl transform -rotate-12">🔍</div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default NotFoundPage;
