import web3 from './web3';
import ForumFactory from './build/ForumFactory';

const instance = new web3.eth.Contract(
    JSON.parse(ForumFactory.interface),
    '0xf0A29B12c1062370D2C47D70563f782546dC9E8E'
);

export default instance;