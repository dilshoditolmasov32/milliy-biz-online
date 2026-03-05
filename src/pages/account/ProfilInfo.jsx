import { useTranslation } from "react-i18next";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useUserProfile } from "../../hooks/useUserProfile";

import userAboutIcon from "../../assets/img/user-about.svg";
import locationIcon from "../../assets/img/location.svg";
import { useState } from "react";
import { uzbekistanRegions } from "../../data/uzbekistanRegions";

function ProfileInfo() {
  const { t } = useTranslation();
  const { user, loading, error } = useUserProfile();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const currentRegion = uzbekistanRegions.find(
    (region) => region.key === selectedRegion,
  );
  if (loading) return <p>{t("loading")}...</p>;
  if (error) return <p>{t("errorOccurred")}</p>;

  const currentPhone = String(user.phone).slice(3);

  return (
    <div className="profile-info">
      <div className="profile-card">
        <div className="profile-card__header">
          <img src={userAboutIcon} alt={t("profile.userIcon")} />
          <h2 className="profile-card__title">{t("personalInfo")}</h2>
        </div>

        <div className="profile-card__grid profile-card__grid--two">
          <div className="profile-field">
            <label>{t("fullName")}</label>
            <input
              className="profile-input"
              value={user?.name || ""}
              readOnly
            />
          </div>

          <div className="profile-field profile-field--phone">
            <div className="label-title">
              <div>{t("phone")}</div>
              <div className="profile-field__helper">{t("phoneVerified")}</div>
            </div>

            <div className="phone-wrapper">
              <span className="phone-code">+998</span>
              <input
                className="input-phone"
                value={currentPhone || ""}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card__header">
          <img src={locationIcon} alt={t("locationIcon")} />
          <h2 className="profile-card__title">{t("address")}</h2>
        </div>

        <div className="profile-card__grid profile-card__grid--two">
          <div className="profile-field">
            <label>{t("region")}</label>
            <Select
              sx={{
                fontFamily: "Neometric, sans-serif",
                paddingY: "10px",
                paddingX: "20px",
                background: "#f5f5f7",
                borderRadius: "12px",
                lineHeight: "24px",
                border: "1px solid #c5c5c5",
                "& .MuiSelect-placeholder": {
                  color: "#000",
                },
                "& .MuiOption-root": {
                  fontFamily: "Neometric, sans-serif",
                  paddingY: "10px",
                  paddingX: "20px",
                  background: "#f5f5f7",
                  background: "#f5f5f7",
                  borderRadius: "12px",
                  lineHeight: "24px",
                  border: "1px solid #c5c5c5",
                },
              }}
              placeholder="Viloyat tanlang"
              value={selectedRegion}
              onChange={(e, newValue) => {
                setSelectedRegion(newValue);
                setSelectedDistrict(null);
              }}
              indicator={<KeyboardArrowDown />}
            >
              {uzbekistanRegions.map((region) => (
                <Option
                  key={region.id}
                  value={region.key}
                  sx={{
                    fontFamily: "Neometric, sans-serif",
                  }}
                >
                  {t(`regions.${region.key}`)}
                </Option>
              ))}
            </Select>
          </div>

          <div className="profile-field">
            <label>{t("district")}</label>
            <Select
              placeholder={
                selectedRegion ? "Tuman tanlang" : "Avval viloyat tanlang"
              }
              sx={{
                fontFamily: "Neometric, sans-serif",
                paddingY: "10px",
                paddingX: "20px",
                background: "#f5f5f7",
                borderRadius: "12px",
                lineHeight: "24px",
                border: "1px solid #c5c5c5",
                "& .MuiSelect-placeholder": {
                  color: "red",
                },
                "& .MuiOption-root": {
                  fontFamily: "Neometric, sans-serif",
                  paddingY: "10px",
                  paddingX: "20px",
                  background: "#f5f5f7",
                  borderRadius: "12px",
                  lineHeight: "24px",
                  border: "1px solid #c5c5c5",
                },
              }}
              value={selectedDistrict}
              onChange={(e, newValue) => setSelectedDistrict(newValue)}
              disabled={!selectedRegion}
              indicator={<KeyboardArrowDown />}
            >
              {currentRegion?.districts.map((district) => (
                <Option
                  key={district}
                  value={district}
                  sx={{
                    fontFamily: "Neometric, sans-serif",
                  }}
                >
                  {t(`districts.${district}`)}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
