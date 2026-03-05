import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AcountInput from "../components/inputs/AcountInput";
import { loginCustomer } from "../service/customer.service";


export default function Login({ title, setCurrent, setBack, phone, setPhone }) {
  const { t } = useTranslation();
  useEffect(() => {
    setBack(false);
    title(t("enterPhoneNumber"));
  }, [setBack, title, t]);

  const handleRegister = useCallback(async () => {
    try {
      let cleanPhone = phone?.replace(/\s/g, "").replace(/^\+/, "");
      
      
      
      if (!cleanPhone) return;
      await loginCustomer({ phone: cleanPhone });

    
      setPhone(cleanPhone);
      setCurrent("code");
    } catch (error) {
      console.error("Send code error:", error);

      const message =
        error.response?.data?.error || t("somethingWentWrong");

    }
  }, [phone, setPhone, setCurrent, t]);

  const isDisabled =
    !phone || phone.replace(/\D/g, "").length < 12;

  return (
    <div className="create__wrap">
      <div className="create__input">
        <p className="create__input-text">
          {t("tel")} <span>{t("codeSendViaTgBot")}</span>
        </p>

        <AcountInput
          phone={phone}
          setPhone={setPhone}
          title={title}
          setBack={setBack}
          mode="login"
        />
      </div>

      <button
        className="create__btn"
        onClick={handleRegister}
        disabled={isDisabled}
      >
        {t("login")}
      </button>

      <p className="create__text">
        {t("haveAcc")}{" "}
        <span className="create__link" onClick={() => setCurrent("create")}>
          {t("createAcc")}
        </span>
      </p>
    </div>
  );
}