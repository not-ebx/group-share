import { Avatar, Box, Button, Divider, Flex, Tag, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { useGetGroupQuery } from '../../generated/types';
import { SiTelegram} from 'react-icons/si';
import { BiArrowBack } from 'react-icons/bi';

interface GroupPageProps {

}

export const GroupPage: React.FC<GroupPageProps> = ({}) => {
    const router = useRouter();
    const { uuid } = router.query;

    // Get the Groups
    const {data: groupData, loading: loadingGroups} = useGetGroupQuery({
        variables: {
            uuid: typeof uuid === "string" ? uuid : ""
        }
    }); 

    return loadingGroups
    ? (<Text>Loading...</Text>)
    : groupData?.getGroup 
        ? (
            <Box>
                <Flex justifyContent="center">
                    <Avatar name={groupData.getGroup.name} src={groupData.getGroup.groupImageUrl} mr={5}/>
                    <Box>
                        <Text fontWeight="bold" fontSize="lg">{groupData.getGroup.name}</Text>
                        <Button as="a" href={groupData.getGroup.inviteLink} fontWeight="medium" bg="blue" size="xs" textColor="white" rel="noopener" target="_blank" >
                            <SiTelegram />&nbsp; Invitation
                        </Button>
                    </Box>
                </Flex>
                <Flex justifyContent="center">
                    {/* Group by: owner.name */}
                </Flex>
                <Divider mt={5} mb={5}/>
                <Box>
                    <Text fontWeight="bold" ml={3}>About this Group</Text>
                    <Text ml={3} mr={3} overflow="auto" height="15rem">{groupData.getGroup.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </Box>
                <Divider />
                {/* I guess tags here? */}
                <Box mt={3}>
                    <Text fontWeight="bold" mb={2}>Tags</Text>
                    {
                        groupData.getGroup.nsfw
                        ? (<Tag bg="tomato">NSFW</Tag>)
                        : (<></>)
                    }
                </Box>
                <Divider mt={1} w="100%" />
                <Box mt={5} align="center">
                    {/* Control Button */}
                    <Button bg="blue" onClick={() => router.back()}> <BiArrowBack />&nbsp;Go Back</Button>
                </Box>
            </Box>
        )
        : (
            <Text>Not found.</Text>
        )
    ;
}

export default GroupPage;