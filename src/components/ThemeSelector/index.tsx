import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTheme } from "../../hooks";
import { useAppSelector } from "../../hook";
import { changeTheme } from "../../store/themeSlice";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme);

  useTheme();

  return (
    <FormControl display="flex" alignItems="center" marginBottom={5}>
      <FormLabel htmlFor="theme" mb="0">
        Theme: {theme}
      </FormLabel>
      <Switch id="theme" onChange={() => dispatch(changeTheme())} />
    </FormControl>
  );
};

export default ThemeSelector;
