"use client";

import { CameraIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface PhotoGalleryProps {
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

export default function IdolPhotoGallery({ photos }: PhotoGalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 rounded-lg p-8 text-center shadow-md">
        <CameraIcon className="h-16 w-16 text-purple-300 mb-4" />
        <h3 className="text-2xl font-semibold text-purple-700">No Photos Available</h3>
        <p className="text-gray-600 mt-2">
          This idol doesn&apos;t have any photos to display at the moment. Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={photo}
                  alt={photo}
                  width={400}
                  height={400}
                  style={{ objectFit: "cover" }}
                  priority={true}
                  className="rounded-t-lg"
                />
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
