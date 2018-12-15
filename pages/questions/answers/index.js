import React , { Component, Fragment } from 'react';
import { Accordion, Label, Button } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import Question from '../../../ethereum/question';
import { Link } from '../../../routes';


export default class ShowAnswers extends Component {

    state = {
        activeIndex: [this.props.answerCount.length]
    };

    static async getInitialProps(props) {

        const { address } = props.query;

        const question = Question(address);
        const answerCount = await question.methods.getAnswerCount().call();

        console.log(answerCount);

        const answers = await Promise.all(
            Array(parseInt(answerCount))
                .fill()
                .map((element, index) => {
                    return question.methods.answers(index).call()
                })
        );

        console.log(answers);

        return { answerCount, answers };
    }

    closeAll = () => {
        this.setState({ activeIndex: [] });
    };

    handleSliderChange = e =>
        this.setState({ activeIndex: (e.target.value) });

    handleTitleClick = (e, itemProps) => {
        const { index } = itemProps;
        const { activeIndex } = this.state;
        let newState;

        if (activeIndex.indexOf(index) > -1) {
            newState = activeIndex.filter((i) => i !== index);
        } else {
            newState = [...activeIndex, index]
        }

        this.setState({ activeIndex: newState });
    };

    render() {

        let panels = this.props.answers.map((item, index) => ({
            title: {
                content: <Label content={item[0]} />,
                key: `title-${index[0]}`
            },
            content: {
                content: <Fragment>{item[1]}</Fragment>,
                className: "des-ml-1",
                key: `content-${index[0]}`
            }
        }));

        const { activeIndex } = this.state;

        return (

            <Layout>
                <h3>Answers</h3>
                <Button onClick={this.closeAll} floated='right' primary>Close all</Button>
                <Accordion
                    activeIndex={activeIndex}
                    panels={panels}
                    exclusive={false}
                    onTitleClick={this.handleTitleClick}
                />
            </Layout>

        );
    }
}