import React, { Component } from 'react';
import { Button, Form, Input, Message, TextArea, Checkbox } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export default class QuestionNew extends Component {

    state = {
        value: '',
        title: '',
        description: '',
        complete: true,
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await factory.methods
                .createQuestion(this.state.value, this.state.title, this.state.description, this.state.complete)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        }
        catch(error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });

    };

    render() {
        return (
            <Layout>
                <h3>Ask a Question</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Value to spend on this question</label>
                        <Input
                            label='wei'
                            labelPosition='right'
                            value={this.state.value}
                            onChange={ event =>
                                this.setState({ value: event.target.value })
                            }
                        />
                        <label>Title</label>
                        <Input
                            label='title'
                            labelPosition='right'
                            value={this.state.title}
                            onChange={ event =>
                                this.setState({ title: event.target.value })
                            }
                        />
                        <label>Description</label>
                        <TextArea
                            placeholder='Question Description'
                            label='title'
                            labelposition='right'
                            value={this.state.description}
                            onChange={ event =>
                                this.setState({ description: event.target.value })
                            }
                            style={{ minHeight: 100 }}
                        />

                        <Checkbox label="Found an Answer?"
                                  onChange={ event =>
                                  this.setState({complete: event.target.value })}
                                  checked={!this.state.complete}
                        />

                    </Form.Field>

                    <Message
                        error
                        header='Oops!'
                        content={this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary>Ask!</Button>
                </Form>
            </Layout>
        );
    }
}