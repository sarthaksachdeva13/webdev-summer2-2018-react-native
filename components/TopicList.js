import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            lessonId: 1
        }
    }
    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId", 1);
        this.setState({
            lessonId: lessonId
        });
        fetch("http://localhost:8080/api/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics: topics}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map((topic, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("WidgetList", {lessonId: lessonId})}
                        key={index}
                        title={topic.title}/>
                ))}
            </View>
        )
    }
}
export default TopicList;