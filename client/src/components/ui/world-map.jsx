import DottedMap from "dotted-map";

export default function WorldMap({
  mapColor = "#27272a",
  backgroundColor = "black",
}) {
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: mapColor,
    shape: "circle",
    backgroundColor: backgroundColor,
  });

  return (
    <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
    </div>
  );
}
