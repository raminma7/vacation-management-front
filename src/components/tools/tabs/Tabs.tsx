import React from "react";

import classNames from "classnames";

import "./tabs.css";

export type TTab = { text: string; onClick: () => void };

interface ITabs {
  tabs: TTab[];
  activeTab: string;
}

const Tabs: React.FC<ITabs> = ({ tabs, activeTab }) => {
  return (
    <div className="tabs">
      {tabs.map((tab: TTab, index: number) => (
        <div
         key={`tab-${index}`}
          className={classNames("tabs_tab", {
            active: activeTab === tab.text,
          })}
          onClick={() => tab.onClick()}
        >
          {tab.text}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
