'use client'
import React, { useState, useEffect } from 'react';
import { Stack, Badge, Flex, Text, Tooltip, VStack, HStack, useToast, IconButton } from '@chakra-ui/react'
import { Button, Input, Avatar } from "@chakra-ui/react";
import SideBar from '@/components/dashboard/sidebar/index'
import {
    DndContext,
    useDroppable,
    rectIntersection,
    useDraggable,
    useSensors,
    useSensor,
    PointerSensor
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useParams } from 'next/navigation';
import api from '@/utils/fetcher';
import { MdFlag } from "react-icons/md"
import { featuresProps, projectType } from '@/types/types';
import { useRouter } from 'next/router';
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { ImBin } from "react-icons/im";

export default function Kanban() {
    const params = useParams();
    const router = useRouter();
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
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
    }, [])

    const loadFeatures = async () => {
        const response = await api.get(`/api/user/features/${params?.id}`);
        if (response.data.status) {
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

    const updateFeatureStatus = async (item: projectType, type: String) => {
        const response = await api.put(`/api/user/feature/${item._id}`, { status: type });
        console.log(response.data)
    }

    const removeCard = async (_id : string) => {
          console.log(_id)
          const { data } = await api.delete(`/api/user/feature/${_id}`)
          if(data.status){
            setTodoItems(todoItems.filter(item => item._id !== _id ))
            setInProgressItems(inProgressItems.filter(item => item._id !== _id ))
            setDoneItems(doneItems.filter(item => item._id !== _id ))
          }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 8,
          },
        })
      )
      
    return <Stack>
        <SideBar>

            <DndContext
                collisionDetection={rectIntersection}
                sensors={sensors}
                onDragEnd={(e) => {

                    console.log(e)

                    const container = e.over?.id;
                    const item = e.active.data.current?.item || "";
                    const index = e.active.data.current?.index || 0;
                    const parent = e.active.data.current?.parent || "Todo";

                    console.log(parent, container)

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
                                addNewCard={addNewCard}
                                removeCard={removeCard}
                            />
                        ))}
                    </Flex>
                </Flex>
            </DndContext>


        </SideBar>
    </Stack>
}




const AddCard = ({ addCard }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dateInitial = new Date()
    const [start_date, setStartDate] = useState(dateInitial);
    const [end_date, setEndDate] = useState(dateInitial);


    return (

        <Flex    >

            <Flex
                flex="1"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                flexDirection="column"
                p={2}

            >
                <Input
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <Input
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <Flex>
                    <SingleDatepicker
                        name="start date"
                        date={start_date}
                        onDateChange={setStartDate}
                    />
                    <SingleDatepicker
                        name="End Date"
                        date={end_date}
                        onDateChange={setEndDate}
                    />
                </Flex>

                <Button
                    ml={1}
                    mt={2}
                    colorScheme='gray'
                    color={'gray.500'}
                    onClick={() => {
                        addCard({ title, description, start_date, end_date });
                        setTitle("");
                        setDescription("")
                    }}
                >
                    Add Task
                </Button>
            </Flex>
        </Flex>
    )
}

const KanbanLane = ({ title, items, color, addNewCard, removeCard }) => {

    const { setNodeRef } = useDroppable({
        id: title,
    });

    const countItems = items?.length || 0;

    const [show, setShow] = useState(false);

    return (

        <Flex flex="3" padding="5" flexDirection="column" minH="10rem" height={
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
                    />
                ))}

                <Button onClick={() => setShow(!show)}
                    marginTop={5} width={200} variant='outline'
                    colorScheme={'gray'} color={'gray.400'}
                    fontSize={14}
                >{show ? 'Close' : '+ Add Task'}</Button>
                {show && <AddCard addCard={(feat) => {
                    setShow(false)
                    addNewCard(feat, title)
                }} />}
            </Flex>
        </Flex>
    )
}

interface KanbanCardType {
    item: featuresProps,
    parent: String,
    title: String,
    index: Number,
    removeCard: (_id : string) => void
}
const KanbanCard = ({ title, index, parent, item, removeCard }: KanbanCardType) => {

    // @ts-ignore
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: `card-${item._id}`,
        data: {
            title,
            item,
            index,
            parent
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),

    };


    return (
        <Flex
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
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
                <Text fontSize={14} width={'100%'} textAlign={'start'} fontWeight={'medium'} >{item.title}</Text>
                <Text fontSize={12} width={'100%'} textAlign={'start'} >{item.description}</Text>
                <HStack width={'100%'}>
                    <MdFlag />
                    <Text width={'100%'} fontSize={12} color={'gray.400'} >{`${item?.start_date ? new Date(item?.start_date).toLocaleDateString() : 'nill'} - ${item?.end_date ? new Date(item?.end_date).toLocaleDateString() : 'nill'}`}</Text>
                </HStack>
            </VStack>
            <VStack width={'20%'} justifyContent={'end'} cursor={'pointer'} >
                <Tooltip label={item?.creatorid?.username} >
                    <Avatar size='xs' name='Add' src='https://bit.ly/dan-a' />
                </Tooltip>
                <IconButton
                    icon={<ImBin color='red' aria-label='test' />}
                    aria-label=''
                    onClick={() => {
                        removeCard(item._id)
                    }}
                />
            </VStack>
        </Flex>
    )
}
