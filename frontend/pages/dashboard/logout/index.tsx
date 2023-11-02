import React from 'react'
import { Stack } from '@chakra-ui/react'
import SideBar from '@/components/dashboard/sidebar/index'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import useUser from '@/providers/userStore'

export default function Home() {
    const [cookies, removeCookie] = useCookies();
    //@ts-ignore
    const setUser = useUser((state) => state.setUser)
    const router = useRouter();
    React.useEffect(() => {
        setUser({})
        removeCookie('token', '')
        router.replace('/')
    }, [])
    return <Stack>
        <SideBar>
            <h1>Signin.. Out</h1>
        </SideBar>
    </Stack>
}