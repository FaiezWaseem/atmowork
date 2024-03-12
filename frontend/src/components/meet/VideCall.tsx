import React, { useState, useEffect } from 'react'
import { Stack, Heading, Image, Center, HStack, Button, Text, useToast } from '@chakra-ui/react'
import meetingImg from '../../../public/assets/images/undraw_remote_meeting_re_abe7.svg'


import AgoraUIKit, { layout } from 'agora-react-uikit'
import 'agora-react-uikit/dist/index.css'
import { redirect, useParams } from 'next/navigation'

import { IoGrid } from "react-icons/io5";
import { UserType } from '@/types/types'
import api from '@/utils/fetcher'
import { useRouter } from 'next/router'



export default function VideoCall() {

    const [videocall, setVideocall] = useState(false)
    const [isHost, setHost] = useState(true)
    const [isPinned, setPinned] = useState(true)
    const [username, setUsername] = useState('')
    const [members, setMembers] = useState(1)
    const [uniqueId , setUniqueId] = useState(10002)

    const [ loading , setLoading ] = useState(true)
    const [ isAuthenticated, setAuthenticated ] = useState(false)
    const [ user , setUser ] = useState<UserType |  null>(null)

    const p = useParams()

    const [channel, setChannel] = useState<string>('')

    const toast = useToast()

    const router = useRouter()

    useEffect(() => {
        if (p?.hostId) {
            // @ts-ignore
            setChannel(p.hostId)
            setUniqueId(generateRandomNumber(5))
            fetchUser()
        }
    }, [p])

    const fetchUser = async () => {
        const { data } = await api.get('/api/user')
        if (data.status) {
            setUser(data.user)
            setUsername(data.user.username)
            setAuthenticated(true)
            setLoading(false)
        }else{
            toast({
                title : 'Authentication Failed',
                description : 'Please Login to continue',
                duration : 5000,
                isClosable : false,
                position : 'top-right'
            })
            router.push('/signin')
        }
    }

    function generateRandomNumber(length: number): number {
        let characters = '0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return Number(code);
    }

    if(loading){
        return <>Wait Initializing...</>
    }

    
    if (!videocall && isAuthenticated) {
        return <Stack>
            <Center my={2}>
                <Image src={meetingImg.src} width={300} alt='Meeting Image' />
            </Center>
            <Center>
                <Heading m={8} color='red' >Join Video Call</Heading>
            </Center>
            <Center mb={3}>
                <Button colorScheme='purple' size='md'
                    onClick={() => {
                        if (channel) {
                            setVideocall(true)
                        }
                    }}
                >
                    join
                </Button>
            </Center>
        </Stack>
    } else if (window !== undefined && videocall && isAuthenticated) {
        return <Stack h={'100vh'} >
            <HStack padding={2} bg={'purple.400'} justifyContent={'space-between'} >
                <Text color={'white'}>
                    Members {members}
                </Text>
                <HStack spacing={2} >
                    <Button onClick={() => setPinned(!isPinned)}>
                        <IoGrid />
                    </Button>

                </HStack>
            </HStack>
            {videocall && <AgoraUIKit
                rtcProps={{
                    channel,
                    appId: process.env.NEXT_PUBLIC_AGORA_CLIENT,
                    token: null,
                    role: isHost ? 'host' : 'audience',
                    layout: isPinned ? layout.pin : layout.grid,
                    enableScreensharing: true,
                    screenshareUid: uniqueId,
                }}
                rtmCallbacks={{
                    channel: {
                        MemberCountUpdated(memberCount) {
                            setMembers(memberCount)
                        },
                        MemberJoined(memberId) {
                            console.log('MemberJoined', memberId)
                        },
                        MemberLeft(memberId) {
                            console.log('MemberLeft', memberId)
                        },
                    },
                    client: {
                        PeersOnlineStatusChanged(status) {
                            console.log('PeersOnlineStatusChanged', status)
                        },
                        MessageFromPeer(message, peerId, messageProps) {
                            console.log('MessageFromPeer', message, peerId, messageProps)
                        },
                    }
                }}
                rtmProps={{ username: username || 'user', displayUsername: true }}
                callbacks={{
                    EndCall: () => setVideocall(false),

                }}
            />}
        </Stack>
    }
}