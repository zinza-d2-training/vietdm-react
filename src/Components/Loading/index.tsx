import React from 'react';
import { RootState } from '../../Store';
import '../../Assets/scss/loading.scss';
import { useAppSelector } from '../../Store/HookStore';

function Loading() {
  const loadingActive = useAppSelector((state: RootState) => state.loading.active);

  const responseHtml = () => {
    return (
      <div id="loading_screen">
        <svg
          width="80px"
          height="80px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="lds-ripple">
          <circle cx="50" cy="50" r="14.0334" fill="none" stroke="#c0f6d2" strokeWidth="6">
            <animate
              attributeName="r"
              calcMode="spline"
              values="0;40"
              keyTimes="0;1"
              dur="1"
              keySplines="0 0.2 0.8 1"
              begin="-0.5s"
              repeatCount="indefinite"></animate>
            <animate
              attributeName="opacity"
              calcMode="spline"
              values="1;0"
              keyTimes="0;1"
              dur="1"
              keySplines="0.2 0 0.8 1"
              begin="-0.5s"
              repeatCount="indefinite"></animate>
          </circle>
          <circle cx="50" cy="50" r="33.5671" fill="none" stroke="#ff7c81" strokeWidth="6">
            <animate
              attributeName="r"
              calcMode="spline"
              values="0;40"
              keyTimes="0;1"
              dur="1"
              keySplines="0 0.2 0.8 1"
              begin="0s"
              repeatCount="indefinite"></animate>
            <animate
              attributeName="opacity"
              calcMode="spline"
              values="1;0"
              keyTimes="0;1"
              dur="1"
              keySplines="0.2 0 0.8 1"
              begin="0s"
              repeatCount="indefinite"></animate>
          </circle>
        </svg>
      </div>
    );
  };

  return <div>{loadingActive ? responseHtml() : ''}</div>;
}

export default Loading;
