import React, {Component} from 'react';
import {TextInput, ScrollView} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Text, Button} from 'react-native-elements';

const EXAM_API_URL = 'http://localhost:8080/api/exam';

export default class EssayQuestionEditor extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            question: {id: '', title: '', description: '', points: 0},
            examId: ''
        }
        this.state.examId = this.props.examId;
        this.saveEssayQuestion = this.saveEssayQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.checkId = this.checkId.bind(this);

    }

    componentDidMount() {
        this.state.examId = this.props.examId;
    }

    formUpdate(text, parameter) {
        let state = this.state.question;
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
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate(text, "title") }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate(text, "description")}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput
                    keyboardType="numeric"
                    onChangeText={
                    points => this.formUpdate(points, "points")}/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>


                <Text h3>Preview</Text>
                <Text h3>Question {this.state.question.id} - {this.state.question.title}</Text>
                <Text h3>{this.state.question.points} pts</Text>
                <Text>{this.state.question.description}</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={5}/>
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.saveEssayQuestion()}/>
                <Button hidden={this.checkId()} title="Delete" onPress={() => this.deleteQuestion()}/>
            </ScrollView>
        )
    }

    checkId() {
        if (this.state.question.id && this.state.question.id != '') {
            return true;
        }
        else return false;
    }

    saveEssayQuestion() {
        console.log(this.state.examId);
        return fetch(EXAM_API_URL + "/" + this.state.examId + "/essay",
            {
                body: JSON.stringify(this.state.question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { console.log(response);
            return response.json(); })
    }

    deleteQuestion() {
        return fetch(EXAM_API_URL + '/' + this.state.question.id,
            {
                method: 'DELETE'
            })
    }
}
