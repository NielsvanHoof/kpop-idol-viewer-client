"use client";

import { motion } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Error from "@/app/_error";
import fetchGroups from "@/queries/groups/fetchGroups";
import { useGroupOverviewStore } from "@/state/group.overview";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import Spinner from "../ui/spinner";

export default function FeaturedGroups() {
  const useGroupOverViewStore = useGroupOverviewStore();

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Only one slide is shown at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true, // Center the slide
    centerPadding: "0px", // No padding on the sides
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Error
        statusCode={500}
        message="Failed to fetch groups"
        onRetry={refetch}
      />
    );
  }

  return (
    <Slider {...settings}>
      {data?.data.map((group, index) => (
        <motion.div key={index} className="p-4">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-6 bg-gradient-to-r from-purple-700 to-pink-700 rounded-lg text-white shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={`https://upload.wikimedia.org/wikipedia/commons/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg`}
                alt={group.name}
                fill={true}
                sizes="200px"
                priority={true}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{group.name}</h2>
              <p className="text-sm mb-4">
                Debut Year: {new Date(group.debut_date).getFullYear()} |
              </p>
              <Button
                onClick={() => useGroupOverViewStore.setSelectedGroup(group)}
                className="px-4 py-2 bg-white text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                Quick View
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </Slider>
  );
}
