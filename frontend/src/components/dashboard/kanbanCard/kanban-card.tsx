
import { Stack, Badge, Flex, Text, Tooltip, VStack, HStack, useToast, IconButton } from '@chakra-ui/react'
import { Button, Input, Avatar } from "@chakra-ui/react";
import { featuresProps } from "@/types/types"
import { CSS } from '@dnd-kit/utilities';
import { ImBin } from "react-icons/im";
import { MdFlag } from "react-icons/md"
import { useDraggable } from '@dnd-kit/core';

interface KanbanCardType {
    item: featuresProps,
    parent: String,
    title: String,
    index: Number,
    removeCard: (_id: string) => void
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


export default KanbanCard