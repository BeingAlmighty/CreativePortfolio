import React from "react";

const CarouselCard = ({ image, title }) => {
  return (
    <div className="flex-1 h-screen relative overflow-hidden group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

      <div className="absolute bottom-10 left-10 text-white z-10">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="opacity-0 group-hover:opacity-100 transition duration-500">
          View Project
        </p>
      </div>

    </div>
  );
};

export default CarouselCard;