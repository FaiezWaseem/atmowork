import { Center, Stack } from '@chakra-ui/react'
import Stripe from 'react-stripe-checkout';
import useUser from '@/providers/userStore';
import api from '@/utils/fetcher';

export default function PaymentScreen() {
    //@ts-ignore
    const user = useUser((state) => state.users)
    const plans = { 'Hobby' : 5 , 'Standard': 15 , 'Premium' : 30}
    const amount = plans[user.plan];
    const title = `${user.plan} Plan`;
    const description = `${user.plan} Plan of ${amount}$/month Charge`;
    console.log(user)
    const email = user.email;
    const handleToken = (token) => {
        try {
            api.post('/api/auth/stripe-pay', {
                email,
                token: token.id,
                plan : user.plan,
            })
                .then(res => { if (res.data) console.log(res.data) })

        } catch (error) {
            console.log(error)
        }
    }
    return <Center h={'100vh'} >
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
    </Center>
}