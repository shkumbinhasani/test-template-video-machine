import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";

export const twoImagesSchema = z.object({
  image1Url: z.string(),
  image2Url: z.string(),
  fullSize: z.boolean(),
  borderRadius: z.number(),
});

export const TwoImages: React.FC<z.infer<typeof twoImagesSchema>> = ({
  image1Url,
  image2Url,
  fullSize,
  borderRadius,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const image1Progress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const image2Progress = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const image1Opacity = interpolate(image1Progress, [0, 1], [0, 1]);
  const image1TranslateX = interpolate(image1Progress, [0, 1], [-100, 0]);

  const image2Opacity = interpolate(image2Progress, [0, 1], [0, 1]);
  const image2TranslateX = interpolate(image2Progress, [0, 1], [100, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          padding: "0 64px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "75%",
            opacity: image1Opacity,
            transform: `translateX(${image1TranslateX}px)`,
          }}
        >
          <Img
            src={image1Url}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: `${borderRadius}px`,
              objectFit: fullSize ? "cover" : "contain",
            }}
          />
        </div>
        
        <div
          style={{
            flex: 1,
            height: "75%",
            opacity: image2Opacity,
            transform: `translateX(${image2TranslateX}px)`,
          }}
        >
          <Img
            src={image2Url}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: `${borderRadius}px`,
              objectFit: fullSize ? "cover" : "contain",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};