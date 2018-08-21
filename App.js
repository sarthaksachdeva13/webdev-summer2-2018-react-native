import React, {Component} from 'react';
import {Text, View, StatusBar, ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import Exam from './elements/Exam'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './components/AssignmentWidget'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import FillInBlanksQuestionEditor from './elements/FillInBlanksQuestionEditor'

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
            </ScrollView>
        )
    }
}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"};

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() => this.props
                            .navigation
                            .goBack()}/>
            </View>
        )
    }
}

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
);

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    AssignmentWidget,
    Exam,
    QuestionList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    QuestionTypePicker,
    EssayQuestionEditor,
    FillInBlanksQuestionEditor
});

export default App;
