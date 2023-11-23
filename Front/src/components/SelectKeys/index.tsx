
import { Select, SelectProps } from "@chakra-ui/react";
import useKeys from "../../hooks/useKeys";
import { Container, Error } from "../Input/styles";

export interface SelectKeysProps extends SelectProps {
  id?: string
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const SelectKeys = (
  props: SelectKeysProps
) => {

  const { keys } = useKeys();
  const { label, error, onChange } = props


  return (
    <>
      <Container className={error ? 'invalid' : void 0}>
        <Select
          placeholder={label}
          border={`1px solid ${error ? "#da5656" : "#cbdbff"} `}
          borderRadius="10px"
          onChange={onChange}

        >
          {keys?.map(item => <option value={item.id} key={`option-${item.name}`}>{item.name}</option>)}

        </Select >
      </Container >


      {error ? <Error>{error}</Error> : null
      }
    </>
  );
};

export default SelectKeys;