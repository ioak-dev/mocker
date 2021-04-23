/* eslint-disable import/prefer-default-export */

const tinycolor = require('tinycolor2');

const DARK_LIGHT_BY = 4;
const DARKER_LIGHTER_BY = 8;
const LIGHT = '#fcfcfc';
const DARK = '#0f0f0f';

export const computePalette = (
  isDarkMode: boolean,
  themeName: string,
  base: string
): { key: string; value: string }[] => {
  let output: { key: string; value: string }[] = [];
  if (base) {
    output = output.concat(
      getColorPair(`--color-${themeName}`, tinycolor(base))
    );
    if (isDarkMode) {
      output = output.concat(
        getColorPair(
          `--color-${themeName}-darker`,
          tinycolor(base).lighten(DARKER_LIGHTER_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-lighter`,
          tinycolor(base).darken(DARKER_LIGHTER_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-dark`,
          tinycolor(base).lighten(DARK_LIGHT_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-light`,
          tinycolor(base).darken(DARK_LIGHT_BY),
          tinycolor(base)
        )
      );
    } else {
      output = output.concat(
        getColorPair(
          `--color-${themeName}-darker`,
          tinycolor(base).darken(DARKER_LIGHTER_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-lighter`,
          tinycolor(base).lighten(DARKER_LIGHTER_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-dark`,
          tinycolor(base).darken(DARK_LIGHT_BY),
          tinycolor(base)
        )
      );
      output = output.concat(
        getColorPair(
          `--color-${themeName}-light`,
          tinycolor(base).lighten(DARK_LIGHT_BY),
          tinycolor(base)
        )
      );
    }
  }
  output = output.concat(
    getColorPair(
      `--color-${themeName}-transparent`,
      tinycolor(base).setAlpha(0.1),
      tinycolor(base)
    )
  );
  output = output.concat(
    getColorPair(
      `--color-${themeName}-semitransparent1`,
      tinycolor(base).setAlpha(0.2),
      tinycolor(base)
    )
  );
  output = output.concat(
    getColorPair(
      `--color-${themeName}-semitransparent2`,
      tinycolor(base).setAlpha(0.5),
      tinycolor(base)
    )
  );
  return output;
};

const getColorPair = (
  baseName: string,
  baseValue: any,
  commonRoot?: any
): { key: string; value: string }[] => {
  return [
    { key: baseName, value: baseValue },
    {
      key: `${baseName}-i`,
      value: (commonRoot || baseValue).isLight() ? DARK : LIGHT,
    },
  ];
};

export const getGreyShades = (
  isDarkMode: boolean
): { key: string; value: string }[] => {
  if (isDarkMode) {
    return [
      {
        key: '--color-1',
        value: '#ffffff',
      },
      {
        key: '--color-2',
        value: '#ffffff',
      },
      {
        key: '--color-3',
        value: '#ffffff',
      },
    ];
  }
  return [
    {
      key: '--color-1',
      value: '#202225',
    },
    {
      key: '--color-2',
      value: '#202225',
    },
    {
      key: '--color-3',
      value: '#202225',
    },
  ];
};
