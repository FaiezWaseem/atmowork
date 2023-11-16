import React, { useState } from 'react';
import { Stack, Badge, Flex, Text, Tooltip, Divider, HStack } from '@chakra-ui/react'
import { Button, Input, Avatar } from "@chakra-ui/react";
import SideBar from '@/components/dashboard/sidebar/index'
import {
    DndContext,
    useDroppable,
    rectIntersection,
    useDraggable
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';



export default function Home() {

    return <Stack>
        <SideBar>
            <KanbanBoard />
        </SideBar>
    </Stack>
}



const KanbanBoard = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
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

    const addNewCard = (title) => {
        setTodoItems([...todoItems, { title, description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. quod qui quisquam quia' }]);
    };

    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={(e) => {

                const container = e.over?.id;
                const title = e.active.data.current?.title || "";
                const item = e.active.data.current?.item || "";
                const index = e.active.data.current?.index || 0;
                const parent = e.active.data.current?.parent || "Todo";

                console.log(parent , container)

                if (container === "Todo") {
                    setTodoItems([...todoItems, { ...item }]);
                } else if (container === "Done") {
                    setDoneItems([...doneItems, { ...item }]);
                } else if (container === "InProgress") {
                    setInProgressItems([...inProgressItems, { ...item }]);
                }
                if (container &&  parent) {
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
                        />
                    ))}
                </Flex>
            </Flex>
        </DndContext>
    );

}

const AddCard = ({ addCard }) => {

    const [title, setTitle] = useState("");


    return (

        <Flex    >

            <Flex
                flex="1"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                flexDirection="row"
                p={2}

            >
                <Input
                    mt={2}
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Button
                    ml={1}
                    mt={2}
                    colorScheme='gray'
                    color={'gray.500'}
                    onClick={() => {
                        addCard(title);
                        setTitle("");
                    }}
                >
                    Add Task
                </Button>
            </Flex>
        </Flex>
    )
}

const KanbanLane = ({ title, items, color, addNewCard }) => {

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

                    <KanbanCard key={index} title={item.title} item={item} index={index} parent={title} />
                ))}

                <Button onClick={() => setShow(!show)}
                    marginTop={5} width={200} variant='outline'
                    colorScheme={'gray'} color={'gray.400'}
                    fontSize={14}
                >{show ? 'Close' : '+ Add Task'}</Button>
                {show && <AddCard addCard={(title) => {
                    setShow(false)
                    addNewCard(title)
                }} />}
            </Flex>
        </Flex>
    )
}

const KanbanCard = ({ title, index, parent, item }) => {

    // @ts-ignore
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: `card-${title}`,
        data: {
            title,
            item,
            index,
            parent
        }
    });

    console.log(transition)

    const style = {
        transform: CSS.Transform.toString(transform),

    };


    return (
        <Flex
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            direction={'column'}
            bg="white"
            p={2}
            mt={1}
            borderColor={'gray.200'}
            borderWidth={.13}
            borderRadius="sm"
            boxShadow="sm"
            w="100%"
            maxH={100}
            alignItems="center"
            justifyContent="center"
            cursor="grab"
            onClick={() => {
                console.log(item)
            }}
        >
            <Text fontSize={14} width={'100%'} textAlign={'start'} fontWeight={'medium'} >{title}</Text>
            <Divider />
            <Text fontSize={12} textAlign={'justify'} >{item.description}</Text>
            <HStack width={'100%'} justifyContent={'end'} >
                <Tooltip label='Assign Me' cursor={'pointer'}>
                    <Avatar size='xs' name='Add' src='https://bit.ly/dan-a' />
                </Tooltip>
            </HStack>
        </Flex>

    )
}
