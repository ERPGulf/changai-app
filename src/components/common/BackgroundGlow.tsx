import React from "react";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

type Props = {
  color: string;
  size: number;
  top: number;
  left: number;
  opacity?: number;
};

export default function BackgroundGlow({
  color,
  size,
  top,
  left,
  opacity = 0.18,
}: Props) {
  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        top,
        left,
      }}
    >
      <Defs>
        <RadialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="45%" stopColor={color} stopOpacity={opacity * 0.45} />
          <Stop offset="75%" stopColor={color} stopOpacity={opacity * 0.15} />
          <Stop offset="100%" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill="url(#bgGlow)"
      />
    </Svg>
  );
}