import React from 'react'
import {
    Modal, ModalHeader, useDisclosure, ModalOverlay, ModalContent, FormControl, Input,
    FormLabel, Stack, Flex, HStack, Button, Image, Center, Text, Menu, MenuButton, MenuList, MenuItem,
    IconButton, CircularProgress, CircularProgressLabel, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai'
import { GoKebabHorizontal } from 'react-icons/go'
import { CiEdit } from 'react-icons/ci'

export default function Goals() {
    const [goals, setGoals] = React.useState([1]);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return <Stack>
        <SideBar>
            <HStack justifyContent={'end'} padding={1}>
                <Button leftIcon={<AiOutlinePlus />} colorScheme='purple' variant='solid' onClick={onOpen} >
                    Add Goal
                </Button>
            </HStack>
            {goals.length === 0 && <Center minH={'80vh'} >
                <Stack>
                    <Image src='../assets/goals.svg' width={{ base: 250, md: 300, lg: 400 }} ></Image>
                    <Text textAlign={'center'} fontFamily={'monospace'} fontSize={20} >No Goals Added Yet!!</Text>
                </Stack>
            </Center>}
            <Flex flexWrap={'wrap'} justify={'space-evenly'} >
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
            </Flex>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new Goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Goal Title</FormLabel>
                            <Input ref={initialRef} placeholder='Title' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Goal Description</FormLabel>
                            <Input placeholder='Description' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </SideBar>
    </Stack>
}


const GoalCard = () => {
    return <Stack w={200} h={200} shadow={'md'} margin={2} borderRadius={8}
        _hover={{
            transition: '0.7s all',
            transform: 'scale(1.01)',
            cursor: 'pointer',
            shadow: 'xl'
        }} >
        <Stack bg={'blackAlpha.700'} width={'100%'} h={1.5} borderTopRadius={8} ></Stack>
        <HStack justify={'end'} >
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<GoKebabHorizontal />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem icon={<CiEdit />}>
                        Rename
                    </MenuItem>
                    <MenuItem icon={<AiFillDelete />} color={'red'}>
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
        <Center>
            <CircularProgress value={0} size='60px' thickness='8px' >
                <CircularProgressLabel>0%</CircularProgressLabel>
            </CircularProgress>
        </Center>
        <Center lineHeight={0.5} >
            <Text>FaceBook</Text>
        </Center>
        <Center>
            <Text textDecor={'underline'} color={'purple'} >2 targets</Text>
        </Center>
    </Stack>
}

