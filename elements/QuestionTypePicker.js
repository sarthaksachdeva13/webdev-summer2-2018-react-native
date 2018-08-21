import React, {Component} from 'react';
import {Picker, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import EssayQuestionEditor from "./EssayQuestionEditor";
import FillInBlanksQuestionEditor from "./FillInBlanksQuestionEditor";

export default class QuestionTypePicker extends Component {
    static navigationOptions = {title: 'Add Question'}
    constructor(props) {
        super(props);
        this.state = {questionType: 'MC', examId: 1}
        this.displayQuestionType = this.displayQuestionType.bind(this);

    }

    componentDidMount() {
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
    }

    render() {
        return (
            <ScrollView>
                <Picker
                    selectedValue={this.state.questionType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                {this.displayQuestionType()}
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props
                               .navigation
                               .goBack()}/>
            </ScrollView>
        )
    }

    displayQuestionType() {
        if (this.state.questionType === 'MC') {
            return (
                <MultipleChoiceQuestionEditor examId={this.state.examId}/>
            )
        } else if (this.state.questionType === 'ES') {
            return (
                <EssayQuestionEditor examId={this.state.examId}/>
            )
        } else if (this.state.questionType === 'TF') {
            return (
                <TrueFalseQuestionEditor examId={this.state.examId}/>
            )
        } else {
            return (
                <FillInBlanksQuestionEditor examId={this.state.examId}/>
            )
        }
    }
}
