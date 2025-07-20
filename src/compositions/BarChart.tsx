import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const dataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const barChartSchema = z.object({
  title: z.string(),
  data: z.array(dataPointSchema),
  barColor: zColor(),
  titleColor: zColor(),
});

export const BarChart: React.FC<z.infer<typeof barChartSchema>> = ({
  title,
  data,
  barColor,
  titleColor,
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

  const maxValue = Math.max(...data.map(d => d.value));
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 80px",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            marginBottom: "80px",
            color: titleColor,
            opacity: titleOpacity,
          }}
        >
          {title}
        </h1>
        
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "32px",
            height: "400px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {data.map((item, index) => {
            const barProgress = spring({
              frame: frame - 30 - (index * 10),
              fps,
              config: {
                damping: 100,
                stiffness: 200,
              },
            });

            const barHeight = interpolate(
              barProgress,
              [0, 1],
              [0, (item.value / maxValue) * 400]
            );

            const barOpacity = interpolate(barProgress, [0, 1], [0, 1]);

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: 1,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                    opacity: barOpacity,
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    color: "#374151",
                    marginTop: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    color: "#6B7280",
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};