import Icon from "@tools/icon/Icon";

import "./logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <Icon name="calendar" color="#3C83F6" size={27} />
      <span>VacationFlow</span>
    </div>
  );
};

export default Logo;
