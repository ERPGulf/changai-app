import React from "react";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

type Props = {
  color: string;
  size?: number;
};

export default function IconGlow({
  color,
  size = 220,
}: Props) {
  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: "absolute",
      }}
    >
      <Defs>
        <RadialGradient
          id="glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <Stop
            offset="0%"
            stopColor={color}
            stopOpacity="0.28"
          />

          <Stop
            offset="35%"
            stopColor={color}
            stopOpacity="0.14"
          />

          <Stop
            offset="65%"
            stopColor={color}
            stopOpacity="0.06"
          />

          <Stop
            offset="100%"
            stopColor={color}
            stopOpacity="0"
          />
        </RadialGradient>
      </Defs>

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill="url(#glow)"
      />
    </Svg>
  );
}