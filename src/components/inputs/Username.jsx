import { useTranslation } from "react-i18next";

const Username = ({ fullName, setFullName }) => {
  const { t } = useTranslation();
  const handleChange = (e) => {
   let value = e.target.value;

  value = value.replace(/^\s+/, "");

  value = value.replace(/[^\p{L}\s]/gu, "");

  setFullName(value);
  };

  return (
    <div className="username_input">
      <label>{t("fullNameLabel")}</label>
      <input
        type="text"
        placeholder={t("fullNamePlaceholder")}
        className="username-input"
        value={fullName}
        onChange={handleChange}
      />
    </div>
  );
};

export default Username;
