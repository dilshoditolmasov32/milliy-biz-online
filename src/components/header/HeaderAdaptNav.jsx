import ChooseLang from "../tools/ChooseLangLight.jsx";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Accordion,
  Typography,
  Checkbox,
  AccordionSummary,
  Skeleton,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useCategories from "../../hooks/useCategories";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { MdOutlineCheck } from "react-icons/md";

export default function HeaderAdaptNav({ onClose }) {
  const { categories, isLoading } = useCategories();
  const { t, i18n } = useTranslation();

  const [checkedItems, setCheckedItems] = useState({});
  const contentRef = useRef(null);

  const theme = createTheme({
    typography: { fontFamily: "Neometric" },
  });

  const getNameByLang = (category) => {
    if (!category.translations) return category.name;
    return i18n.language === "ru"
      ? category.translations[0]?.name
      : category.translations[2]?.name;
  };

  return (
    <div className="header-adapt-nav">
      <ThemeProvider theme={theme}>
        <div
          style={{
            flex: 1,
            padding: "10px",
          }}
          ref={contentRef}
        >
          <h2
            style={{
              marginBottom: "30px",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            {t("categories")}
          </h2>

          {isLoading ? (
            <Stack spacing={2} sx={{ width: "100%" }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      animation="wave"
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            categories?.map((category) => (
              <Accordion
                key={category.id}
                disableGutters
                square
                elevation={0}
                sx={accordionSx}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ padding: 0 }}
                >
                  <Typography component="span" sx={typographySx}>
                    {getNameByLang(category)}
                  </Typography>
                </AccordionSummary>

                {category?.translations?.map((el) => (
                  <div className="subcategory-list" key={el.id}>
                    <p onClick={onClose}>{el.name}</p>
                    <div className="custom-checkbox-icon">
                      <MdOutlineCheck />
                    </div>
                  </div>
                ))}
              </Accordion>
            ))
          )}
        </div>
      </ThemeProvider>

      <div className="headerAdaptive-catalog">
        <div className="footer__titles-media">
          <a
            data-social="Instagram"
            style={{ background: "#10355B" }}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram color="#fff" size={20} />
          </a>
          <a
            data-social="Facebook"
            style={{ background: "#10355B" }}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF color="#fff" size={18} />
          </a>
          <a
            data-social="Telegram"
            style={{ background: "#10355B" }}
            href="https://t.me/@fromMrX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane color="#fff" size={18} />
          </a>
          <a
            data-social="Youtube"
            style={{ background: "#10355B" }}
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillYoutube color="#fff" size={20} />
          </a>
        </div>
        <ChooseLang />
      </div>
    </div>
  );
}

const accordionSx = {
  background: "none",
  border: "none",
  boxShadow: "none",
  width: "100%",
  "&::before": { display: "none" },
  overflowY: "auto",
};

const typographySx = {
  color: "#000",
  fontSize: { md: "18px", xl: "12px" },
  ".Mui-expanded &": { color: "#000000" },
};
