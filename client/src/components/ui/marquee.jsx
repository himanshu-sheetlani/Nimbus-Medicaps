"use client";
import { motion } from "framer-motion";
import { reviews } from "@/constant/land";
import { cn } from "@/lib/utils";
import { BsTwitterX } from "react-icons/bs";

export default function Marquee() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <div className="w-full py-10 md:py-20">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
        <div className="flex mt-8 w-[90vw] overflow-x-hidden gap-6">
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {firstRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
        </div>
        <div className="flex mt-8 w-[90vw] overflow-x-hidden gap-6">
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {secondRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {secondRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {secondRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {secondRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-shrink-0 gap-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {secondRow.map((review) => (
              <figure
                key={review.name}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4  border-zinc-900 border-[1px] ",
                  "bg-[#090909] bg-gradient-to-br from-[#0f0f0f] to-[#090909]", // subtle dark gradient base
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none",
                  "hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      <img
                        src={review.avatar}
                        alt={`${review.name} avatar`}
                        fill
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-semibold text-white">
                        {review.name}
                      </figcaption>
                      <span className="text-xs text-zinc-400">
                        {review.username}
                      </span>
                    </div>
                  </div>
                  <BsTwitterX className="text-white opacity-80" />
                </div>

                <blockquote className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  {review.body}
                </blockquote>

                <div className="mt-3 text-xs text-zinc-500">{review.date}</div>
              </figure>
            ))}
          </motion.div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
      </div>
    </div>
  );
}
