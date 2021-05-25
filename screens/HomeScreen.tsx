import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Button, Subheading } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import Feed from '../components/Feed';
import FeedCard from '../components/FeedCard';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headingBox}>
        <Text style={styles.title}>Welcome Sidharrth!</Text>
        <Subheading>Here are a few code snippets for you to try!</Subheading>
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
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
