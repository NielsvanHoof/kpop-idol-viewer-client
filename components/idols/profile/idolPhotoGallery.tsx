"use client";

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
