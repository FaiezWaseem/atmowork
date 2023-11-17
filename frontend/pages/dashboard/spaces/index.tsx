import { Stack, Button, Box, Flex, Text, VStack, HStack, Tooltip, Avatar } from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { MdFlag, MdAdd } from "react-icons/md"

export default function Home() {
    return <SideBar>
        <Stack display={'flex'}
            flexDir={'row'}
            flexWrap={'wrap'}
            width={'100%'}
            height={'auto'}
            justify={'start'}
            spacing={2}
        >
            {[1,2,3,1,1,,1,1].map(i => <ProjectCard />)}
            <Box position={'absolute'} bottom={10} right={10}>
                <Button leftIcon={<MdAdd />} colorScheme='purple' variant='outline'>
                    Add Project
                </Button>
            </Box>
        </Stack>
    </SideBar>
}

const ProjectCard = () => {
    return <Flex
        direction={'row'}
        bg="white"
        p={2}
        m={1}
        borderColor={'gray.200'}
        borderWidth={.13}
        borderRadius="sm"
        boxShadow="sm"
        w={300}
        maxH={120}
        justifyContent="center"

    >
        <VStack width={'80%'}>
            <Text fontSize={14} width={'100%'} textAlign={'start'} fontWeight={'medium'} >{"Agency Op"}</Text>
            <Text fontSize={12} width={'100%'} textAlign={'start'} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime at dicta alias</Text>
            <HStack width={'100%'}>
                <MdFlag />
                <Text width={'100%'} fontSize={12} color={'gray.400'} >Jul1 -Jul2</Text>
            </HStack>
        </VStack>
        <HStack width={'20%'} justifyContent={'end'} cursor={'pointer'} >
            <Tooltip label='Assign Me' >
                <Avatar size='xs' name='Add' src='https://bit.ly/dan-a' />
            </Tooltip>
        </HStack>
    </Flex>
}