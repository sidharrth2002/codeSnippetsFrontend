import { NetworkStatus, useLazyQuery, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Title, Paragraph, Subheading, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../components/Feed';
import { Text as DefaultText } from 'react-native'; 
import { Text, View } from '../components/Themed';
import { UserInterface } from '../reducers/authReducer';
import { DeleteSnippetData, QuoteInterface, Snippets, SnippetsList, SnippetsQueryInput } from '../types';
import { DELETE_SNIPPET, GET_SNIPPETS } from '../graphQLQueries'
import HTML from 'react-native-render-html';

export default function TabOneScreen() {
  const [quote, setQuote] = useState<QuoteInterface>({
    quote: '',
    author: ''
  });
  const [modalContent, setModalContent] = useState<Snippets>();
  const user = useSelector((state: UserInterface) => state.user);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, data, refetch, networkStatus } = useQuery<SnippetsList, SnippetsQueryInput>(
    GET_SNIPPETS, {
      variables: { userId: user.id },
      notifyOnNetworkStatusChange: true,
      onCompleted: data => {
        console.log('Fetch Completed');
        console.log('data', data);
      },
    }
  )

  useEffect(() => {
    if(!loading && data) {
      console.log(data);
    }
  }, [loading, data])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused');
      refetch();
      console.log('after');
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const modalizeRef = useRef<Modalize>(null);

  const setModalToShow = (card: Snippets) => {
    setModalContent(card);
    modalizeRef.current?.open();
  }

  useEffect(() => {
    axios.get('https://zenquotes.io/api/random')
    .then(response => {
      setQuote({
        quote: response.data[0].q,
        author: response.data[0].a
      });
    })
  }, [])

  if (networkStatus === NetworkStatus.refetch) return <Text>'Refetching!'</Text>;
  if(loading) return null;
  if(error) return <Text>{JSON.stringify(error)}</Text>;

  return (
    <View style={styles.container}>
      <View>
          <Button style={styles.logoutButton} mode="contained" onPress={() => {
            navigation.navigate('Login')
            // dispatch({
            //   type: 'LOGOUT',
            //   payload: {}
            // })
          }}>
            <Text>Logout</Text>
          </Button>
        </View>
      <View style={styles.headingBox}>
        
          <Text style={styles.title}>Welcome {user.name}!</Text>
          <View style={styles.quoteBox}>
              <Paragraph style={styles.quote}>{quote.quote}</Paragraph>
              <Paragraph>- {quote.author}</Paragraph>
              <Subheading>Here are a few code snippets for you to try!</Subheading>
          </View>
      </View>

      {/* {loading ?  */}
      {/* <Text>Loading...</Text> */}
      {/* :
      ( */}
      <View>
        <ScrollView>
          <Feed snippets={data?.snippetsForUser} setModalToShow={setModalToShow}/>        
        </ScrollView>    

        <View style={styles.modal}>
          <Modalize ref={modalizeRef}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>
              {modalContent?.title}
              </Title>
              <Subheading style={styles.modalTitle}>
                {modalContent?.description}
              </Subheading>
              <DefaultText>
                <HTML source={{ html: modalContent?.snippet as string }} />
              </DefaultText>
              </View>
          </Modalize>
        </View>
      </View>
      {/* )
      } */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  headingBox: {
    marginTop: 100,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  quoteBox: {
    paddingTop: 30,
    paddingHorizontal: 50
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  modal: {
    marginTop: 300,
  },
  modalTitle: {
    color: 'black'
  },
  modalContent: {
    backgroundColor: 'white',
    minHeight: 500,
    padding: 20,
    borderRadius: 20
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    color: 'black'
  }
});