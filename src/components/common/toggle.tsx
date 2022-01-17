import React from 'react'
import styled from "styled-components"
import {GlobalStyle} from "../../theme"

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${({ theme }: GlobalStyle) => theme.background};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

interface ToggleProps{
  value: boolean;
  toggle: Function
}

const Toggle: React.FC <ToggleProps> = ({ value, toggle }) => {
    return (
      <CheckBoxWrapper 
        data-test="toggle-component" >
        <CheckBox 
          id="checkbox" 
          type="checkbox" 
          checked={value}
          onChange={()=> toggle()}
          data-test="toggle-input"/>
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    );
};

export default Toggle;
