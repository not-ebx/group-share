import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, useDisclosure, useColorModeValue, useColorMode, useTheme, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MeQuery, useMeQuery, useLogoutMutation } from '../../../../generated/types';
import LoggedInMenu from './DrawerMenu/LoggedInMenu';
import LoggedOutMenu from './DrawerMenu/LoggedOutMenu';
import Link from 'next/link';
import { useIsAuth } from '../../../../utils/AuthHelper';
import { useApolloClient } from '@apollo/client';

interface DrawerMenuProps {

}

export const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
    const {data, loading} = useMeQuery();
    const [logout, {loading: loggingOut}] = useLogoutMutation();
    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const client = useApolloClient();


    return (
        <>
            <Button /* ref={btnRef} */ bg={colorMode === "light" ? "lightblue" : "blue" } onClick={onOpen} size="sm">
                
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Information</DrawerHeader>

                    <DrawerBody>
                        {
                            data?.me 
                            ? (<LoggedInMenu />)
                            : (<LoggedOutMenu />)
                        }
                    </DrawerBody>
                    <DrawerFooter>
                        {
                            data?.me 
                            ? (<Box>
                                <Button bg="tomato" color="white" onClick={async () => {
                                        await logout(); 
                                        await client.resetStore();
                                    }} 
                                    isLoading={loggingOut}
                                >
                                    Log-out
                                </Button>
                            </Box>)
                            : (<Box>
                                <Link href={"/register"}>
                                    <Button bg="green" mr={3} onClick={onClose}>Register</Button>
                                </Link>
                                <Link href={"/login"}>
                                    <Button bg="blue" onClick={onClose}>Log-in</Button>
                                </Link>
                            </Box>)
                        }
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default DrawerMenu;