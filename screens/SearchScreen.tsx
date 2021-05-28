import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import { GET_SNIPPETS_BY_KEYWORD } from '../graphQLQueries';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Snippets, SnippetsSearchResults } from '../types';
import HTML from 'react-native-render-html';

interface loadResultsInput {
  keyword: string;
}

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Snippets[]>([]);
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  
  const [loadResults, { called, loading, data }] = useLazyQuery<SnippetsSearchResults, loadResultsInput>(
    GET_SNIPPETS_BY_KEYWORD,
  );

  //set the state based on data received
  useEffect(() => {
    if(data?.snippetsByKeyword == null || data?.snippetsByKeyword.length === 0) {
      setSearchResults([])
    } else if(data?.snippetsByKeyword.length > 0) {
      setSearchResults(data.snippetsByKeyword);
    }
  }, [data])

  //clear the screen when search bar empty
  useEffect(() => {
    if(searchQuery.length === 0) {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <View style={styles.container}>
      <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchQuery(text);  
            if(text.length > 0) {
              loadResults({
                variables: {
                  keyword: text
                }
              });
            }
          }}
          value={searchQuery}
      />
      <View>
        { (called && loading) ? 
          <Text>Fetching from the server</Text>  
          :
            searchResults.map((snippet) => {
              return (
                <View key={snippet.id} style={styles.cardParent}>
                  <Card style={styles.card}>
                    <Card.Content>
                    <Card.Content>
                      <Title>{snippet.title}</Title>
                      <Paragraph>{snippet.description}</Paragraph>
                    </Card.Content>
                      <View style={styles.HTMLbody}>
                          <HTML source={{ html: snippet?.snippet }} />
                      </View>
                    </Card.Content>
                  </Card>
                </View> 
              )
            } 
          )
        } 
      </View>
    </View>
  );
}

//a@b.com

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    borderRadius: 30
  },
  card: {
    marginTop: 20,
    borderRadius: 20,
    minWidth: Dimensions.get('window').width - 30,

  },
  cardParent: {
    // flex: 1
  },
  HTMLbody: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  }
});
