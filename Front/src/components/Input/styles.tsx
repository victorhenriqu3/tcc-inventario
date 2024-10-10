import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 8px 0;
`;

export const BaseInput = styled.input`
  display: block;
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbdbff;
  border-radius: 10px;
  padding: 21px 5px 8px 14px;
  margin: 8px 0;
  resize: none;

  &.with-right-icon {
    padding-right: 45px;
  }
  &:active,
  &:not(:placeholder-shown) {
    outline: none;
  }

  &,
  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
  }
  &::placeholder {
    opacity: 0;
    color: transparent;
    transition: all 0.25s ease-in-out;
  }
  &:focus::placeholder {
    color: rgba(#f1f2f6, 0.4);
    opacity: 1;
  }

  &:disabled {
    background: #f1f2f6;
    border-color: #d0d3dd;
    &,
    &::placeholder,
    & + label {
      color: '#afafaf';
    }
  }

  ${Container}.invalid & {
    border-color: #da5656;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 16px;
  left: 14px;
  color: '#3A3C3C';

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 12px;

  ${BaseInput}:required:invalid + &:after {
    content: '*';
  }

  transition: all 0.25s ease-in-out;

  ${BaseInput}:focus + &,
  ${BaseInput}:not(:placeholder-shown) + & {
    top: 8px;
    left: 15px;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
  }
`;

export const Error = styled.div`
  ${Container}.invalid + & {
    color: #da5656;
  }
  padding-bottom: 4px;
  padding-left: 4px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  svg {
    font-size: 15px;
    margin-right: 4px;
  }
`;
