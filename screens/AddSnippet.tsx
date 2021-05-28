import { useMutation } from '@apollo/client'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Dialog, Paragraph, Portal, TextInput, Title } from 'react-native-paper'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { useSelector } from 'react-redux'
import { ADD_SNIPPET } from '../graphQLQueries'
import { AddSnippetData, Snippets, SnippetsList, UserInterface } from '../types'

const AddSnippet = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editorHTML, setEditorHTML] = useState<string>('<pre>Write some code here perhaps.</p>');
    const richText = React.createRef<any>() || useRef();
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);

    const showErrorDialog = () => setErrorVisible(true);
    const hideErrorDialog = () => setErrorVisible(false);

    const showSuccessDialog = () => setSuccessVisible(true);
    const hideSuccessDialog = () => setSuccessVisible(false);
    // const userId = useSelector((state: UserInterface) => state.)

    const [addSnippet, { error, data }] = useMutation<Snippets, AddSnippetData>(ADD_SNIPPET
    );

    useEffect(() => {
        if(error !== undefined) {
            console.log(JSON.stringify(error, null, 2));
            console.log('Something went wrong');
            showErrorDialog();
        }
    }, [error])

    useEffect(() => {
        if(data !== undefined) {
            console.log(JSON.stringify(data, null, 2));
            showSuccessDialog();
            setTitle('')
            setDescription('')
            setEditorHTML('')
        }
    }, [data])

    const handleSubmit = () => {
        if(title.length !== 0 && description.length !== 0 && editorHTML.length !== 0) {
            addSnippet({
                variables: { title: title, description: description, snippet: editorHTML, userId: "1" }
            });
        }
    }

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
                    value={description}
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
                <Button style={styles.button} onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
            <Portal>
                <Dialog visible={errorVisible} onDismiss={hideErrorDialog}>
                <Dialog.Title>Try Again!</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Something Went Wrong!</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideErrorDialog}>Done</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
            <Dialog visible={successVisible} onDismiss={hideSuccessDialog}>
                <Dialog.Title>Success!</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Added successfully!</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideSuccessDialog}>Done</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
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
        marginVertical: 10,
    },
    button: {
        marginTop: 30
    }
})

export default AddSnippet
