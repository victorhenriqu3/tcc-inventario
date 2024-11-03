import { Select, SelectProps } from '@chakra-ui/react';
import { Container, Error } from '../Input/styles';
import React from 'react';

export interface SelectInputProps extends SelectProps {
  id?: string;
  label: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(function Input(props, ref) {
  //debugger;
  const { label, error, onChange, id } = props;

  return (
    <>
      <Container className={error ? 'invalid' : void 0}>
        <Select
          id={id}
          placeholder={label}
          border={`1px solid ${error ? '#da5656' : '#cbdbff'} `}
          borderRadius="10px"
          onChange={onChange}
        >
          {props.options?.map((item) => (
            <option value={item.value} key={`option-${item.value}`}>
              {item.label}
            </option>
          ))}
        </Select>
      </Container>

      {error ? <Error>{error}</Error> : null}
    </>
  );
});

export default SelectInput;
