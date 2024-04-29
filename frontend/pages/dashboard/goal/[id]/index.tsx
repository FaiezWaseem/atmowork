import SideBar from "@/components/dashboard/sidebar";
import PageLayout from "@/components/page-layout";
import {
    Box, Button, HStack, Stack, Text, Avatar, Badge, CircularProgress, CircularProgressLabel,

    Modal, ModalHeader, useDisclosure, ModalOverlay, ModalContent, FormControl, Input,
    FormLabel, ModalFooter, ModalBody, ModalCloseButton, Select

} from "@chakra-ui/react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect , useState } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export default function Goal() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const params = useParams();
    const { id } = params;

    const dateInitial = new Date()
    const [deadline, setDeadline] = useState(dateInitial);

    useEffect(() => {
        console.log(id)
    }, [])

    return (
        <PageLayout
            title={`Goals | Workspace`}
            description='Atmowork Goals'
            logo='../../logo_transparent.png'
            fav='../favicon.png'
        >
            <Stack width={'98.5vw'} gap={0}>
                <SideBar>
                    <HStack p={4} justify={'space-between'} >
                        <HStack>
                            <Box boxShadow={'sm'} rounded={'md'} >
                                <MdOutlineStarPurple500 size={48} color="orange" />
                            </Box>
                            <Text fontSize={'3xl'} fontWeight={'bold'} color={'gray.600'} >Goal</Text>
                            <CircularProgress value={40} color='green.400'>
                                <CircularProgressLabel>40%</CircularProgressLabel>
                            </CircularProgress>
                        </HStack>

                        <Button leftIcon={<FaPlus />} colorScheme='purple' variant='solid' onClick={onOpen} >
                            New Goal
                        </Button>
                    </HStack>
                    {/* User Greetings */}
                    <HStack p={4}  >
                        <Avatar size={'lg'} src={'https://avatars.githubusercontent.com/u/6643991?v=4'} />
                        <Stack p={0} m={0} >
                            <HStack lineHeight={0.8} p={0} m={0} >
                                <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.600'} >Good Morning</Text>
                                <Text fontSize={'xl'} fontWeight={'bold'} color={'purple'} >Alex</Text>
                                <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.600'} >!</Text>
                            </HStack>
                            <HStack lineHeight={1} p={0} m={0} >
                                <Text fontSize={'md'} color={'gray.600'} >You have</Text>
                                <Text fontSize={'md'} textDecoration={'underline'} color={'purple'} >2 Goals</Text>
                            </HStack>
                        </Stack>
                    </HStack>
                    {/* Completion Stats */}
                    <HStack p={4} borderBottom={'1px solid gray'} borderTop={'1px solid gray'}
                        justify={'space-between'}
                        alignItems={'center'}
                    >
                        <HStack>
                            <MdOutlineStarPurple500 color="gray" size={28} />
                            <Stack>
                                <Text lineHeight={0.7} >Monthly Goals</Text>
                                <Text lineHeight={0.3} fontSize={'sm'} color={'gray.500'} fontStyle={'italic'} >Oct-Nov</Text>
                            </Stack>
                        </HStack>
                        <HStack w={{ base: '50%', lg: '20%' }} justify={'space-evenly'} >
                            <Stack>
                                <Text fontSize={'sm'} > Incomplete</Text>
                                <Box w={'100px'} bg={'white'} boxShadow={'md'} textAlign={'center'} py={1} px={2} borderRadius={4} >
                                    <Text fontSize={14} >8</Text>
                                </Box>
                            </Stack>
                            <Stack>
                                <Text fontSize={'sm'} >Completed</Text>
                                <Box w={'100px'} bg={'white'} boxShadow={'md'} textAlign={'center'} py={1} px={2} borderRadius={4} >
                                    <Text fontSize={14} >2</Text>
                                </Box>
                            </Stack>
                        </HStack>

                    </HStack>
                    {/* Goal Cards  */}
                    <HStack p={4} flexWrap={'wrap'} justify={'space-evenly'} gap={3} >
                        <GoalCard />
                        <GoalCard />
                        <GoalCard />
                        <GoalCard />
                        <GoalCard />
                        <GoalCard />
                    </HStack>
                    {/* Add Modal */}
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create new Goal Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel color={'gray.500'}>Title</FormLabel>
                                    <Input size={'sm'} placeholder='Title' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel color={'gray.500'} >Description</FormLabel>
                                    <Input size={'sm'} placeholder='Description' />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel color={'gray.500'} >Progress Status</FormLabel>
                                    <Select size={'sm'} >
                                        <option value="inprogress">InProgress</option>
                                        <option value="completed">Completed</option>
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel color={'gray.500'} >Deadline</FormLabel>
                                    <SingleDatepicker
                                        name="start date"
                                        date={deadline}
                                        onDateChange={setDeadline}
                                    />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} px={6} rounded={2} >
                                    Save
                                </Button>
                                <Button onClick={onClose} px={6} rounded={2} >Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </SideBar>
            </Stack>
        </PageLayout>
    )
}

const GoalCard = () => {
    return (
        <Stack width={'30%'} boxShadow={'md'} p={4} m={0} rounded={'md'} bg={'white'} >
            <Box>
                <Badge variant='outline' colorScheme='orange' >Inprogress</Badge>
            </Box>
            <Text>this is a task</Text>
            <Text color={'gray.500'} fontSize={'smaller'} >12 Oct 2024</Text>
        </Stack>
    )
}