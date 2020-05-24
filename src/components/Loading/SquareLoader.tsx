import { useTheme } from 'styled-components';

export default function SquareLoader() {
  const { colors } = useTheme();

  const fill = colors.neutralDarker;

  const duration = '1300ms';
  const offsetMs = -150;

  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 90 90"
      preserveAspectRatio="xMidYMid"
      shapeRendering="crispEdges"
    >
      <g transform="translate(20 20)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 4}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(50 20)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 3}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(80 20)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 2}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(20 50)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 3}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(50 50)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 2}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(80 50)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 1}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(20 80)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 2}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(50 80)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin={`${offsetMs * 1}ms`}
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(80 80)">
        <rect x="-15" y="-15" width="30" height="30" fill={fill} transform="scale(1 1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            repeatCount="indefinite"
            calcMode="spline"
            dur={duration}
            values="1;1;0;1;1"
            keyTimes="0;0.2;0.5;0.8;1"
            keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5"
            begin="0s"
          ></animateTransform>
        </rect>
      </g>
    </svg>
  );
}
