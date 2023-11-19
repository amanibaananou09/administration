import { RenderThumbProps, RenderTrackProps } from "common/react-props";
import React from "react";

export const renderTrack = ({ style, ...props }: RenderTrackProps) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    maxWidth: "100%",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const renderThumbDark = ({ style, ...props }: RenderThumbProps) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const renderThumbLight = ({ style, ...props }: RenderThumbProps) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const renderView = ({ style, ...props }: RenderThumbProps) => {
  const viewStyle: React.CSSProperties = {
    marginRight: -22,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

export const kanbanRenderTrack = ({ style, ...props }: RenderTrackProps) => {
  const trackStyle: React.CSSProperties = {
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const kanbanRenderThumbDark = ({
  style,
  ...props
}: RenderThumbProps) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const kanbanRenderThumbLight = ({
  style,
  ...props
}: RenderThumbProps) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const kanbanRenderView = ({ style, ...props }: RenderThumbProps) => {
  const viewStyle: React.CSSProperties = {
    position: "relative",
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};
