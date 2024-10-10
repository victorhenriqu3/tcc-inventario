import { Select, SelectProps } from '@chakra-ui/react';
import { Container, Error } from '../Input/styles';

export interface SelectInputProps extends SelectProps {
  id?: string;
  label: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const SelectInput = (props: SelectInputProps) => {
  //debugger;
  const { label, error, onChange } = props;

  return (
    <>
      <Container className={error ? 'invalid' : void 0}>
        <Select
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
};

export default SelectInput;
