import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import OakButton from '../../oakui/wc/OakButton';
import OakInput from '../../oakui/wc/OakInput';
import OakForm from '../../oakui/wc/OakForm';
import OakSelect from '../../oakui/wc/OakSelect';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';
import OakTypography from '../../oakui/wc/OakTypography';
import OakSection from '../../oakui/wc/OakSection';
import { computePalette, getGreyShades } from './service';

interface Props {
  match: any;
  history: any;
}

const darkModeVariants = {
  // global: '141b2d',
  // container: '1f2940',
  // surface: '2b3858',
  // float: '36466D',
  global: '18191a',
  container: '242526',
  surface: '303031',
  float: '454546',
};

const lightModeVariants = {
  global: 'f0f2f5',
  container: 'ffffff',
  surface: 'e4e6eb',
  float: 'd8dadf',
};

const ColorPaletteGenerator = (props: Props) => {
  const [state, setState] = useState({
    global: '141b2d',
    container: '1f2940',
    surface: '2b3858',
    float: '36466D',
    // primary: '4b8ca6',
    primary: '01a982',
    secondary: 'd9ae5f',
    tertiary: '3abead',
    default: 'cdd1d6',
    info: '434f61',
    danger: 'db504a',
    warning: 'ff6f59',
    success: '4cceac',
    mode: 'Dark',
  });
  const [colorThemes, setColorThemes] = useState<
    { key: string; value: string }[]
  >([]);

  const [greySchemes, setGreySchemes] = useState<
    { key: string; value: string }[]
  >([]);

  const submit = (event: any) => {
    // event.preventDefault();
    computeColorThemes();
    computeGreySchemes();
  };

  const computeGreySchemes = () => {
    let _greySchemes: { key: string; value: string }[] = [];
    _greySchemes = _greySchemes.concat(getGreyShades(state.mode === 'Dark'));

    setGreySchemes(_greySchemes);
  };

  const computeColorThemes = () => {
    let _colorThemes: { key: string; value: string }[] = [];
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'global', state.global)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'container', state.container)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'surface', state.surface)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'float', state.float)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'primary', state.primary)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'secondary', state.secondary)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'tertiary', state.tertiary)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'default', state.default)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'info', state.info)
    );
    _colorThemes = _colorThemes.concat(
      state.mode === 'Dark'
        ? computePalette(false, 'invert', 'fcfcfc')
        : computePalette(true, 'invert', '0c0c0c')
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'danger', state.danger)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'warning', state.warning)
    );
    _colorThemes = _colorThemes.concat(
      computePalette(state.mode === 'Dark', 'success', state.success)
    );
    setColorThemes(_colorThemes);
  };

  const handleChange = (detail: any) => {
    if (detail.name === 'mode') {
      setState({
        ...state,
        ...(detail.value === 'Dark' ? darkModeVariants : lightModeVariants),
        [detail.name]: detail.value,
      });
    } else {
      setState({ ...state, [detail.name]: detail.value });
    }
  };

  return (
    <>
      <OakTypography variant="h3">Color palette generator</OakTypography>
      <OakTypography variant="subtitle2">
        Generate the css variables necessary to configure the color scheme in
        your project
      </OakTypography>
      <br />
      <OakForm
        formGroupName="color-palette-generator-form"
        handleSubmit={submit}
      >
        <div className="color-palette-generator__form">
          <OakSelect
            label="Color mode"
            name="mode"
            value={state.mode}
            placeholder="Choose between light and dark modes"
            handleChange={handleChange}
            options={['Dark', 'Light']}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Global color"
            name="global"
            value={state.global}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Container color"
            name="container"
            value={state.container}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Surface color"
            name="surface"
            value={state.surface}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Float color"
            name="float"
            value={state.float}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Primary color"
            name="primary"
            value={state.primary}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Secondary color"
            name="secondary"
            value={state.secondary}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Tertiary color"
            name="tertiary"
            value={state.tertiary}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Default color"
            name="default"
            value={state.default}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Info color"
            name="info"
            value={state.info}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Danger color"
            name="danger"
            value={state.danger}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Warning color"
            name="warning"
            value={state.warning}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
          <OakInput
            label="Success color"
            name="success"
            value={state.success}
            placeholder="Hex code"
            handleChange={handleChange}
            formGroupName="color-palette-generator-form"
          />
        </div>
        <OakFormActionsContainer align="left">
          <OakButton
            theme="primary"
            variant="appear"
            type="submit"
            formGroupName="color-palette-generator-form"
          >
            Generate
          </OakButton>
        </OakFormActionsContainer>
      </OakForm>
      <br />
      <OakTypography variant="caption">
        Copy below variables into your theme.css file
      </OakTypography>
      <OakSection
        fillType="none"
        variant="outlined"
        paddingHorizontal={4}
        paddingVertical={4}
        rounded
      >
        <OakTypography variant="body2">
          <div className="color-palette-generator--output">
            <div>
              <div>
                {`// Grey color schemes for background and foreground text` +
                  ''}
              </div>
              {greySchemes.map((item, i) => (
                <div key={item.key || i}>{`${item.key}: ${item.value};`}</div>
              ))}
            </div>
            <div>
              <div>{`// Variables that control the theme colors` + ''}</div>
              {colorThemes.map((item, i) => (
                <div key={item.key || i}>{`${item.key}: ${item.value};`}</div>
              ))}
            </div>
          </div>
        </OakTypography>
      </OakSection>
    </>
  );
};

export default ColorPaletteGenerator;
