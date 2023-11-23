import * as React from 'react';
import MaskedInput, { MaskedInputProps } from '../MaskedInput';


type RegisterInputProps = Omit<MaskedInputProps, 'mask'>;

const RegisterInput = React.forwardRef(function RegisterInput(
  props: RegisterInputProps,
  ref
) {

  return <MaskedInput mask="0000000000000-0" inputRef={ref} {...props} />;
});

export default RegisterInput;
