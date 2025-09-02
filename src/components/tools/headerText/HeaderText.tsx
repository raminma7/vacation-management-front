import "./headerText.css";

interface IHeaderText {
  title: string;
  subTitle?: string;
}

const HeaderText: React.FC<IHeaderText> = ({ title, subTitle }) => {
  return (
    <div className="header-text">
      <div className="header-text_title">{title}</div>
      <div className="header-text_sub-title">{subTitle}</div>
    </div>
  );
};

export default HeaderText;
