import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const animatedTitleSchema = z.object({
  title: z.string(),
  color: zColor(),
});

export const AnimatedTitle: React.FC<z.infer<typeof animatedTitleSchema>> = ({
  title,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const scale = interpolate(titleProgress, [0, 1], [0.3, 1]);
  const opacity = interpolate(titleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "144px",
          fontWeight: "bold",
          textAlign: "center",
          color,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        {title}
      </h1>
    </AbsoluteFill>
  );
};