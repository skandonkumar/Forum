import React , { Component, Fragment } from 'react';
import {Accordion, Label, Button, Message} from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import Question from '../../../ethereum/question';
import {Link, Router} from '../../../routes';
import web3 from "../../../ethereum/web3";
import Content from "../../../components/accordianContent";
import LabelContent from "../../../components/Label";

export default class ShowAnswers extends Component {

    state = {
        activeIndex: [this.props.answerCount.length],
    };

    static async getInitialProps(props) {

        const { address } = props.query;

        const question = Question(address);
        const answerCount = await question.methods.getAnswerCount().call();

        const answers = await Promise.all(
            Array(parseInt(answerCount))
                .fill()
                .map((element, index) => {
                    return question.methods.answers(index).call()
                })
        );

        return { answerCount, answers, question };
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
        console.log(this.props.answers);
        let panels = this.props.answers.map((item, index) => {
            return({
                title: {
                    content: <LabelContent content={item[0]} item={item}/>,
                    key: `title-${index[0]}`
                },
                content: {
                    content: <Content in={index} item={item} questionInstance={this.props.question}/>,
                    className: "des-ml-1",
                    key: `content-${index[0]}`
                }
            })
        });

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