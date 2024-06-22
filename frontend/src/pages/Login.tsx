import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import ToggleColorMode from "../components/ToggleColorMode";
import SignInCard from "../components/SignInCard";

import useUserSettingsStore from "../store/useUserSettingsStore";

export const Login = () => {
  const { colorMode } = useUserSettingsStore();
  const [mode, setMode] = React.useState<PaletteMode>(colorMode);
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    setMode(colorMode);
  }, [colorMode]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "space-between",
            backgroundImage: `url(./imgs/dji1597228533204.jpg)`,
          },
          () => ({
            backgroundSize: "cover",
            height: { xs: "auto", md: "100dvh" },
            pb: { xs: 12, sm: 0 },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "flex-end",
            gap: { xs: 6, sm: 12 },
            height: { xs: "100%", md: "100dvh" },
            p: 2,
            pr: { xs: 0, md: 18 },
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              position: { sm: "static", md: "fixed" },
              width: "100%",
              p: { xs: 2, sm: 4 },
            }}
          >
            <ToggleColorMode mode={mode} color="primary" />
          </Stack>
          <SignInCard />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};
