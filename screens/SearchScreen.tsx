import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import { GET_SNIPPETS_BY_KEYWORD } from '../graphQLQueries';

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  
  const [loadResults, { called, loading, data }] = useLazyQuery(
    GET_SNIPPETS_BY_KEYWORD,
  );

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <View style={styles.container}>
      <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => {
            console.log(text);
            loadResults({
              variables: {
                keyword: text
              }
            });
            setSearchQuery(text);
          }}
          value={searchQuery}
      />
      <View>
        { (called && loading) ? 
          <Text>Loading...</Text>  
          :
          <View>
            <Text>
              dgsdfg
            {JSON.stringify(data)}
            </Text>
          </View>
        }
      </View>
    </View>
  );
}

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
  }
});
