import * as React from 'react';
import MaskedInput, { MaskedInputProps } from '../MaskedInput';

type PhoneInputProps = Omit<MaskedInputProps, 'mask' | 'inputRef'>;

const PhoneInput = React.forwardRef(function PhoneInput(props: PhoneInputProps, ref) {
  return <MaskedInput mask="(00) 0 0000-0000" inputRef={ref} {...props} />;
});

export default PhoneInput;
