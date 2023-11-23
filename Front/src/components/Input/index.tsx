import React from "react";
import { BaseInput, Container, Error, Label } from "./styles";


export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const { label, error, id, multiline, className, ...rest } =
    props;

  const finalId = React.useMemo(() => {
    if (id) return id;
    return `input-${Math.round(Math.random() * 100000)}-${Date.now()}`;
  }, [id]);

  return (
    <>
      <Container className={error ? 'invalid' : void 0}>
        <BaseInput
          placeholder={label}
          {...rest}
          as={multiline ? 'textarea' : 'input'}
          className={className}
          id={finalId}
          ref={ref}
        />
        <Label htmlFor={finalId}>{label}</Label>
      </Container>
      {error ? <Error>{error}</Error> : null}
    </>
  );
});

export default Input;