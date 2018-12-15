import web3 from './web3';
import Question from './build/Question';

export default (address) => {

    return new web3.eth.Contract(
        JSON.parse(Question.interface),
        address
    );

};