import {
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'

  export interface PasswordStringInterface{
      name?: string;
      id?: string;
      inputProps?: InputProps;
  }

  export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
  
    const onClickReveal = () => {
      onToggle()
      const input = inputRef.current
      if (input) {
        input.focus({ preventScroll: true })
        const length = input.value.length * 2
        requestAnimationFrame(() => {
          input.setSelectionRange(length, length)
        })
      }
    }
  
    return (
        <InputGroup>
          <InputRightElement>
            <IconButton
              bg="transparent !important"
              variant="ghost"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            {...props}
            ref={mergeRef}
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
          />
        </InputGroup>
    )
  })
  
export default PasswordInput;