import * as React from "react";
const Divider = (props) => (
  <svg
    width={30}
    height={2}
    viewBox="0 0 30 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1 1H29" stroke="#D9D9D9" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
export default Divider;
