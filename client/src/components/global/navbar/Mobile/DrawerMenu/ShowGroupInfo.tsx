import { Avatar, Box, Button, Flex, Tag } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import { Group } from '../../../../../generated/types';
import { cutString } from '../../../../../utils/StringHandler';

interface ShowGroupInfoProps {
    group : Group;
}

export const ShowGroupInfo: React.FC<ShowGroupInfoProps> = ({group}) => {
    return (
        <Link href={`/group/${group.uuid}`}>
            <Button flex="1" mb={3} w="100%">
                <Flex align="left">
                    <Flex>
                        <Avatar name={group.name} src={group.groupImageUrl} size="sm" mr={1} />
                    </Flex>
                </Flex>
                <Flex mr="auto" ml={2}>
                    {cutString(group.name, 15)} 
                        {
                            group.nsfw 
                            ? (<Tag color="tomato" size="sm">NSFW</Tag>) 
                            : (<></>)
                        }
                </Flex>
            </Button>
        </Link>
    );
}

export default ShowGroupInfo;