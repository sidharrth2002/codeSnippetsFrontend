import React from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Text } from "react-native";
import HTML from "react-native-render-html";
interface FeedCardProps {
    title: string,
    description: string
    snippet: string,
    comments: string[],
    onPress: Function
}

const FeedCard = ({ title, description, snippet, comments, onPress }: FeedCardProps): JSX.Element => {
    return (
        <React.Fragment>
            <TouchableHighlight onPress={() => {
                console.log('I am clicked');
                onPress({
                    title: title,
                    description: description,
                    snippet: snippet,
                    comments: comments
                })
            }}>
                <View
                    style={{
                        backgroundColor: "floralwhite",
                        borderRadius: 5,
                        height: 400,
                        minWidth: 300,
                        padding: 30,
                        marginLeft: 25,
                        marginRight: 25,
                    }}
                >
                    <Text style={{ fontSize: 30 }}>{title}</Text>
                    <View style={styles.HTMLSnippet}>
                        <HTML source={{ html: snippet }} />
                    </View>
                </View>
            </TouchableHighlight>  
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    image: {
        padding: 0,
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
    },
    code: {
        padding: 10
    },
    codeInside: {
        padding: 60
    },
    HTMLSnippet: {
        marginTop: 30
    }
})

export default FeedCard
