import * as React from 'react';

import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  color: "primary" | "inherit" | "default";
}

export default function ToggleColorMode({
  mode,
  toggleColorMode,
  color = 'primary',
}: ToggleColorModeProps) {
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
