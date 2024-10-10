import * as React from 'react';
import MaskedInput, { MaskedInputProps } from '../MaskedInput';

type CPFInputProps = Omit<MaskedInputProps, 'mask' | 'inputRef'>;

const CPFInput = React.forwardRef(function CPFInput(props: CPFInputProps, ref) {
  return <MaskedInput mask="***.000.000-**" inputRef={ref} {...props} />;
});

export default CPFInput;
