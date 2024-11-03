import { Select, SelectProps } from '@chakra-ui/react';
import useEvents from '../../hooks/useEvents';
import { Container, Error } from '../Input/styles';

export interface SelectEventsProps extends SelectProps {
  id?: string;
  label: string;
  error?: string;
}

export const SelectEvents = (props: SelectEventsProps) => {
  const { events } = useEvents();
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
          {events?.map((item) => (
            <option value={item.id} key={`option-${item.name}`}>
              {item.name}
            </option>
          ))}
        </Select>
      </Container>

      {error ? <Error>{error}</Error> : null}
    </>
  );
};

export default SelectEvents;
