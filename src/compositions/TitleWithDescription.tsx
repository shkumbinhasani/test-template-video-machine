import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const titleWithDescriptionSchema = z.object({
  title: z.string(),
  description: z.string(),
  titleColor: zColor(),
  descriptionColor: zColor(),
});

export const TitleWithDescription: React.FC<z.infer<typeof titleWithDescriptionSchema>> = ({
  title,
  description,
  titleColor,
  descriptionColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const descriptionProgress = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleTranslateY = interpolate(titleProgress, [0, 1], [50, 0]);

  const descriptionOpacity = interpolate(descriptionProgress, [0, 1], [0, 1]);
  const descriptionTranslateY = interpolate(descriptionProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <h1
          style={{
            position: "relative",
            fontSize: "120px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            color: titleColor,
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </h1>
        
        <p
          style={{
            position: "relative",
            fontSize: "48px",
            textAlign: "center",
            maxWidth: "1200px",
            lineHeight: "1.5",
            color: descriptionColor,
            opacity: frame >= 30 ? descriptionOpacity : 0,
            transform: `translateY(${frame >= 30 ? descriptionTranslateY : 30}px)`,
          }}
        >
          {description}
        </p>
      </div>
    </AbsoluteFill>
  );
};