import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import { DELETE_SNIPPET, GET_SNIPPETS, GET_SNIPPETS_BY_KEYWORD } from '../graphQLQueries';
import { Card, Title, Paragraph } from 'react-native-paper';
import { DeleteSnippetData, DeleteSnippetResult, Snippets, SnippetsSearchResults } from '../types';
import HTML from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';

interface loadResultsInput {
  keyword: string;
}

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Snippets[]>([]);
  const [sortAlph, setSortAlph] = useState<boolean>(false);
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  
  const [loadResults, { called, loading, data }] = useLazyQuery<SnippetsSearchResults, loadResultsInput>(
    GET_SNIPPETS_BY_KEYWORD,
  );

  const [delSnippet] = useMutation<DeleteSnippetResult, DeleteSnippetData>(DELETE_SNIPPET);

  const deleteSnippet = (id:string) => {
    delSnippet({
      variables: {
        id: id
      }, 
      update: cache => {
        const data = cache.readQuery({query: GET_SNIPPETS_BY_KEYWORD, variables: {
          keyword: searchQuery
        }}) as SnippetsSearchResults;
        const newData = { ...data }
        newData.snippetsByKeyword = newData.snippetsByKeyword.filter(snip => snip.id !== id);
        cache.writeQuery({query: GET_SNIPPETS_BY_KEYWORD, data: newData, variables: {
          keyword: searchQuery
        }});
        console.log('updated');
      }
    })
    setSearchResults([]);
  }

  //set the state based on data received
  useEffect(() => {
    if(data?.snippetsByKeyword == null || data?.snippetsByKeyword.length === 0) {
      setSearchResults([])
    } else {
      console.log(data.snippetsByKeyword);
      if(sortAlph) {
        let newList = [...data.snippetsByKeyword];
        newList.sort((a, b) => a.title < b.title ? 1 : -1);    
        setSearchResults(newList);    
      } else {
        setSearchResults(data.snippetsByKeyword);
      }
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
      <View style={styles.checkboxBox}>
        <Checkbox
          status={sortAlph ? 'checked' : 'unchecked'}
          onPress={() => {
            setSortAlph(!sortAlph);
          }}
        />  
        <Text>Sort Alphabetically</Text>
      </View>
      <ScrollView>
        { (called && loading) ? 
          <Text>Fetching from the server</Text>  
          :
            searchResults.map((snippet) => {
              console.log(snippet.title);
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
                    <Button onPress={() => deleteSnippet(snippet.id)}>Delete</Button>
                  </Card>
                </View> 
              )
            } 
          )
        } 
        </ScrollView>
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
    borderRadius: 30,
    marginBottom: 10
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
  },
  checkboxBox: {
    height: 100,
    alignItems: 'center',
    flexDirection: 'row'
    // marginTop: 50,
  }
});
