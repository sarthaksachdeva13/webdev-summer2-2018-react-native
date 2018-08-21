import React, {Component} from 'react'
import {ButtonGroup} from 'react-native-elements'

class QuestionTypeButtonGroupChooser extends Component {
    render () {
        const questionTypes = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse'];
        const { selectedQuestionTypeIndex } = this.state;
        return (
            <ButtonGroup
                onPress={() => this.selectQuestionType}
                selectedIndex={this.state.selectedQuestionTypeIndex}
                buttons={questionTypes}
                containerStyle={{height: 75}}/>)};

    static navigationOptions = { title: 'Create Question' };
    constructor (props) {
        super(props);
        this.state = { selectedQuestionTypeIndex: 0 };
        this.selectQuestionType = this.selectQuestionType.bind(this)
    }

    selectQuestionType (newQuestionTypeIndex) { this.setState({selectedQuestionTypeIndex: newQuestionTypeIndex}) }

} export default QuestionTypeButtonGroupChooser
