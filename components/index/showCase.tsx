"use client";

import { motion } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Image from "next/image";
import Slider, { Settings } from "react-slick";

export default function Showcase() {
  const idols = [
    {
      name: "Idol 1",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg",
    },
    {
      name: "Idol 2",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg",
    },
    {
      name: "Idol 3",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg",
    },
    {
      name: "Idol 4",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/20240226_Kim_Jisoo_%EA%B9%80%EC%A7%80%EC%88%98_02.jpg",
    },
  ];

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

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Spotlight Idols</h2>
        <Slider {...settings}>
          {idols.map((idol, index) => (
            <motion.div
              key={index}
              className="p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={idol.img}
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
          ))}
        </Slider>
      </div>
    </section>
  );
}
