import React from 'react'
import { Stack , Heading} from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { useRouter } from 'next/router'
import useUser from '@/providers/userStore'

export default function Home() {
    //@ts-ignore
    const setUser = useUser((state) => state.setUser)
    const router = useRouter();
    React.useEffect(() => {
        setUser(null) 
        window.Cookies.remove('token')
        router.replace('/')
    }, [])
    return <Stack>
        <SideBar>
            <Heading  m={8} color='red' >Signing.. Out</Heading>
        </SideBar>
    </Stack>
}