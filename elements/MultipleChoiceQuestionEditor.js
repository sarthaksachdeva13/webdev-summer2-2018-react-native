import React from 'react'
import {ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


const EXAM_API_URL = 'http://localhost:8080/api/exam';

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            question: {id: '', title: '', description: '', points: 0, optionText: '', options: [], correctOption: ''},
            examId: ''
        };
        this.addChoice = this.addChoice.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.checkId = this.checkId.bind(this);
        this.saveMultipleChoice = this.saveMultipleChoice.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }


    updateForm(text, parameter) {
        let state = this.state.question;
        if (parameter === 'points') {
            state.points = text;
        } else if (parameter === 'title') {
            state.title = text;
        } else if (parameter === 'description') {
            state.description = text;
        } else if (parameter === "optionText") {
            state.optionText = text;
        } else if (parameter === "options") {
            state.options = text;
        } else if (parameter === "correctOption") {
            state.correctOption = text;
        }

        this.setState(state)
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm(text, "title")
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm(text, "description")
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput
                    keyboardType="numeric"
                    onChangeText={
                        points => this.updateForm(points, "points")}/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <FormLabel>Choices</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm(text, "optionText")
                }/>
                <Button title="Add Choice" onPress={() => this.addChoice()}/>


                <Text h3>Preview</Text>
                <Text h3>Question {this.state.question.id} - {this.state.question.title}</Text>
                <Text h3>{this.state.question.points} pts</Text>
                <Text>{this.state.question.description}</Text>
                {this.renderOptions()}
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => this.saveMultipleChoice()}/>
                <Button hidden={this.checkId()} title="Delete" onPress={() => this.deleteQuestion()}/>

            </ScrollView>
        )
    }

    addChoice(text) {
        this.state.question.options.push(this.state.question.optionText);
        this.updateForm('', "optionText");
    }

    renderOptions() {
        if (this.state.question.options && this.state.question.options.length > 0) {
            console.log("options " + this.state.question.options.length);
            this.state.question.options.forEach(option => {
                return (
                    <Text>{option}</Text>
                )
            })
        }
    }


    checkId() {
        if (this.state.question.id && this.state.question.id != '') {
            return true;
        }
        else return false;
    }

    saveMultipleChoice() {
        console.log(this.state.examId);
        return fetch(EXAM_API_URL + "/" + this.state.examId + "/choice",
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

export default MultipleChoiceQuestionEditor