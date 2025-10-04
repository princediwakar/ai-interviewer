// app/Logo.tsx

import React from 'react';

// We create a React component that returns your SVG.
// Using `fill="currentColor"` is a powerful trick that makes the SVG
// inherit the text color of its parent element.
export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12.7 15.875"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // This allows you to pass props like `className`
  >
    <g transform="translate(0,-284.29998)">
      <path
        d="m 6.1799806,284.82444 a 5.8208499,5.8208499 0 0 0 -5.65081196,5.81877 5.8208499,5.8208499 0 1 0 11.64166636,0 5.8208499,5.8208499 0 0 0 -5.9908544,-5.81877 z m 0.1731169,2.16886 a 0.17260116,0.17260116 0 0 1 0.1338527,0.0682 l 2.6437696,3.47679 a 0.17260116,0.17260116 0 0 1 0,0.20929 l -2.6437696,3.47679 a 0.17260116,0.17260116 0 0 1 -0.2743993,0 L 3.5687813,290.7476 a 0.17260116,0.17260116 0 0 1 0,-0.20929 l 2.6437696,-3.47679 a 0.17260116,0.17260116 0 0 1 0.1405466,-0.0682 z"
        fill="currentColor"
        stroke="none"
      />
    </g>
  </svg>
);