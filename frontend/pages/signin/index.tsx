import React from "react";
import { Stack, Center, Text, HStack, useBreakpointValue, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import styles from '../../src/css/signin.module.css'
import { useToast } from "@chakra-ui/react";
import api from "@/utils/fetcher";
import { useRouter } from "next/router";

export default function SignIn() {
    const router = useRouter();
    const toast = useToast()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const Submit = async ()=>{
        try {
        setLoading(true)
        const response = await api.post('/api/auth/signin', {
            email,
            password
        })
        const { success, message } = response.data;
        if(success){
            setLoading(false)
            toast({
                title: 'Account SignedIn',
                description: message,
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top'
            })
            console.log(response.data)
            router.push('/')
        }else{
            setLoading(false)
            toast({
                title: 'Account Invalid',
                description: message,
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'top'
            })
        }
        
    } catch (error) {
        setLoading(false)       
        toast({
            title: 'Account',
            description: 'Server Crashed',
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: 'top'
        })
    }
    }
    return <Center className={styles.mainBg} >

        <HStack padding={6} bgColor={'white'} borderRadius={8} shadow={'2xl'} minH={'90vh'} minW={useBreakpointValue({ base: '95vw', lg: '70vw' })} >
            <Center display={useBreakpointValue({ base: 'none', md: 'block', lg: 'block' })} borderRadius={useBreakpointValue({ base: 0, lg: 8 })} bgColor={'#934DCA'} width={useBreakpointValue({ base: '0%', lg: '40%' })} height={'85vh'} >
                <Stack alignItems={'center'}>
                    <img src="./logo_white_transparent.png" alt="" />
                    <Text color={'white'} >Welcome To</Text>
                    <Text color={'white'} fontSize={22} fontWeight={'bold'} >AtmoWork</Text>
                </Stack>
            </Center>
            <Center width={useBreakpointValue({ base: '100%', lg: '60%' })} height={'85vh'} paddingLeft={5} >
                <Stack width={useBreakpointValue({ base: '100%', lg: '90%' })}>

                    <img src="./logo_transparent.png" alt="logo" width={useBreakpointValue({ base: 100, lg: 100, xl: 140 })} height={useBreakpointValue({ base: 100, lg: 100, xl: 140 })} />
                    <Text lineHeight={0.4} fontSize={26}>Welcome Back,</Text>
                    <Text color={'gray.500'} >Signin to Continue</Text>
                    <Text >Email :</Text>
                    <Input placeholder='Enter your Email address' value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <Text >Password :</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password} onChange={(e)=> setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text as='a' href="#" style={{ textAlign: 'end', textDecoration: 'underline' }}>Forget Password?</Text>
                    <Center>
                        <Button isLoading={isLoading} width={200} bgColor={'#934DCA'} color={'white'} onClick={Submit} >Login</Button>
                    </Center>
                    <HStack justifyContent={'center'} >
                        <Text textAlign={'center'}>New User?</Text><Text as={'a'} href="./register" color={'#934DCA'}>SignIn</Text>
                    </HStack>
                </Stack>
            </Center>

        </HStack>

    </Center>
}