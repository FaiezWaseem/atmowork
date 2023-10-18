import React from "react";
import { Stack, Center, Text, HStack, Radio, RadioGroup, Input, InputGroup, InputRightElement, Button, useBreakpointValue } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from '../../src/css/signin.module.css'
import { Carousel } from 'react-responsive-carousel';

export default function Register() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return <Center className={styles.mainBg} >

        <HStack padding={useBreakpointValue({ base: 2, lg: 6 })} bgColor={'white'} borderRadius={8} shadow={'2xl'} maxH={'90vh'} maxW={useBreakpointValue({ base: '90vw', lg: '70vw' })} >
            <Stack
                padding={useBreakpointValue({ base: 0, lg: 6 })} justifyContent={'space-around'}
                borderRadius={8} bgColor={'#934DCA'}
                width={useBreakpointValue(
                    { base: '0%', lg: '40%' }
                )}
                height={'85vh'}
            >
                <Stack>
                    <Text color={'white'} >AtmoWork</Text>
                    <Text lineHeight={1} color={'white'} fontSize={26} fontWeight={'bold'} >Start Your journey with us.</Text>
                    <Text lineHeight={0.9} color={'white'} width={'70%'} >Discover the world’s best productivity management for big and small work.</Text>
                </Stack>
                <Stack marginTop={8}>
                    <Carousel>
                        <CarousalCard />
                        <CarousalCard />
                        <CarousalCard />
                    </Carousel>
                </Stack>
            </Stack>
            <Center width={useBreakpointValue({ base: '100%', lg: '60%' })} height={'85vh'} paddingLeft={useBreakpointValue({ base: 0, lg: 5 })} >
                <Stack width={useBreakpointValue({ base: '100%', lg: '90%' })} >
                    <Text lineHeight={0.4} fontSize={24} fontWeight={'bold'} >SignUp</Text>
                    <HStack marginY={4}>
                        <RadioGroup>
                            <HStack justifyContent={'space-between'} width={useBreakpointValue({ base: '70vw', lg: '30vw' })} alignItems={'center'} >
                                <Stack width={'60%'} borderWidth={'1px'} borderColor={'gray.300'}
                                    paddingY={3} paddingX={useBreakpointValue({ base: 4, lg: 12 })} borderRadius={8} >
                                    <Radio value='personal'>Personal</Radio>
                                </Stack>
                                <Stack width={'60%'} borderWidth={'1px'} borderColor={'gray.300'}
                                    paddingY={3} paddingX={useBreakpointValue({ base: 4, lg: 12 })} borderRadius={8} >
                                    <Radio value='team'>Team</Radio>

                                </Stack>
                            </HStack>
                        </RadioGroup>
                    </HStack>
                    <Text >Username :</Text>
                    <Input placeholder='Enter a Username' />
                    <Text >Email :</Text>
                    <Input placeholder='Enter your Email address' />
                    <Text >Password :</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text >Confirm Password :</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Center>
                        <Button width={200} bgColor={'#934DCA'} color={'white'} >Register</Button>
                    </Center>
                    <HStack justifyContent={'center'} >
                        <Text textAlign={'center'}>Existing User?</Text><Text as={'a'} href="./signin" color={'#934DCA'}>SignIn</Text>
                    </HStack>
                </Stack>
            </Center>
        </HStack>
    </Center>
}



const CarousalCard = () => {
    return <Stack padding={8} bgColor={'#AE50CF'} borderRadius={8}  >
        <Text color={'white'} width={'100%'} >“Productivity is being able to do things that you were never able to do before.”</Text>
        <HStack>
            <img src="../assets/images/user_icon.png" alt="avatar" style={{
                width: '40px !important',
                height: '40px !important',
            }} />
            <Stack>
                <Text lineHeight={0.7} color={'white'} >Antony .Jr</Text>
                <Text color={'white'} >CEO at abc</Text>
            </Stack>
        </HStack>
    </Stack>
}