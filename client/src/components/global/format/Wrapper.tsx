import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {
    variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant="regular"}) => {
    return (
        <Box mx="auto" mt={4} maxW={variant === "regular" ? "800px" : "400px"}>
            {children}
        </Box>
    );
}

export default Wrapper;