import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Title, Paragraph, Subheading, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Feed from '../components/Feed';
import { Text as DefaultText } from 'react-native'; 
import { Text, View } from '../components/Themed';
import { UserInterface } from '../reducers/authReducer';
import { QuoteInterface, Snippets, SnippetsList, SnippetsQueryInput } from '../types';
import { GET_SNIPPETS } from '../graphQLQueries'
import HTML from 'react-native-render-html';

export default function TabOneScreen() {
  const [quote, setQuote] = useState<QuoteInterface>({
    quote: '',
    author: ''
  });
  const [modalContent, setModalContent] = useState<Snippets>();
  const user = useSelector((state: UserInterface) => state.user);
  const navigation = useNavigation();

  const { loading, data, refetch } = useQuery<SnippetsList, SnippetsQueryInput>(
    GET_SNIPPETS, {
      variables: { userId: user.id },
    }
  )

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

  return (
    <View style={styles.container}>
      <View>
          <Button style={styles.logoutButton} mode="contained" onPress={() => console.log('Logout')}>
            Logout
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

      {loading ? 
      <Text>Loading...</Text>
      :
      (
      <View>
        <ScrollView>
          <Feed snippets={data.snippetsForUser} setModalToShow={setModalToShow}/>        
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
                <HTML source={{ html: modalContent?.snippet }} />
              </DefaultText>
              </View>
          </Modalize>
        </View>
      </View>
      )
      }
      
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
    backgroundColor: 'white',
  }
});
