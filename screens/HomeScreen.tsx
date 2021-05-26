import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Button, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import EditScreenInfo from '../components/EditScreenInfo';
import Feed from '../components/Feed';
import FeedCard from '../components/FeedCard';
import { Text, View } from '../components/Themed';
import { ReduxStateInterface } from '../reducers/authReducer';

interface QuoteInterface {
  quote: string,
  author: string
}

export default function TabOneScreen() {
  const [quote, setQuote] = useState<QuoteInterface>({
    quote: '',
    author: ''
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: ReduxStateInterface) => state.isAuthenticated);

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
      <View style={styles.headingBox}>
        <Text style={styles.title}>Welcome Sidharrth!</Text>
        <View style={styles.quoteBox}>
            <Paragraph style={styles.quote}>{quote.quote}</Paragraph>
            <Paragraph>- {quote.author}</Paragraph>
            <Subheading>Here are a few code snippets for you to try!</Subheading>
        </View>
      </View>

      <ScrollView>
        <Feed />        
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 50,
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
  }
});
