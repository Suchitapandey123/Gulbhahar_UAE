import * as React from "react";
const Plus = (props) => (
  <svg
    width={11}
    height={10}
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1={1.30859}
      y1={4.83334}
      x2={9.81644}
      y2={4.83334}
      stroke="black"
      strokeLinecap="round"
    />
    <line
      x1={5.37891}
      y1={9.5}
      x2={5.37891}
      y2={0.5}
      stroke="black"
      strokeLinecap="round"
    />
  </svg>
);
export default Plus;
