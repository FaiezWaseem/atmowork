import {
    Stack, Button, Box, Flex, Text, VStack, HStack, Tooltip, Avatar, useToast, Modal, ModalHeader, useDisclosure, ModalOverlay, ModalContent, FormControl, Input,
    FormLabel, ModalCloseButton, ModalBody, ModalFooter, Center, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Link,
    TableContainer,
} from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { MdFlag, MdAdd, MdCalendarMonth } from "react-icons/md"
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import api from '@/utils/fetcher'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { projectType } from '@/types/types';

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const [projects, setProjects] = useState<Array<projectType>>([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dateInitial = new Date()
    const [start_date, setStartDate] = useState(dateInitial);
    const [end_date, setEndDate] = useState(dateInitial);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const people = [
        { name: "Dan Abramov", image: "https://bit.ly/dan-abramov" },
        { name: "Kent Dodds", image: "https://bit.ly/kent-c-dodds" },
        { name: "Segun Adebayo", image: "https://bit.ly/sage-adebayo" },
        { name: "Prosper Otemuyiwa", image: "https://bit.ly/prosper-baba" },
        { name: "Ryan Florence", image: "https://bit.ly/ryan-florence" },
    ];

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            const response = await api.get('/api/user/projects')
            if (response.data.status) {
                setProjects(response.data.projects)
                console.log(response.data.projects)
            } else {
                showMessage('Error 404 Something Went Wrong', response.data?.message, 'error')
            }

        } catch (error) {
            showMessage('Error 404 Something Went Wrong', error.message, 'error')
        }
    }
    const CreateProject = async () => {
        let response = null;
        if (title.length < 6) {
            showMessage('Title Length Too Small', 'Title Length Should be Greater than 6', 'info');
            return;
        }
        if (start_date.toISOString() === end_date.toISOString()) {
            response = await api.post('/api/user/project', { title, description })
        } else {
            response = await api.post('/api/user/project', { title, description, start_date, end_date })
        }

        const { status } = response.data;

        if (status) {
            showMessage('New Project Added', 'Project Created Success', 'success');
            loadProjects()
            onClose()
        } else {
            showMessage('Failed To Create Project', response.data.message, 'error');
        }

        setTitle('')
        setDescription('')
        setStartDate(dateInitial)
        setEndDate(dateInitial)
    }
    const showMessage = (title, desc, type) => {
        toast({
            status: type,
            title,
            description: desc,
            isClosable: false,
            duration: 4000,
            position: 'top'
        })
    }

    const deleteProject = async (projectid) => {
        const response = await api.delete(`/api/user/project/${projectid}`)
        const { status, message } = response.data;
        if (status) {
            showMessage('Deleted Success', message, 'success')
            setProjects(projects.filter(project => project._id !== projectid))
        } else {
            showMessage('Deletion failed', message, 'error')
        }
    }

    return <SideBar>
        <Stack
            display={'flex'}
            flexDir={'row'}
            flexWrap={'wrap'}
            width={'100%'}
            height={'auto'}
            justify={'space-evenly'}
            spacing={2}
            maxH={'86vh'}
            overflowY={'scroll'}
        >
            <TableContainer width={'100%'} >
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th display={'flex'} flexDirection={'row'} > <MdCalendarMonth /> start</Th>
                            <Th >end</Th>
                            <Th >Owner</Th>
                            <Th >Option</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {projects.map(project => {
                            return <Tr>
                                <Td> <Link href={`/dashboard/kanban/${project._id}`} onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/dashboard/kanban/${project._id}`)
                                }} > {project.title} </Link></Td>
                                <Td onClick={() => console.log(project)}>{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'nill'}</Td>
                                <Td>{project.end_date ? new Date(project.end_date).toLocaleDateString() : 'nill'}</Td>
                                <Td>{project.creatorid.username}</Td>
                                <Td>  <Button colorScheme='red' variant='outline'
                                    onClick={() => deleteProject(project._id)}
                                >
                                    Remove
                                </Button></Td>
                            </Tr>
                        })}

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Name</Th>
                            <Th display={'flex'} flexDirection={'row'} > <MdCalendarMonth /> start</Th>
                            <Th >end</Th>
                            <Th >Owner</Th>
                            <Th >Option</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Box position={'absolute'} bottom={10} right={10}>
                <Button leftIcon={<MdAdd />} colorScheme='purple' variant='outline' onClick={onOpen} >
                    Add Project
                </Button>
            </Box>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Project Title *</FormLabel>
                            <Input ref={initialRef} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Project Description</FormLabel>
                            <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>
                        <HStack mt={4}>
                            <FormControl mt={4}>
                                <FormLabel>Start Date</FormLabel>
                                <SingleDatepicker
                                    name="Start Date"
                                    date={start_date}
                                    onDateChange={setStartDate}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>End Date</FormLabel>
                                <SingleDatepicker
                                    name="End Date"
                                    date={end_date}
                                    onDateChange={setEndDate}
                                />
                            </FormControl>
                        </HStack>
                        <Center mt={4}  >
                            <FormControl w="60">
                                <FormLabel>Members</FormLabel>
                                <AutoComplete openOnFocus onChange={(e) => console.log(e)} >
                                    <AutoCompleteInput variant="filled" />
                                    <AutoCompleteList>
                                        {people.map((person, oid) => (
                                            <AutoCompleteItem
                                                key={`option-${oid}`}
                                                value={person.name}
                                                textTransform="capitalize"
                                                align="center"
                                            >
                                                <Avatar size="sm" name={person.name} src={person.image} />
                                                <Text ml="4">{person.name}</Text>
                                            </AutoCompleteItem>
                                        ))}
                                    </AutoCompleteList>
                                </AutoComplete>
                            </FormControl>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={CreateProject} >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    </SideBar>
}