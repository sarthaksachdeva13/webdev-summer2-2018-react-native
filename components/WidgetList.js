import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Button} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
        this.determineNavigation = this.determineNavigation.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.state.lessonId = navigation.getParam("lessonId")
        fetch("http://localhost:8080/api/lesson/" + this.state.lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
        console.log(this.state.widgets);
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.determineNavigation(widget)}
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}/>))}
                <Button style={{padding: 15}} title="Add New Assignment"
                        onPress={() => this.props.navigation
                            .navigate("AssignmentWidget", {lessonId: this.state.lessonId})}/>
                <Button style={{padding: 15}} title="Add New Exam"
                        onPress={() => this.props.navigation
                            .navigate("Exam", {lessonId: this.state.lessonId})}/>
            </View>
        )
    }

    determineNavigation(widget) {
        if (widget.widgetType === "Assignment") {
            return this.props.navigation.navigate("AssignmentWidget", {
                assignment: widget,
                lessonId: this.state.lessonId
            })
        }
        else {
            return this.props.navigation.navigate("Exam", {exam: widget, lessonId: this.state.lessonId})
        }
    }
}

export default WidgetList