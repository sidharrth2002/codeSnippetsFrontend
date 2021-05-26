import React, { useRef } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput, Title } from 'react-native-paper'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const AddSnippet = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editorHTML, setEditorHTML] = useState<string>('<pre>Write some code here perhaps.</p>');
    const richText = React.createRef<any>() || useRef();

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
                    onChange={(newHTML) => setEditorHTML(newHTML)}
                    ref={richText}
                    initialContentHTML={editorHTML}
                    editorInitializedCallback={() => console.log('Up and running editor')}
                />            
                <RichToolbar
                    editor={richText}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.code,
                        actions.undo,
                        actions.redo,
                        actions.setStrikethrough,
                        actions.checkboxList,
                        actions.insertOrderedList,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.line,
                        actions.foreColor,
                        actions.hiliteColor,
                        actions.heading1,
                        actions.heading4,
                    ]}
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
