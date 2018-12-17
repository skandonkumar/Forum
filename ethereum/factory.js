import web3 from './web3';
import ForumFactory from './build/ForumFactory';

const instance = new web3.eth.Contract(
    JSON.parse(ForumFactory.interface),
    '0x83A0a58666A5E301487939db24dCF4b8B4fcc039'
);

export default instance;