import React, { useEffect } from "react";
import {  ThemeProvider } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../App.css";
import { createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const themeNew = createTheme({
  palette: {
    primary: {
      light: "#000",
      main: "#3a73c2",
      dark: "#000",
      contrastText: "#fff",
    },
   
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const {t} = useTranslation()
  const option = props.options;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    props.selectChange(
      typeof value === "string" ? value.split(",") : value,
      props.selectType
    );
  };

  useEffect(() => {
    if (props.clearSelect) {
      setPersonName([]);
    }
  }, [props.clearSelect, props.selectType, props.selectChange]);
  return (
    <ThemeProvider theme={themeNew}>
      <FormControl sx={{ m: 1, width: 190 }}>
        <InputLabel id="demo-multiple-name-label">
          {t(props.selectType)}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          className="multiple-select"
          onChange={handleChange}
          input={<OutlinedInput label={t(props.selectType)} />}
          MenuProps={MenuProps}
          sx={{
            width: "100%",
            height: "50px",
            color: themeNew.palette.primary.main,
          }}
        >
          {option.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, themeNew)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
