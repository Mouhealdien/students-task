import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../lib/redux/features/languageSlice";
import { FormControl, MenuItem, Select, Stack } from "@mui/material";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const cultureCode = useSelector((state) => state.language.cultureCode);

  const handleLanguageChange = (event) => {
    const selectedCultureCode = event.target.value;
    dispatch(setLanguage(Number(selectedCultureCode)));
  };

  return (
    <FormControl variant="outlined">
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"start"}
        gap={2}
      >
        <Select
          value={cultureCode}
          sx={{
            paddingY: 0,
            height: 25,
            bgcolor: "white",
            border: "1 solid black",
          }}
          onChange={handleLanguageChange}
        >
          <MenuItem value={0}>English</MenuItem>
          <MenuItem value={1}>Arabic</MenuItem>
        </Select>
      </Stack>
    </FormControl>
  );
};

export default LanguageSelector;
