import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react'
import GroupPreview from '../components/groups/GroupPreview';

interface indexProps {

}

const index: React.FC<indexProps> = ({}) => {
    return (
        <>
            <Text align="center" fontWeight="bold">Latest Added Groups</Text>
            <Divider mt={1} mb={2} />
            <Box>
                <GroupPreview />
            </Box>
        </>
    );
};

export default index;