import styled from 'styled-components';

const Form = styled.form`
  * {
    box-sizing: border-box;
  }
  input,
  textarea {
    display: block;
    border-color: ${(props) => props.theme.orbit.borderColorInput};
    border-radius: ${(props) => props.theme.orbit.borderRadiusNormal};
    border-style: solid;
    border-width: ${(props) => props.theme.orbit.borderWidthInput};
    font-size: ${(props) => props.theme.orbit.fontSizeInputNormal};
    color: ${(props) => props.theme.orbit.colorTextInput};
    padding: ${(props) => props.theme.orbit.paddingInputNormal};
    width: 100%;
    outline: none;
  }
  textarea {
    padding: ${(props) => props.theme.orbit.paddingTextareaNormal};
    line-height: ${(props) => props.theme.orbit.lineHeightText};
  }
  input:not([aria-autocomplete='list']) {
    height: ${(props) => props.theme.orbit.heightInputNormal};
  }
  input:focus,
  textarea:focus {
    border-width: ${(props) => props.theme.orbit.borderWidthInputFocus};
    border-color: ${(props) => props.theme.orbit.borderColorInputFocus};
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default Form;
