import MoonIcon from '@/icons/MoonIcon';
import SunIcon from '@/icons/SunIcon';
import { useColorMode, Flex, Button } from '@chakra-ui/react';
import React from 'react'
import useWords from '../Hooks/useWords';

const Header = () => {

    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Flex p="20px" justify="space-between" border="0px solid red">

            <Button onClick={toggleColorMode}>
                {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>



        </Flex>
    )
}

export default Header