import React from 'react';

function Loader() {
  return (
    <svg data-testid="loader" xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        background: 'rgb(255, 255, 255) none repeat scroll 0% 0%',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
    >
      <rect x="15" y="30" width="10" height="40" fill="#e15b64">
        <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.6"
        />
      </rect>
      <rect x="35" y="30" width="10" height="40" fill="#f47e60">
        <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.4"
        />
      </rect>
      <rect x="55" y="30" width="10" height="40" fill="#f8b26a">
        <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.2"
        />
      </rect>
      <rect x="75" y="30" width="10" height="40" fill="#abbd81">
        <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-1"
        />
      </rect>
    </svg>);
}

export default Loader;
