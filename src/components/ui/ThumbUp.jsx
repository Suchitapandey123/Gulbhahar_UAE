import * as React from "react";
const ThumbUp = (props) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 6.55492C6 6.19685 6.12809 5.8506 6.36112 5.57873L9.95429 1.38669C10.275 1.01252 10.8092 0.904643 11.25 1.12503C11.6803 1.34021 11.887 1.83908 11.7348 2.29553L10.5 6.00003H13.9527C14.0427 6.00003 14.1325 6.00813 14.221 6.02423C15.0361 6.17242 15.5767 6.9533 15.4285 7.76836L14.4739 13.0184C14.3443 13.7316 13.7231 14.25 12.9981 14.25H7.5C6.67157 14.25 6 13.5785 6 12.75V6.55492Z"
      stroke="black"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 13.5V6.75"
      stroke="black"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ThumbUp;
