import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ScrollToTop: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
