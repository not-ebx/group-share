import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import React from 'react'
import { MeDocument, MeQuery, useLoginMutation} from '../../generated/types';
import { toErrorMap } from '../../utils/ErrorHandler';
import { checkEmail, checkPassword, checkUsername, verifyEmail, verifyPassword, verifyUsername } from '../../utils/UserVerify';
import PasswordInput from '../global/format/inputs/PasswordInput';
import { useRouter } from 'next/router';

interface LoginFormProps {

}

const loginidValidation = (loginid: string) => {
    if(loginid.length > 3 && (verifyEmail(loginid) || verifyUsername(loginid))){
        return undefined;        
    }
    return "Please, enter a correct Username or E-mail";
}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();

    return (
        <Formik
            initialValues={{
                password: "",
                loginid: ""
            }}
            onSubmit={ async (values, actions) => { 
                const response = await login({
                    variables: values,
                    update: (cache, {data}) => {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                __typename: "Query",
                                me: data?.login.user // Only if it returns an user
                            }
                        });
                        cache.evict({fieldName: "groups:{}"});
                    }
                });
                if(response.data?.login.errors){
                    console.log('errors.. ?');
                    actions.setErrors(toErrorMap(response.data.login.errors));
                }
                else if(response.data?.login.user){
                    // Redirect somewhere else.
                    console.log(response.data.login.user);
                    router.push("/")
                }
            }}
        >
        {({isSubmitting}) =>(
            <Form>
                <Stack spacing="6">
                    <Field name="loginid" validate={loginidValidation}>
                        {({field, form} : FieldProps) => (
                            <FormControl id="loginid" isInvalid={(
                                    form.errors.loginid !== undefined  && 
                                    form.touched.loginid !== undefined 
                                )}>
                                <FormLabel htmlFor="loginid">Username</FormLabel>
                                <Input {...field} id="loginid" placeholder="Username" />
                                <FormErrorMessage>{form.errors.loginid}</FormErrorMessage>
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

                    <Button type="submit" bg="blue" size="lg" fontSize="md" isLoading={isSubmitting}>
                        Register
                    </Button>
                </Stack>
            </Form>
        )}
        </Formik>
    );
}

export default LoginForm;