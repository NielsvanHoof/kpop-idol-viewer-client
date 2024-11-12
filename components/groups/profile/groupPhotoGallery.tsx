"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface GroupPhotoGalleryProps {
  photos: string[];
}

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function GroupPhotoGallery({ photos }: GroupPhotoGalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CiCamera className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">
          No Photos Available
        </h3>
        <p className="text-gray-600 mt-2">
          This group doesn&apos;t have any photos to display at the moment.
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <Slider {...settings} className="p-4">
      {photos.map((photo, index) => (
        <motion.div key={index} className="p-2" whileHover={{ scale: 1.05 }}>
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={photo}
              alt={`Group Photo ${index + 1}`}
              fill={true}
              sizes="100%"
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </Slider>
  );
}
