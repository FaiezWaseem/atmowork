import { Center, Stack, HStack, Text , useToast } from '@chakra-ui/react'
import Stripe from 'react-stripe-checkout';
import useUser from '@/providers/userStore';
import api from '@/utils/fetcher';
import styles from "../../../src/css/signin.module.css"
import { useRouter } from 'next/router';


export default function PaymentScreen() {
    //@ts-ignore
    const user = useUser((state) => state.users)
    //@ts-ignore
    const setUser = useUser((state) => state.setUser)
    const plans = { 'Hobby': 5, 'Standard': 15, 'Premium': 30 }
    const amount = plans[user?.plan];
    const title = `${user?.plan} Plan`;
    const description = `${user?.plan} Plan of ${amount}$/month Charge`;
    const router = useRouter();
    const toast = useToast();
    const email = user?.email;
    const handleToken = (token) => {
        try {
            api.post('/api/auth/stripe-pay', {
                email,
                token: token?.id,
                plan: user?.plan,
            })
                .then(res => { if (res.data) {
                    const { data }= res;
                    if(data.status === "succeeded"){
                        setUser(null)
                       router.push('/dashboard/home/')
                    }else{
                     toast({
                        title : 'Payment Failed',
                        duration : 5000,
                        isClosable : false
                     })
                    }
                }})

        } catch (error) {
            toast({
                title : 'Payment Failed',
                description : error.message,
                duration : 5000,
                isClosable : false
             })
            console.log(error)
        }
    }
    return <Center h={'100vh'} className={styles.bgPayment} >
        <HStack w={'60%'} height={'80%'} shadow={'2xl'} borderRadius={16} bg={'white'}  >
            <Center w={'45%'} className={styles.payment_rectangle} height={'100%'} position={'relative'} >
                <Stack width={350} height={200} className={styles.payment_card} position={'absolute'} left={-20} >
                    <HStack justifyContent={'flex-end'} paddingRight={6} paddingTop={2} >
                        <img src="../../assets/visa.png" alt="master card" width={40} />
                        <img src="../../assets/visa2.png" alt="Visa card" width={40} />
                    </HStack>
                    <Stack paddingLeft={8}>
                        <Stack width={'50px'} height={'50px'} bg={'gold'} borderRadius={8} >

                        </Stack>
                    </Stack>
                    <HStack justify={'space-evenly'} marginTop={2} >
                        <HStack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                        </HStack>
                        <HStack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                        </HStack>
                        <HStack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                            <Stack borderRadius={'50%'} bg={'white'} width={2} height={2} ></Stack>
                        </HStack>
                    </HStack>
                    <Stack paddingLeft={9} marginTop={3} >
                        <Text color={'white'} >20/3</Text>
                    </Stack>
                </Stack>
            </Center>
            <Stripe
                stripeKey={'pk_test_51LY9pJJVyYfqVSZyedaiNkbPJbvZULEyjsXZr3LvNXQCajt25KfE1mOJCHL1omnKDzY0jE28wY31NHI91VqkwqGZ00bDBtgp1Q'}
                token={(token) => handleToken(token)}
                // billingAddress={true}
                email={email}
                name={title}
                description={description}
                amount={100 * amount}
                
                panelLabel='Pay '
                currency='USD'
            />
        </HStack>

    </Center>
} 