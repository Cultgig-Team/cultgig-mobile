import React from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

interface SVGProps extends SvgProps {
  svgSrc: React.FC<SvgProps>;
  className?: string;
  size?: number;
  color?: string;
}

export const SVG: React.FC<SVGProps> = ({
  svgSrc: RawSvgComponent,
  color,
  className = "",
  size = 2,
  ...props
}) => {
  return (
    <View className={className}>
      <RawSvgComponent
        width={size}
        height={size}
        color={color}
        stroke={color}
        fill={color}
        {...props}
      />
    </View>
  );
};
