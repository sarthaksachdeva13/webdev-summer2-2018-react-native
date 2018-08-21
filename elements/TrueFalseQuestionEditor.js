import React, {Component} from 'react';
import {View} from 'react-native';
import {CheckBox, FormLabel, FormInput, FormValidationMessage, Text, Button} from 'react-native-elements';

const EXAM_API_URL = 'http://localhost:8080/api/exam';

export default class TrueFalseQuestionEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: {id: '', title: '', description: '', points: 0, isTrue: true},
            examId: ''
        }
        this.checkId = this.checkId.bind(this);
        this.saveTrueFalse = this.saveTrueFalse.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }


    formUpdate(text, parameter) {
        let state = this.state.question;
        if (parameter === 'points') {
            state.points = text;
        } else if (parameter === 'title') {
            state.title = text;
        } else if (parameter === 'description') {
            state.description = text;
        } else if (parameter === 'isTrue') {
            state.isTrue = text;
        }

        this.setState(state)
    }

    render() {
        return (
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({title: text}) }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.formUpdate({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput
                    keyboardType="numeric"
                    onChangeText={
                        points => this.formUpdate({points: points})}/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <CheckBox title='The answer is true'
                          onPress={() => this.formUpdate
                          ({isTrue: !this.state.question.isTrue})}
                          checked={this.state.question.isTrue}/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.question.title}</Text>
                <Text>{this.state.question.description}</Text>
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.saveTrueFalse()}/>
                <Button hidden={this.checkId()} title="Delete" onPress={() => this.deleteQuestion()}/>


            </View>
        )
    }

    checkId() {
        if (this.state.question.id && this.state.question.id != '') {
            return true;
        }
        else return false;
    }

    saveTrueFalse() {
        console.log(this.state.examId);
        return fetch(EXAM_API_URL + "/" + this.state.examId + "/truefalse",
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