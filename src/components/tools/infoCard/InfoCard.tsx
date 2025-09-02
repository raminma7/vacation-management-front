import React from "react";

import HeaderText from "@tools/headerText/HeaderText";

import "./infoCard.css";

interface IInfoCard {
  title?: string;
  subTitle?: string;
  className?: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<IInfoCard> = ({
  children,
  title,
  subTitle,
  className,
}) => {
  return (
    <div className={`info-card ${className}`}>
      {title && <HeaderText title={title} subTitle={subTitle ?? ""} />}
      {children}
    </div>
  );
};

export default InfoCard;
