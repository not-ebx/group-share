import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, DrawerBody, Flex, Input, Skeleton, Text } from '@chakra-ui/react';
import React  from 'react'
import { useMeQuery, useGetMyGroupsQuery } from '../../../../../generated/types';
import ShowGroupInfo from './ShowGroupInfo';
import { GrFormAdd } from 'react-icons/gr';

interface LoggedInMenuProps {
}

export const LoggedInMenu: React.FC<LoggedInMenuProps> = (props) => {
    const {data, loading} = useMeQuery();
    const {data: groupData, loading: groupLoading} = useGetMyGroupsQuery();


    return( 
    loading 
        ? (
            <Box alignContent="center">
                <Skeleton height="10px">
                    <Box>Loading Data...</Box>
                </Skeleton>
                <Skeleton height="10px">
                    <Box>Loading Data...</Box>
                </Skeleton>
                <Skeleton height="10px">
                    <Box>Loading Data...</Box>
                </Skeleton>
            </Box>
        )
        : (
            <>
            <Box>
                <Text align="center" fontSize="lg" fontWeight="bold" >Logged in as</Text>
                <Divider />
                <Text align="center" >{data?.me?.username}</Text> 
                <Text fontWeight="bold" align="center" mt={8}>Your Groups</Text>
                <Divider />
                <Box>
                    <Accordion allowToggle>
                        <AccordionItem border="none">
                            <AccordionButton>
                                <Box flex="1" textAlign="left" bg="transparent" w="100%" fontWeight="bold">
                                    <Text>Group List</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                                {
                                    groupLoading 
                                    ? (<>
                                        <Skeleton height="30px" mb={2} />
                                        <Skeleton height="30px" mb={2} />
                                        <Skeleton height="30px" mb={2} />
                                        <Skeleton height="30px" mb={2} />
                                        </>)
                                    : groupData?.getMyGroups ?
                                        groupData.getMyGroups.map(
                                            (group) => <ShowGroupInfo group={group} /> 
                                        )
                                        :
                                        (<Text>You have no groups!</Text>)
                                }
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                        <Button w="100%" mt={1}><GrFormAdd /> Create a Group</Button>
                </Box>

                {/* Your groups D: !!! */}

            </Box>
            </>

        )
    );
}

export default LoggedInMenu;