import React, {Component, Fragment} from "react";
import {Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from "../routes";

export default class Content extends Component{
    constructor(props){
        super(props);
        this.addVote = this.addVote.bind(this);
        this.getQuestionDetails = this.getQuestionDetails.bind(this);
        this.getQuestionDetails();
        this.state={
            QuestionValue: 0
        }

    }

    getQuestionDetails = async() =>{
        const summary = await this.props.questionInstance.methods.getQuestionDetails().call();
        const value = summary[0];
        this.setState({
            QuestionValue: value
        })
    }

    addVote = async () =>{
        try {
            const accounts = await web3.eth.getAccounts();
            await this.props.questionInstance.methods.vote(this.props.in).send({
                from: accounts[0]
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    finalizeAnswer = async () =>{
        try{
            const accounts = await web3.eth.getAccounts();
            await this.props.questionInstance.methods.finalizeAnswer(this.props.in).send({
                from: accounts[0],
                value: this.state.QuestionValue + 100000
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    render(){
        console.log(this.state.QuestionValue);
        return(
            <div>
               <Fragment>{this.props.item[1]}</Fragment>
                <Button onClick={this.addVote} floated='right' color='green'>Vote</Button>
                <Button onClick={this.finalizeAnswer} floated='right' color='orange'>Finalize</Button>
            </div>
        );
    }

};