import * as React from "react";
const SortIcon = (props) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1={1}
      y1={1}
      x2={15}
      y2={1}
      stroke="#929292"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <line
      x1={2.77734}
      y1={5}
      x2={13.2218}
      y2={5}
      stroke="#929292"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <line
      x1={4.55566}
      y1={9}
      x2={11.4446}
      y2={9}
      stroke="#929292"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default SortIcon;
