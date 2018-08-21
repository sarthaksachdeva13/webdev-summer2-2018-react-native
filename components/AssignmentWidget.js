import React, {Component} from 'react'
import {View, TextInput} from 'react-native'
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

const ASSIGNMENT_API_URL = 'http://localhost:8080/api/assignment';
const LESSON_API_URL = "http://localhost:8080/api/lesson/{LID}/assignment";


class AssignmentWidget extends Component {

    static navigationOptions = {title: 'Assignments'};

    constructor(props) {
        super(props)
        this.state = {
            assignment: {id: '', title: '', description: '', points: 0, href: '', widgetType: "Assignment"},
            lessonId: 1,
            widgetId: ''
        }
        this.createNewAssignment = this.createNewAssignment.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.state.lessonId = lessonId;
        this.state.assignment = navigation.getParam("assignment")
    }


    updateForm(text, parameter) {
        let state = this.state.assignment;
        if (parameter === 'points') {
            state.points = text;
        } else if (parameter === 'title') {
            state.title = text;
        } else if (parameter === 'description') {
            state.description = text;
        } else if (parameter === 'link') {
            state.href = text;
        }

        this.setState(state)
    }

    render() {
        return (
            <View style={{padding: 15}}>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title}
                           onChangeText={
                               text => this.updateForm(text, "title")
                           }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description}
                           onChangeText={
                               text => this.updateForm(text, "description")
                           }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput keyboardType="numeric"
                           value={this.state.points}
                           onChangeText={
                               text => this.updateForm(text, "points")
                           }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Text h1>Preview</Text>
                <Text>Assignment: {this.state.assignment.id} - {this.state.assignment.title}</Text>
                <Text>{this.state.assignment.points} pts</Text>
                <Text>{this.state.assignment.description}</Text>
                <Text>Essay Answer</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={5}/>
                <Text>Upload a File</Text>

                <FormLabel>Submit a Link</FormLabel>
                <FormInput value={this.state.href} onChangeText={text => this.updateForm(text, "link")}/>

                <Button title="Cancel" onPress={() => this.props
                    .navigation
                    .goBack()}/>
                <Button title="Submit" onPress={() => this.createNewAssignment()}/>
                <Button title="Delete" onPress={() => this.deleteAssignment()}/>
            </View>
        )
    }

    createNewAssignment() {
        this.createAssignment(this.state.lessonId, this.state.assignment)
            .then(this.props.navigation
                .navigate("WidgetList", {lessonId: this.state.lessonId}))
    }

    createAssignment(lessonId, assignment) {
        return fetch(LESSON_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }


    deleteAssignment() {
        return fetch(ASSIGNMENT_API_URL + '/' + this.state.assignment.id,
            {
                method: 'DELETE'
            })
    }

}

export default AssignmentWidget