import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import React from 'react'
import { FieldError, MeDocument, MeQuery, useRegisterMutation } from '../../generated/types';
import { toErrorMap } from '../../utils/ErrorHandler';
import { checkEmail, checkPassword, checkUsername, verifyEmail, verifyPassword, verifyUsername } from '../../utils/UserVerify';
import PasswordInput from '../global/format/inputs/PasswordInput';

interface RegisterFormProps {

}



export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
    const [register] = useRegisterMutation();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                username: ""
            }}
            onSubmit={ async (values, actions) => { 
                const response = await register({
                    variables: values,
                    update: (cache, {data}) => {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                __typename: "Query",
                                me: data?.register.user // Only if it returns an user
                            }
                        });
                        cache.evict({fieldName: "groups:{}"});
                    }
                });
                if(response.data?.register.errors){
                    actions.setErrors(toErrorMap(response.data.register.errors));
                }
            }}
        >
        {({isSubmitting}) =>(
            <Form>
                <Stack spacing="6">
                    <Field name="username" validate={checkUsername}>
                        {({field, form} : FieldProps) => (
                            <FormControl id="username" isInvalid={(
                                    form.errors.username !== undefined && 
                                    form.touched.username !== undefined
                                )}>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <Input {...field} id="username" placeholder="Username" />
                                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
        
                    <Field name="email" validate={checkEmail}>
                        {({field, form} : FieldProps) => (
                            <FormControl id="email" isInvalid={(
                                    form.errors.email !== undefined && 
                                    form.touched.email !== undefined
                                )}>
                                <FormLabel htmlFor="email">E-Mail</FormLabel>
                                <Input {...field} id="email" placeholder="E-mail" />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="password" validate={checkPassword}>
                        {({field, form} : FieldProps) => (
                            <FormControl id="password" isInvalid={(
                                    form.errors.password !== undefined && 
                                    form.touched.password !== undefined
                                )}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <PasswordInput {...field} id="password" name="password" />
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={isSubmitting}>
                        Register
                    </Button>
                </Stack>
            </Form>
        )}
        </Formik>
    );
}

export default RegisterForm;