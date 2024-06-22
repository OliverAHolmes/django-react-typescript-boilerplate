import * as React from 'react';

import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import useUserSettingsStore from '../store/useUserSettingsStore';

interface ToggleColorModeProps {
  mode: PaletteMode;
  color: "primary" | "inherit" | "default";
}

export default function ToggleColorMode({
  mode,
  color = 'primary',
}: ToggleColorModeProps) {
  const { colorMode, updateColorMode } = useUserSettingsStore();

  const toggleColorMode = () => {
    updateColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  return (
    <IconButton
      onClick={toggleColorMode}
      color={color}
      aria-label="Theme toggle button"
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}
