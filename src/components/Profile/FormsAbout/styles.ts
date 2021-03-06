import styled from "styled-components";

export const Stl = {
  AboutArea: styled.textarea`
    width: 100%;
    height: 110px;
    resize: none;
    border-radius: 4px;
    background-color: #eff1f3;
    padding: 14px 16px;
    font-size: 14px;
    line-height: 1.13;
    font-weight: 400;
    color: #667784;
    border: 1px solid transparent;
    margin: 0 0 10px 0;
    transition: 0.2s ease all;
    :focus {
      background-color: #fff;
      border: 1px solid #48bbff;
    }
  `,
  Label: styled.label<{ isFocused: boolean; hasValue: boolean }>`
    visibility: visible;
    color: "#667784";
    font-weight: 400;
    z-index: 100;
    left: 10px;
    pointer-events: none;
    position: absolute;
    transition: 0.2s ease all;
    top: ${(props) => (props.isFocused ? `5px` : `10px`)};
    font-size: ${(props) => (props.isFocused ? `0.8rem` : `1.3rem`)};
    ${(props) => props.hasValue && !props.isFocused && `visibility: hidden;`}
  `,
  WarningText: styled.p`
    color: #f05f62;
    font-size: 1.6rem;
  `,
};
