import {allTopics} from '../services/mock'

const Topic = (props) => {
    const topicId = +props.match.params.topicId;
    const topic = allTopics.find(t => t.id === topicId);
    return <>{topic.title}</>
};

export default Topic;