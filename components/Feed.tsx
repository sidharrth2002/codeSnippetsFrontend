import React from 'react'
import { View, Text, TouchableOpacityComponent } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import HTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel'
import FeedCard from './FeedCard'

interface ItemProps {
  title: string;
  description: string;
  snippet: string;
  comments: string[]
}

interface FeedState {
  activeIndex: number;
  carouselItems: ItemProps[];
}

class Feed extends React.Component<any, FeedState> {
  ref = React.createRef<any>();
  state = {
    activeIndex: 0,
    carouselItems: [
      {
        title: "How To Invert A Binary Tree?",
        description: "Flip the left and the right using recursion.",
        snippet: `<p>CSS is the perfect language to use for inverting binary trees.</p>`,
        comments: []
      },
      {
        title: "How To Traverse A Binary Tree?",
        description: "Text 1",
        snippet: `<p>CSS is the perfect language to use for traversing binary trees.</p>`,
        comments: []
      },
    ],
  };

  renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
        <FeedCard title={item.title} description={item.description} snippet={item.snippet} comments={item.comments} />
    );
  };

  render() {
    return (
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
          <Carousel
            layout={"default"}
            ref={this.ref}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this.renderItem}
            onSnapToItem={(index: number) => this.setState({ activeIndex: index })}
          />
        </View>
    );
  }
}

export default Feed;