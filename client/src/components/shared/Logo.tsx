import React from "react";
import { Hexagon } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Hexagon />

      <div className="text-white">
        <div className="text-xl font-bold">levitation</div>
        <div className="text-xs text-dark-muted">INFOTECH</div>
      </div>
    </div>
  );
};

export default Logo;
