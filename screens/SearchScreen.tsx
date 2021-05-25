import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
      />
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
