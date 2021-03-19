import React from 'react'
import RegisterForm from '../components/auth/RegisterForm';

interface registerProps {

}

export const register: React.FC<registerProps> = ({}) => {
    return (
        <RegisterForm />
    );
}

export default register;