import React, { useRef } from 'react'
import { View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import Carousel from 'react-native-snap-carousel'
import { Snippets } from '../screens/HomeScreen';
import FeedCard from './FeedCard'
import { Text } from './Themed';
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

interface QuoteInterface {
  quote: string,
  author: string
}

interface FeedProps {
  snippets: Snippets[],
  setModalToShow: Function
}

class Feed extends React.Component<FeedProps, FeedState> {
  ref = React.createRef<any>();

  state = {
    activeIndex: 0,
    carouselItems: this.props.snippets
  };

  renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <View>
        <FeedCard title={item.title} description={item.description} snippet={item.snippet} comments={item.comments} onPress={this.props.setModalToShow}/>
          <Modalize ref={this.modalizeRef}>
          <Text>{item.description}</Text>
        </Modalize>
      </View>
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