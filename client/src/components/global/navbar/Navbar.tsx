import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { useColorMode, useTheme } from '@chakra-ui/system';
import React, { useEffect } from 'react'
import { MeDocument, useMeQuery } from '../../../generated/types';
import DrawerMenu from './Mobile/DrawerMenu';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const theme = useTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            w="100%"
            bg={colorMode === "light" ? "blue" : "darkblue" }
            p={1}
            zIndex={100}
            position="sticky"
            top={0}
        >
            <Flex mr="auto">
                <Text as="a" href="/" fontWeight="bold" >Groogle</Text> {/* Lmao first thing i could think of */}
            </Flex>
            <Flex align="center">
                <Input size="sm" />
            </Flex>
            <Flex ml="auto">
                <DrawerMenu />
            </Flex>

        </Flex>
    );
}

export default Navbar;