import PageLayout from '@/components/page-layout';
import {
  HStack,
  Stack,
  Text,
  Input,
  Button,
  useBreakpointValue,
  Heading,
  Center
} from '@chakra-ui/react';
import Header from '@/components/layout/header';
import styles from '../src/css/home.module.css'
import { Trans } from 'react-i18next';
import Card from '@/components/home/card';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const IndexPage = () => {
  return (
    <PageLayout
      title='Home | AtmoWork'
      description='Welcome to AtmoWork , Your All in one Project Management Tool . Replace all the hassel and focus more on your work.
      Brings all your tasks, teammates,and tools together.'
    >
      <Stack width={'100vw'} gap={0} >
        <Header />
        <HStack marginBottom={useBreakpointValue({ base: 10, lg: 15 })} flexWrap={useBreakpointValue({ base: 'wrap', lg: 'nowrap' })} >
          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 22 })}
              fontWeight={'bold'}
            >
              <Trans i18nKey={'homeText'} >
                Your All in One Project Management Software
              </Trans>
            </Text>
            <Text marginTop={5} width={useBreakpointValue({ base: '90%', lg: '70%' })} color={'gray.500'} >Replace all the hassel and focus more on your work.
              <Trans i18nKey={'homeBody'} >
                Brings all your tasks, teammates,
                and tools together.
              </Trans>
            </Text>
            <HStack marginTop={5} >
              <Input placeholder='Email' /> <Button
                minW={100}
                bg={'app.btnPurple'}
                color={'white'}
                className={styles.btnText}
              >SignUp</Button>
            </HStack>
          </Stack>
          <Stack w={useBreakpointValue({ base: '0%', lg: '50%' })} minH={useBreakpointValue({ base: '0vh', lg: '70vh' })} justify={'center'} align={'center'} className={styles.heroBg} >
            <img src="./assets/images/kanban_board.gif" alt="kanban_board_gif"
              width={'70%'}
              height={250}
            />
          </Stack>
        </HStack>


        <Center marginY={10} >
          <Heading  >Productivity With Ease</Heading>
        </Center>

        <HStack className={styles.TriangleBg} minH={useBreakpointValue({ base: 300, lg: 600 })} >
          <Center w={useBreakpointValue({ base: '0%', lg: '50%' })} >
            <img src='./assets/images/kanban_board1.png' alt='KanBan' width={useBreakpointValue({
              base: '200px',
              md: '300px',
              lg: '400px'
            })} ></img>
          </Center>
          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 26 })}
              fontWeight={'bold'}
              className={styles.fontstyle}
            >
              Kanban Model
            </Text>
            <Text className={styles.fontstyle}
              marginTop={5}
              width={useBreakpointValue({ base: '90%', lg: '80%' })}
              fontSize={useBreakpointValue({ base: 16, lg: 20 })}
              color={'gray.700'}
            >
              <Trans i18nKey={'kanbanBody'} >
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done
              </Trans>
            </Text>
          </Stack>
        </HStack>
        <HStack className={styles.TriangleBgLeft} minH={useBreakpointValue({ base: 300, lg: 600 })} >

          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 26 })}
              fontWeight={'bold'}
              className={styles.fontstyle}
            >
              Team Collaboration
            </Text>
            <Text className={styles.fontstyle}
              marginTop={5}
              width={useBreakpointValue({ base: '90%', lg: '80%' })}
              fontSize={useBreakpointValue({ base: 16, lg: 20 })}
              color={'gray.700'}
            >
              <Trans i18nKey={'kanbanBody'} >
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
              </Trans>
            </Text>
          </Stack>
          <Center w={useBreakpointValue({ base: '0%', lg: '50%' })} >
            <img src='./assets/images/team.gif' alt='KanBan' width={useBreakpointValue({
              base: '200px',
              md: '300px',
              lg: '400px'
            })} ></img>
          </Center>
        </HStack>
        <HStack className={styles.TriangleBg} minH={useBreakpointValue({ base: 300, lg: 600 })} >
          <Center w={useBreakpointValue({ base: '0%', lg: '50%' })} >
            <img src='./assets/images/search_mind.gif' alt='KanBan' width={useBreakpointValue({
              base: '200px',
              md: '300px',
              lg: '400px'
            })} ></img>
          </Center>
          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 26 })}
              fontWeight={'bold'}
              className={styles.fontstyle}
            >
              Mind Maping
            </Text>
            <Text className={styles.fontstyle}
              marginTop={5}
              width={useBreakpointValue({ base: '90%', lg: '80%' })}
              fontSize={useBreakpointValue({ base: 16, lg: 20 })}
              color={'gray.700'}
            >
              <Trans i18nKey={'kanbanBody'} >
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done
              </Trans>
            </Text>
          </Stack>
        </HStack>
        <HStack className={styles.TriangleBgLeft} minH={useBreakpointValue({ base: 300, lg: 600 })} >

          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 26 })}
              fontWeight={'bold'}
              className={styles.fontstyle}
            >
              Real-Time 24/7 Support
            </Text>
            <Text className={styles.fontstyle}
              marginTop={5}
              width={useBreakpointValue({ base: '90%', lg: '80%' })}
              fontSize={useBreakpointValue({ base: 16, lg: 20 })}
              color={'gray.700'}
            >
              <Trans i18nKey={'kanbanBody'} >
                Get in Touch With our support Team , which is available 24/7 for your service.
              </Trans>
            </Text>
          </Stack>
          <Center w={useBreakpointValue({ base: '0%', lg: '50%' })} >
            <img src='./assets/images/support.gif' alt='KanBan' width={useBreakpointValue({
              base: '200px',
              md: '300px',
              lg: '400px'
            })} ></img>
          </Center>
        </HStack>
        <HStack className={styles.TriangleBg} minH={useBreakpointValue({ base: 300, lg: 600 })} >
          <Center w={useBreakpointValue({ base: '0%', lg: '50%' })} >
            <img src='./assets/images/workflow.gif' alt='KanBan' width={useBreakpointValue({
              base: '200px',
              md: '300px',
              lg: '400px'
            })} ></img>
          </Center>
          <Stack w={useBreakpointValue({ base: '100%', lg: '50%' })} justify={'center'} align={'center'} >
            <Text
              marginTop={useBreakpointValue({ base: 10, lg: 0 })}
              textAlign={'center'}
              as={'h1'}
              fontSize={useBreakpointValue({ base: 18, lg: 26 })}
              fontWeight={'bold'}
              className={styles.fontstyle}
            >
              Manage Work Flow
            </Text>
            <Text className={styles.fontstyle}
              marginTop={5}
              width={useBreakpointValue({ base: '90%', lg: '80%' })}
              fontSize={useBreakpointValue({ base: 16, lg: 20 })}
              color={'gray.700'}
            >
              <Trans i18nKey={'kanbanBody'} >
                Simple, flexible, and powerful. Manage all your workflows with ease of intergration of meet and project document to share project files .
              </Trans>
            </Text>
          </Stack>
        </HStack>
        <Center marginY={10} padding={8}>
          <Heading  >WorkSpace for any project Big or Small</Heading>
        </Center>
        <HStack flexWrap={useBreakpointValue({ base : 'wrap' , lg : 'nowrap' })}  
         overflowX={'scroll'}
         
          >
          <Card />
          <Card />
          <Card />
        </HStack>
      </Stack>
    </PageLayout>
  );
};

export default IndexPage;
