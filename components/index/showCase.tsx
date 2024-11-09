"use client";

import { motion } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Error from "@/app/_error";
import FetchRandomIdol from "@/queries/idols/fetchRandomIdol";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import Spinner from "../ui/spinner";

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  lazyLoad: "ondemand",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Showcase() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["idols-spotlight"],
    queryFn: FetchRandomIdol,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Error message="Failed to fetch highlighted idols" onRetry={refetch} />
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Spotlight Idols</h2>
        <Slider {...settings}>
          {data?.data.map((idol, index) => (
            <Link key={index} href={`/idols/${idol.slug}`}>
              <motion.div
                key={index}
                className="p-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={idol.profile_picture}
                    alt={idol.name}
                    width={400}
                    height={400}
                    style={{ objectFit: "cover" }}
                    priority={true}
                    className="rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{idol.name}</h3>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
}
