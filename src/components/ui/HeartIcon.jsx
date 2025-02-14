import * as React from "react";
const HeartIcon = (props) => (
  <svg
    width={137}
    height={137}
    viewBox="0 0 137 137"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_90_565)">
      <rect
        x={21}
        y={17}
        width={95}
        height={95}
        rx={7}
        stroke="black"
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <path
      d="M68.5 81.375L65.7813 78.9472C56.125 70.358 49.75 64.6931 49.75 57.7408C49.75 52.076 54.2875 47.625 60.0625 47.625C63.325 47.625 66.4563 49.1148 68.5 51.469C70.5438 49.1148 73.675 47.625 76.9375 47.625C82.7125 47.625 87.25 52.076 87.25 57.7408C87.25 64.6931 80.875 70.358 71.2188 78.9656L68.5 81.375Z"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_90_565"
        x={0}
        y={0}
        width={137}
        height={137}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={10} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_90_565"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_90_565"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default HeartIcon;
