import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput, Title } from 'react-native-paper'
import { actions, RichEditor } from 'react-native-pell-rich-editor'

const AddSnippet = () => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const ref = React.createRef<any>();

    return (
        <View style={styles.container}>
            <Title style={styles.heading}>
                Add a New Snippet
            </Title>
            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    label="Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    style={styles.textInput}
                    label="Description"
                    value={title}
                    onChangeText={desc => setDescription(desc)}
                />
                <RichEditor
                    onChange={(text) => console.log(text)}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertImage,
                        'customAction',
                    ]}
                    ref={ref}
                    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    editorInitializedCallback={() => console.log('Up and running editor')}
                />            
                <Button style={styles.button} onPress={() => console.log('Click submitted')}>
                    Submit
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        padding: 20
    },
    heading: {
        fontSize: 30,
        paddingLeft: 40,
        marginBottom: 30
    },
    form: {

    },
    textInput: {
        marginVertical: 10
    },
    button: {
        marginTop: 30
    }
})

export default AddSnippet
