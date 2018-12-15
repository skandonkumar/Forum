import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class QuestionIndex extends Component {

    static async getInitialProps() {

        const questions = await factory.methods.getDeployedQuestions().call();


        return { questions };
    }


    renderQuestions() {


        const items = this.props.questions.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/questions/${address}`}>
                        <a>View Question</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;


    };


    render() {
        return(
            <Layout>
                <div>
                    <h3>Questions</h3>
                    <Link route='/questions/new'>
                        <a>
                            <Button
                                floated='right'
                                content='Ask a Question'
                                icon='add circle'
                                primary
                            />
                        </a>
                    </Link>
                    {this.renderQuestions()}
                </div>
            </Layout>
        );
    }
}