import { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 160"
      {...props}
    >
      <title>MFT Sports Logo</title>
      <g filter="url(#squiggle-0)" fill="currentColor" className="font-sans">
        <text
          x="10"
          y="80"
          fontSize="85"
          fontWeight="900"
          transform="rotate(-4 10 80)"
          letterSpacing="-4"
        >
          MFT
        </text>
        <text
          x="40"
          y="140"
          fontSize="65"
          fontWeight="900"
          transform="rotate(2 40 140)"
          letterSpacing="-2"
        >
          SPORTS
        </text>
      </g>
    </svg>
  );
}
