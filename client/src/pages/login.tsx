import React from 'react'
import LoginForm from '../components/auth/LoginForm';

interface loginProps {

}

export const login: React.FC<loginProps> = ({}) => {
    return (
        <LoginForm />
    );
}

export default login;