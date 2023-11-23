import { IMaskMixin } from 'react-imask';
import Input, { InputProps } from '../Input';

export type MaskedInputProps = Omit<InputProps, 'onChange'> & any;

const MaskedInput = IMaskMixin((props: MaskedInputProps) => {
  const { inputRef, ...rest } = props;
  return <Input {...rest} ref={inputRef} />;
});

export default MaskedInput;
