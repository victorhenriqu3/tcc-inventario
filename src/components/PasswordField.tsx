import { FormControl, FormLabel, IconButton, Input, InputProps, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from "@chakra-ui/react"
import { forwardRef, useRef } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/Bs'

export const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (<FormControl><FormLabel htmlFor="password">Senha</FormLabel><InputGroup>
    <InputRightElement>
      <IconButton
        variant="link"
        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
        icon={isOpen ? <BsEyeSlash /> : <BsEye />}
        onClick={onClickReveal}
      />
    </InputRightElement>
    <Input
      id="password"
      ref={mergeRef}
      name="password"
      type={isOpen ? 'text' : 'password'}
      autoComplete="current-password"
      required
      {...props}
    />
  </InputGroup></FormControl>)
})
