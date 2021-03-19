import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { cutString } from '../../utils/StringHandler';

interface GroupPreviewProps {

}

export const GroupPreview: React.FC<GroupPreviewProps> = ({}) => {
    return (
        <Box>
            <Box justifyContent="center" margin="auto" borderColor="lightgray" borderRadius={5} w="95%" border="1px">
                <Flex ml={2}> {/* Group Name */}
                    <Avatar src="" name="Group Name" mr={3} />
                    <Box>
                        <Text>Name of The Group</Text>
                        <Text>Group Type ?</Text>
                    </Box>
                </Flex>
                <Box align="center">
                    <Divider w="50%" mt={2} mb={2} />
                </Box>
                <Box ml={2}>
                    <Text>{cutString("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin purus vel vehicula pretium. Mauris vestibulum felis erat, in posuere justo tristique vehicula. Aliquam facilisis lorem vel ex iaculis luctus. Ut sit amet fringilla purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et elit sit amet leo porta condimentum. Curabitur venenatis et metus eu dictum. Sed suscipit malesuada odio, congue posuere diam tempus nec. Nam cursus tempus ante ut commodo. In hac habitasse platea dictumst. Mauris eget nisi placerat, feugiat leo nec, scelerisque magna. Morbi condimentum dolor nec libero tristique malesuada. Suspendisse lectus est, malesuada commodo nibh ut, dictum sodales enim. Vestibulum ante est, ornare tempor pretium id, convallis ac velit. Phasellus vel malesuada augue. Curabitur pretium turpis ac dui laoreet, ut tristique turpis sagittis.",100)} </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default GroupPreview;