import React, { Component } from 'react';
import { Button, Card, Grid, Form, TextArea, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import Question from '../../ethereum/question';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';

export default class QuestionShow extends Component {

    state = {
        answer: '',
        successMessage: '',
        loading: false
    };

    static async getInitialProps(props) {

        const question = Question(props.query.address);
        const summary = await question.methods.getQuestionDetails().call();

        console.log(summary);
        return {
            address: props.query.address,
            value: summary[0],
            title: summary[1],
            description: summary[2],
            question

        };

    }

    renderCards() {

        const {
            value,
            title,
            description,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                description: 'Address of Manager. The Manager created this question.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: value,
                description: 'Value (wei) want to spend on this question.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: title,
                description: 'Title',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: description,
                description: 'Description',
                style: {overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group items={items}/>
    }

    onSubmit = async (event) => {

        event.preventDefault();
        const question = Question(this.props.address);


        this.setState({loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0]);
            await question.methods
                .postAnswer(this.state.answer)
                .send({
                    from: accounts[0]
                });

            this.setState({ successMessage: 'Successfully Posted!'});
            // Router.pushRoute('/');
        }
        catch(error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({loading: false });

    };

    render() {

        return (

            <Layout>
                <Link route={`/`}>
                    <a><strong>Back</strong></a>
                </Link>
                <h3>Question</h3>
                <Grid>
                    <Grid.Column width={8}>
                        {this.renderCards()}
                        <Form
                            onSubmit={this.onSubmit}
                            error={!!this.state.errorMessage}
                            style={{ marginTop: 10 }}
                        >
                            <Form.Field>
                                <TextArea
                                    placeholder='Reply'
                                    value={this.state.answer}
                                    onChange={ event =>
                                        this.setState({ answer: event.target.value })
                                    }
                                    style={{ minHeight: 100 }}
                                />
                            </Form.Field>
                            <Message
                                error
                                header='Oops!'
                                content={this.state.errorMessage ? this.state.errorMessage : this.state.successMessage }
                            />
                            <Button style={{ marginBottom: '10px'}} loading={this.state.loading} primary>Post Your Answer</Button>
                            <Button floated='right' primary>Vote</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Link route={`/questions/${this.props.address}/answers`}>
                            <a>
                                <Button floated='right' primary> View Answers </Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid>
            </Layout>

        );
    }
}