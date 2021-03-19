import { Box, DrawerBody, Input, Text } from '@chakra-ui/react';
import React from 'react'
import {ImSad, ImPointDown} from 'react-icons/im'

interface LoggedOutMenuProps {
}

export const LoggedOutMenu: React.FC<LoggedOutMenuProps> = (props) => {
    return(
        <Box mt={8} >
            <Box align="center">
                <ImSad size="100px" color="lightgray" />
            </Box>
            <Text align="center">You must be logged in to be able to create groups...</Text> 
            <Text align="center" fontWeight="bold" mt={8} >You can register or login below</Text>
            <Box align="center" mt={3}>
                <ImPointDown size="20px" color="black" />
            </Box>
        </Box>

    );
}

export default LoggedOutMenu;