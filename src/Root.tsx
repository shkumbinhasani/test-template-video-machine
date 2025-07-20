import "./index.css";
import { Composition } from "remotion";
import { AnimatedTitle, animatedTitleSchema } from "./compositions/AnimatedTitle";
import { TitleWithDescription, titleWithDescriptionSchema } from "./compositions/TitleWithDescription";
import { TwoImages, twoImagesSchema } from "./compositions/TwoImages";
import { BarChart, barChartSchema } from "./compositions/BarChart";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnimatedTitle"
        component={AnimatedTitle}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        schema={animatedTitleSchema}
        defaultProps={{
          title: "Amazing Title",
          color: "#000000",
        }}
      />

      <Composition
        id="TitleWithDescription"
        component={TitleWithDescription}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={titleWithDescriptionSchema}
        defaultProps={{
          title: "Main Title",
          description: "This is a detailed description that explains the content",
          titleColor: "#000000",
          descriptionColor: "#666666",
        }}
      />

      <Composition
        id="TwoImages"
        component={TwoImages}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        schema={twoImagesSchema}
        defaultProps={{
          image1Url: "https://picsum.photos/800/600?random=1",
          image2Url: "https://picsum.photos/800/600?random=2",
          fullSize: true,
          borderRadius: 12,
        }}
      />

      <Composition
        id="BarChart"
        component={BarChart}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        schema={barChartSchema}
        defaultProps={{
          title: "Sales Data",
          data: [
            { label: "Q1", value: 75 },
            { label: "Q2", value: 85 },
            { label: "Q3", value: 65 },
            { label: "Q4", value: 95 },
          ],
          barColor: "#3B82F6",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
