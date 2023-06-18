"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map2"), { ssr: false });

const Map = ({ height }) => {
  return typeof window !== "undefined" ? <DynamicMap height={height} /> : null;
};

export default Map;
