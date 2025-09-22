import React from 'react';

export const IndiaFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    className={className}
    aria-label="Indian Flag"
  >
    <rect width="900" height="600" fill="#F93" />
    <rect width="900" height="400" fill="#FFF" />
    <rect width="900" height="200" fill="#128807" />
    <g transform="translate(450,300)">
      <circle r="90" fill="#000080" />
      <circle r="80" fill="#FFF" />
      <circle r="3.5" fill="#000080" />
      <g id="d">
        <g id="c">
          <g id="b">
            <g id="a" fill="#000080">
              <circle r="9" transform="rotate(7.5) translate(80)" />
              <path d="M0,80 a80,80 0 0,1 10.47,0" />
            </g>
            <use href="#a" transform="rotate(15)" />
          </g>
          <use href="#b" transform="rotate(30)" />
        </g>
        <use href="#c" transform="rotate(60)" />
      </g>
      <use href="#d" transform="rotate(120)" />
      <use href="#d" transform="rotate(240)" />
    </g>
  </svg>
);