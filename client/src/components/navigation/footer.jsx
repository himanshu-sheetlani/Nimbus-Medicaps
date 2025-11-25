import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl border-t border-zinc-800 border-border px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 pt-12 sm:pt-16">
      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Logo and Summary */}
        <div className="md:col-span-2 xl:col-span-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Nimbus
          </h2>

          <div className="mt-4 flex gap-3 sm:gap-4 text-muted-foreground">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="hover:text-white transition h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="hover:text-white transition h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="hover:text-white transition h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="hover:text-white transition h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm sm:text-base font-medium text-white">
            Product
          </h3>
          <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Enterprise
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Downloads
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Students
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm sm:text-base font-medium text-white">
            Resources
          </h3>
          <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-white transition">
                Docs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Forum
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Changelog
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm sm:text-base font-medium text-white">
            Company
          </h3>
          <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-white transition">
                Anysphere
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Comunities
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Customers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-medium text-white">Legal</h3>
          <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 sm:mt-12 border-t border-border/40 pt-4 sm:pt-6 text-center md:flex md:items-center md:justify-between">
        <p className="text-xs sm:text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Nimbus. All rights reserved.
        </p>
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1 text-xs sm:text-sm text-muted-foreground md:mt-0">
          Made by Pixel with{" "}
          <Heart className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5 fill-red-600 text-primary" />
        </div>
      </div>
    </footer>
  );
}
