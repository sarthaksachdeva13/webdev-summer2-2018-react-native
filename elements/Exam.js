import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {ListItem, Text, Button, FormValidationMessage, FormInput, FormLabel} from 'react-native-elements';

const EXAM_LESSON_API_URL="http://localhost:8080/api/lesson/{LID}/exam";

export default class Exam extends Component {
    static navigationOptions = {title: 'Exam'};
    constructor(props) {
        super(props);
        this.state = {
            exam: {id: '', title: '', description: '', points: 0, questions: [], widgetType: "Exam"},
            lessonId: 1,
            widgetId: '',
            examId: ''
        }
        this.createNewExam = this.createNewExam.bind(this);
        this.createExam = this.createExam.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.state.lessonId = navigation.getParam("lessonId");
        this.state.exam = navigation.getParam("exam");
        console.log(this.state);
    }

    updateForm(text, parameter) {
        let state = this.state.exam;
        if (parameter === 'points') {
            state.points = text;
        } else if (parameter === 'title') {
            state.title = text;
        } else if (parameter === 'description') {
            state.description = text;
        }

        this.setState(state)
    }


    render() {
        return (

                <ScrollView contentContainerStyle={{flex:1}}>
                    <FormLabel>Title</FormLabel>
                    <FormInput value={this.state.exam.title}
                               onChangeText={
                                text => this.updateForm(text, "title")
                    }/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                    <FormLabel>Description</FormLabel>
                    <FormInput value={this.state.exam.description}
                               onChangeText={
                                text => this.updateForm(text, "description")
                    }/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                    <FormLabel>Points</FormLabel>
                    <FormInput keyboardType="numeric"
                               value={this.state.exam.points}
                               onChangeText={
                                   text => this.updateForm(text, "points")
                               }/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                    <Text h4>Questions</Text>
                    {this.renderListOfQuestions()}

                    <Text h1>Preview</Text>
                    <Text>Exam: {this.state.exam.id} - {this.state.exam.title}</Text>
                    <Text>{this.state.exam.points} pts</Text>
                    <Text>{this.state.exam.description}</Text>
                    {this.renderListOfQuestions()}
                    <Button title="Add New Question" onPress={() => this.props
                        .navigation.navigate("QuestionList", {examId: this.state.exam.id})}/>
                    <Button title="Cancel" onPress={() => this.props
                        .navigation
                        .goBack()}/>
                    <Button title="Submit" onPress={() => this.createNewExam()}/>
                    <Button title="Delete" onPress={() => this.deleteExam()}/>
                </ScrollView>
        )
    }

    renderListOfQuestions() {
        if (this.state.exam.questions && this.state.exam.questions.length > 0) {
            return (
                this.state.exam.questions.map((question, index) => (
                    <ListItem key={index}
                              title={question.title}
                              subtitle={question.subtitle}
                              leftIcon={{name: question.icon}}/>
                ))
            )
        }
    }

    createNewExam() {
        this.createExam(this.state.lessonId, this.state.exam);
    }

    createExam(lessonId, exam) {
        console.log(JSON.stringify(exam));
        return fetch(EXAM_LESSON_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { console.log(response);
        return response.json(); })
    }

    deleteExam() {
        return fetch(EXAM_LESSON_API_URL + '/' + this.state.exam.id,
            {
                method: 'DELETE'
            })
    }


}