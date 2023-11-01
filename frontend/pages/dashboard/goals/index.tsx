import React from 'react'
import {
    Modal, ModalHeader, useDisclosure, ModalOverlay, ModalContent, FormControl, Input,
    FormLabel, Stack, Flex, HStack, Button, Image, Center, Text, Menu, MenuButton, MenuList, MenuItem,
    IconButton, CircularProgress, CircularProgressLabel, ModalFooter, ModalBody, ModalCloseButton, useToast
} from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai'
import { GoKebabHorizontal } from 'react-icons/go'
import { CiEdit } from 'react-icons/ci'
import api from '@/utils/fetcher'
import PageLayout from '@/components/page-layout'
import useUser from '@/providers/userStore'

export default function Goals() {
    const [goals, setGoals] = React.useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    //@ts-ignore
    const user = useUser((state)=> state?.users)

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast();

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')


    React.useEffect(() => {
        loadGoals()
    }, [])


    const loadGoals = async () => {
        try {
            const result = await api.get('/api/user/goals');
            const { data } = result;
            if (data.status) {
                setGoals(data?.goals)
            } else {
                toast({
                    duration: 3000,
                    title: 'Failed To Get Goals',
                    description: data?.message,
                    position: 'top'
                })
            }

        } catch (error) {
            toast({
                duration: 3000,
                title: 'Network Request Failed',
                description: error?.message,
                position: 'top'
            })
        }
    }
    const CreateGoal = async () => {
        try {
            if (title.length < 10) {
                toast({
                    duration: 3000,
                    title: 'Empty Feilds',
                    description: 'Title Length Should be greater than 10',
                    position: 'top',
                    status: 'warning'
                })
                return;
            }
            if (description.length < 20) {
                toast({
                    duration: 3000,
                    title: 'Empty Feilds',
                    description: 'Description Length Should be greater than 20',
                    position: 'top',
                    status: 'warning'
                })
                return;
            }
            const response = await api.post('/api/user/goal', { title, description })
            const { data } = response;
            console.log(data)
            if (data.status) {
                onClose();
                loadGoals();
            } else {
                toast({
                    duration: 3000,
                    title: 'SomeThing Went Wrong!!',
                    description: data?.message,
                    position: 'top',
                    status: 'error'
                })
            }

        } catch (error) {
            toast({
                duration: 3000,
                title: 'Network Request Failed',
                description: error?.message,
                position: 'top',
                status: 'error'
            })
        }
    }

    return <PageLayout
        title={`Goals | ${user?.username}'s Workspace`}
        description='Atmowork Goals'
        logo='../logo_transparent.png'
        fav='../favicon.png'
    >
        <Stack width={'100vw'} gap={0}>
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
                    {goals.map(goal => <GoalCard goal={goal} />)}
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
                                <Input ref={initialRef} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Goal Description</FormLabel>
                                <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={CreateGoal} >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </SideBar>
        </Stack>
    </PageLayout>
}


const GoalCard = ({ goal }) => {

    const toast = useToast();
    const deleteGoal = async () => {
        try {

            const response = await api.delete(`/api/user/goal/${goal._id}`)
            const { data } = response;
            if (data.status) {
                toast({
                    title: 'Success!',
                    description: data.message,
                    duration: 5000,
                    status: 'success',
                    isClosable: false,
                    position: 'top'
                })
            } else {
                toast({
                    title: 'Oops Something Went Wrong!!',
                    description: data.message,
                    duration: 5000,
                    status: 'error',
                    isClosable: false,
                    position: 'top'
                })
            }
        } catch (error) {
            toast({
                title: 'Oops Something Went Wrong!!',
                description: error.message,
                duration: 5000,
                status: 'error',
                isClosable: false,
                position: 'top'
            })

        }
    }

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
                    <MenuItem icon={<AiFillDelete />} color={'red'} onClick={deleteGoal} >
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
        <Center>
            <CircularProgress value={goal?.progress} size='60px' thickness='8px' >
                <CircularProgressLabel>{goal?.progress}%</CircularProgressLabel>
            </CircularProgress>
        </Center>
        <Center lineHeight={0.5} >
            <Text>{goal?.title}</Text>
        </Center>
        <Center>
            <Text textDecor={'underline'} color={'purple'} >{goal?.targets} targets</Text>
        </Center>
    </Stack>
}

