/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react-icons/ri' {
  import { IconType } from 'react-icons';
  
  export const RiDashboardLine: IconType;
  export const RiCalendarLine: IconType;
  export const RiTeamLine: IconType;
  export const RiTaskLine: IconType;
  export const RiSettings4Line: IconType;
  export const RiNotification3Line: IconType;
  export const RiSearchLine: IconType;
  export const RiQuestionLine: IconType;
  export const RiArrowRightLine: IconType;
  export const RiFileTextLine: IconType;
  export const RiTimeLine: IconType;
  export const RiCheckboxCircleLine: IconType;
  export const RiChat3Line: IconType;
}

declare module 'next/link' {
  import React from 'react';
  
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children: React.ReactNode;
  }
  
  export default function Link(props: LinkProps): JSX.Element;
}
