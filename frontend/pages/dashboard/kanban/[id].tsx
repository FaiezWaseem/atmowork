'use client'
import React, { useState, useEffect } from 'react';

import {
    Stack, Badge, Flex, Text, HStack, useToast, Tooltip, Box, Image
    , Modal, ModalBody, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalFooter
    , useDisclosure
} from '@chakra-ui/react'
import {
    DndContext,
    useDroppable,
    rectIntersection,
    useDraggable,
    useSensors,
    useSensor,
    PointerSensor
} from '@dnd-kit/core';
import { useParams } from 'next/navigation';
import api from '@/utils/fetcher';
import { featuresProps, projectType } from '@/types/types';
import { Avatar, Input, Wrap, WrapItem } from '@chakra-ui/react'

import AddMemberModal from '@/components/dashboard/addmember/add-member';
import AddNewTask from '@/components/dashboard/addtask/add-new-task';
import KanbanCard from '@/components/dashboard/kanbanCard/kanban-card';

const BoardImg = 'https://images.unsplash.com/photo-1707345512638-997d31a10eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMzg3Mzl8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcwOTA2MzE2Nnww&ixlib=rb-4.0.3&q=80&w=1080'

import { FaFileMedical } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";

export default function Kanban() {
    const params = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [project, setProject] = useState<projectType | null>(null)
    const toast = useToast()
    const arrayLanes = [
        {
            title: "Todo",
            items: todoItems,
            color: "yellow",
        },
        {
            title: "InProgress",
            items: inProgressItems,
            color: "green",
        },
        {
            title: "Done",
            items: doneItems,
            color: "blue",
        },
    ]
    const status = {
        'Todo': 'todo',
        'InProgress': 'inprogress',
        'Done': 'done',

        'todo': 'Todo',
        'inprogress': 'InProgress',
        'done': 'Done'
    }

    const addNewCard = async (feat, type) => {
        const response = await api.post(`/api/user/feature`, { ...feat, status: status[type], project_id: params.id })
        if (response.data.status) {
            if (type === 'Todo') {
                setTodoItems([...todoItems, response.data.feature]);
            } else if (type === 'InProgress') {
                setInProgressItems([...inProgressItems, response.data.feature]);
            } else {
                setDoneItems([...doneItems, response.data.feature]);
            }
        } else {
            toast({
                title: 'Error',
                description: response.data.message,
                position: 'top',
                duration: 4000,
                isClosable: false
            })
        }
    };

    useEffect(() => {
        loadFeatures()
        loadProjectDetails()
    }, [])

    const loadFeatures = async () => {
        const response = await api.get(`/api/user/features/${params?.id}`);
        if (response.data.status) {
            setTodoItems([])
            setInProgressItems([])
            setDoneItems([])
            const { features }: { features: Array<featuresProps> } = response.data;
            features.map(feature => {
                console.log(feature, status[feature.status])
                if (status[feature.status] === 'Todo') {
                    setTodoItems((old) => [...old, { ...feature }]);
                } else if (status[feature.status] === 'InProgress') {
                    setInProgressItems((old) => [...old, { ...feature }]);
                } else {
                    setDoneItems((old) => [...old, { ...feature }]);
                }
            })
        }
    }
    const loadProjectDetails = async () => {
        const { data } = await api.get(`/api/user/project/${params?.id}`);
        const { status } = data
        if (status) {
            setProject(data.project)
        }
    }

    const updateFeatureStatus = async (item: projectType, type: String) => {
        const response = await api.put(`/api/user/feature/${item._id}`, { status: type });
        console.log(response.data)
        if (!response.data.status) {
            toast({
                title: 'Error',
                description: 'Unable to update status',
                position: 'top',
                status: 'error',
                duration: 4000,
                isClosable: false
            })
        }
    }

    const removeCard = async (_id: string) => {
        const { data } = await api.delete(`/api/user/feature/${_id}`)
        if (data.status) {
            setTodoItems(todoItems.filter(item => item._id !== _id))
            setInProgressItems(inProgressItems.filter(item => item._id !== _id))
            setDoneItems(doneItems.filter(item => item._id !== _id))
        } else {
            toast({
                title: 'Failed To Remove Task',
                description: data.message,
                duration: 4000,
                status: 'error',
                position: 'top-right'
            })
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    return <Stack minH={'100vh'}
        bgImage={BoardImg}
        backgroundSize={'cover'}
    >
        <HStack p={4} bg={'whiteAlpha.400'} justifyContent={'space-between'} >
            <HStack>
                <Wrap>
                    <WrapItem>
                        <Tooltip label={project?.creatorid?.username} >
                            <Avatar name={project?.creatorid?.username} size={'sm'} src={`https://placehold.co/100x100/FFF/C261D1?text=${project?.creatorid?.username?.charAt(0)}&font=roboto`} />
                        </Tooltip>
                    </WrapItem>
                    {project && project.members.map(member => {
                        return <WrapItem key={member._id} >
                            <Tooltip label={member.username} >
                                <Avatar name={member.username} size={'sm'} src={`https://placehold.co/100x100/FFF/C261D1?text=${member.username.charAt(0)}&font=roboto`} />
                            </Tooltip>
                        </WrapItem>
                    })}
                </Wrap>
            </HStack>
            <HStack>
                <Text fontSize={'3xl'} fontWeight={'bold'} color={'white'} >{project?.title}</Text>
            </HStack>
            <HStack>
                <AddMemberModal />
                <AddNewTask addCard={addNewCard} />
            </HStack>
        </HStack>
        <DndContext
            collisionDetection={rectIntersection}
            sensors={sensors}
            onDragEnd={(e) => {



                const container = e.over?.id;
                const item = e.active.data.current?.item || "";
                const index = e.active.data.current?.index || 0;
                const parent = e.active.data.current?.parent || "Todo";



                if (container === "Todo" && (container !== parent)) {
                    setTodoItems([...todoItems, { ...item }]);
                } else if (container === "Done" && (container !== parent)) {
                    setDoneItems([...doneItems, { ...item }]);
                } else if (container === "InProgress" && (container !== parent)) {
                    setInProgressItems([...inProgressItems, { ...item }]);
                }
                if ((container && parent) && (container !== parent)) {
                    updateFeatureStatus(item, status[container])
                    if (parent === "Todo") {
                        setTodoItems([
                            ...todoItems.slice(0, index),
                            ...todoItems.slice(index + 1),
                        ]);
                    } else if (parent === "Done") {
                        setDoneItems([
                            ...doneItems.slice(0, index),
                            ...doneItems.slice(index + 1),
                        ]);
                    } else {
                        setInProgressItems([
                            ...inProgressItems.slice(0, index),
                            ...inProgressItems.slice(index + 1),
                        ]);
                    }
                }
            }}
        >
            <Flex flexDirection="column">

                <Flex flex="3" flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
                    {arrayLanes.map(({ title, items, color }, index) => (
                        <KanbanLane
                            key={index}
                            title={title}
                            items={items}
                            color={color}
                            removeCard={removeCard}
                            project={project}
                            loadFeatures={loadFeatures}

                        />
                    ))}

                    <Box>
                        <HStack _hover={{ cursor: 'pointer' }}
                            pos={'absolute'} bottom={10} right={10} shadow={'md'} bg={'whiteAlpha.700'} p={4} borderRadius={6}
                            onClick={onOpen}
                        >
                            <TiMessages size={24} />
                        </HStack>
                    </Box>

                    <ChatBoxModal onClose={onClose} isOpen={isOpen} id={params?.id} />

                </Flex>
            </Flex>
        </DndContext>
    </Stack>
}


const ChatMessage = ({ isSender , isImage }) => {
    return <HStack justify={isSender ? 'flex-end' : 'flex-start'} my={2} >
        <Box boxShadow={'sm'} bg={'#FFF'} p={4} width={'40%'} borderColor={'gray.100'} borderRadius={3} borderWidth={'1.5px'} >
            <Text fontWeight={'bold'} fontSize={'lg'} >{isSender? 'You' : 'Someone'}</Text>
            {isImage? <Image src={'https://picsum.photos/id/1015/200/300'} height={200} width={200} /> : null }
            <Text fontSize={'sm'} >{isSender? 'Hi, I am using this app' : 'Hi, I am using this app'}</Text>
            <Text fontSize={'sm'} >{isSender? '10:00 PM' : '10:00 PM'}</Text>
        </Box>
    </HStack>
}

const ChatContainer = () => {
    return <Flex flex="1" flexDir={'column'} p={4} bg={'whiteAlpha.700'} borderRadius={6} height={'55vh'} overflowY={'scroll'} >
        <ChatMessage isSender={false} isImage={false} />
        <ChatMessage isSender={true} isImage />
        <ChatMessage isSender={false} isImage />
        <ChatMessage isSender={true} isImage={false} />
        <ChatMessage isSender={false} isImage={false} />
        <ChatMessage isSender={true}  isImage={false} />
    </Flex>
}

const ChatInput = () => {
    return <HStack width={'100%'} p={2} >
        <HStack boxShadow={'lg'} bg={'#FFF'} p={4} width={'100%'} borderRadius={6} >
            <Box _hover={{
                cursor: 'pointer',
                color: 'gray.600',
            }}>
                <FaFileMedical size={20} />
            </Box>
            <Input mx={5} variant='unstyled' placeholder='Enter Some Message Here...' autoFocus />
            <Box _hover={{
                cursor: 'pointer',
                color: 'gray.600',
            }}>
                <FiSend size={20} />
            </Box>
        </HStack>
    </HStack>
}


const ChatBoxModal = ({ onClose, isOpen, id }) => {
    return <Modal onClose={onClose} size={"6xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Project Discussions & Files</ModalHeader>
            <ModalCloseButton />
            <ModalBody maxH={'55vh'} minH={'55vh'} >
                <ChatContainer />

            </ModalBody>
            <ModalFooter>
                <ChatInput />
            </ModalFooter>
        </ModalContent>
    </Modal>
}



const KanbanLane = ({ title, items, color, removeCard, project, loadFeatures }) => {

    const { setNodeRef } = useDroppable({
        id: title,
    });

    const countItems = items?.length || 0;


    return (

        <Flex flex="3" padding="5" flexDirection="column" minH="10rem"
            height={
                countItems > 0 ? "auto" : "10rem"
            }>
            <Text
                textAlign={'center'}
                fontSize="md"
                borderTopRadius={5}
                borderTopColor={`${color}.500`}
                borderTopWidth={4}
                p={1}
                shadow={'md'}
                fontWeight="bold"
                mb="2"
                bg={'#fff'}
            >
                {title} <Badge>{items?.length}</Badge>
            </Text>
            <Flex
                ref={setNodeRef}
                flex="1"

                borderRadius="md"

                flexDirection="column"
                p={2}
                alignItems={'center'}

            >
                {items.map((item, index) => (

                    <KanbanCard key={index}
                        title={item.title}
                        item={item}
                        index={index}
                        parent={title}
                        removeCard={removeCard}
                        project={project}
                        loadFeatures={loadFeatures}

                    />
                ))}


            </Flex>
        </Flex>
    )
}

