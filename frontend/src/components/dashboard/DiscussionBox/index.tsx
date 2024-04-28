import React, { useState, } from 'react';

import {
    Stack,Flex, Text, HStack, Box, Image
} from '@chakra-ui/react'
import { Avatar, Input, Wrap, WrapItem } from '@chakra-ui/react'

import { filesize } from "filesize";
import { FaFile } from "react-icons/fa";
import { HiDocumentRemove } from "react-icons/hi";


import { FaFileMedical } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

import { useDropzone } from 'react-dropzone'

interface ChatContainerProps {
    id : string
}

const ChatContainer = ({ id } : ChatContainerProps) => {

    const [ chats ] = useState([
        {
            id: 1,
            username: 'Someone',
            message: 'Hi, I am using this app',
            time: '10:00 PM',
            image: 'https://picsum.photos/id/1015/200/300',
            isSender: false
        },
        {
            id: 2,
            username: 'Someone',
            message: 'Hi, I am using this app',
            time: '10:00 PM',
            image: 'https://picsum.photos/id/1015/200/300',
            isSender: true
        },
        {
            id: 3,
            username: 'Someone',
            message: 'Hi, I am using this app',
            time: '10:00 PM',
            isSender: false
        },
    ])

    return <Flex flex="1" flexDir={'column'} p={4} bg={'whiteAlpha.700'} borderRadius={6} height={'70vh'} overflowY={'scroll'} >
        {chats.map((chat) => (
            <ChatMessage key={chat.id} isSender={chat.isSender} isImage={chat.image? true : false} />
        ))}
    </Flex>
}


interface ChatInputProps {
    selectedFiles: File[],
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>,
    id : string
}



const ChatInput = ({ selectedFiles, setSelectedFiles , id }: ChatInputProps) => {

    const { getRootProps , getInputProps } = useDropzone()

    return <HStack width={'100%'} p={2} flexDir={'column'} position={'relative'} >
        <HStack p={4} borderRadius={6} width={'100%'} overflowX={selectedFiles.length > 6 ? 'scroll' : 'hidden'}  position={'absolute'} bottom={20} background={'white'} >
            {selectedFiles.map((file, index) => (
                <FileItem file={file} key={index} onfileRemove={(file) => {
                    setSelectedFiles(prev => prev.filter(f => f!== file))
                }} />
            ))}
        </HStack>
        <HStack boxShadow={'lg'} bg={'#FFF'} p={4} width={'100%'} borderRadius={6} >
            <Box _hover={{
                cursor: 'pointer',
                color: 'gray.600',
            }}
                {...getRootProps()}
            >
                 <input {...getInputProps()} type='file' multiple onChange={(e)=>{
                     const files = e.target.files;
                     console.log(files)
                     console.log(files.length)
                     for (let i = 0; i < files.length; i++) {
                        setSelectedFiles(prev => [...prev , files.item(i)])
                     }
                 }} />
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

const FileItem = ({ file , onfileRemove } : { file : File , onfileRemove : (file : File) => void }) => {

    const getFileName = () =>{
       const filename = file.name
       if(filename.length > 30){
           return filename.slice(0, 30) + '...'
       }
       return filename
    }

    return <HStack border={`1px solid gray`} borderRadius={3} p={2} minW={200} >
        <Stack  width={'100%'}>
            <HStack justifyContent={'space-between'} width={'100%'} >
                <FaFile />
                <Box _hover={{
                    cursor: 'pointer',
                    color: 'gray.600',
                }}
                onClick={()=> onfileRemove(file)}
                >
                    <HiDocumentRemove color='red' size={20} />
                </Box>

            </HStack>
            <Text>{getFileName()}</Text>
            <Text>{filesize(file.size)}</Text>
        </Stack>
    </HStack>
}


const ChatMessage = ({ isSender, isImage }) => {
    return <HStack justify={isSender ? 'flex-end' : 'flex-start'} my={2} >
        <Box boxShadow={'sm'} bg={'#FFF'} p={1} width={'auto'} maxW={'40%'} borderColor={'gray.100'} borderRadius={3} borderWidth={'1.5px'} >
            <Text fontWeight={'400'} fontSize={'sm'} fontStyle={'italic'} color={'gray.600'} >{isSender ? 'You' : 'Someone'}</Text>
            {isImage ? <Image src={'https://picsum.photos/id/1015/200/300'} maxH={150} width={'auto'} /> : null}
            <Text fontSize={'md'} >{isSender ? 'Hi, I am using this app' : 'Hi, I am using this app'}</Text>
            <Text fontSize={'smaller'} fontStyle={'italic'} color={'gray.400'} >{isSender ? '10:00 PM' : '10:03 PM'}</Text>
        </Box>
    </HStack>
}


export {
    ChatContainer,
    ChatInput
}