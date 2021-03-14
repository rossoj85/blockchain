const SHA256 =require('crypto-js/sha256')
const chalk = require("chalk")


class Block {
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash =''
        this.nonce = 0
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash +this.timestamp + JSON.stringify(this.data)+this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash()
            
        }
        console.log(chalk.yellow('BLOCK MINED', this.hash));
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 6
    }
    createGenesisBlock(){
        return new Block(0, '02/03/2021', 'Genesis block', "NO PREVIOUS --> GENESIS")
    }
    getLatestBlock(){
        // console.log('inside get latest block');
        // console.log('chain -->', this.chain);
        return this.chain[this.chain.length-1]
    } 
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }
    isChainValid(){
        for( let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash() ){
                console.log('current hash !== calculateHash');
                console.log(currentBlock.hash );
                console.log(currentBlock.calculateHash() );
                return false
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                console.log('current.previousHash !===  previousHash');
                return false;
            }
        }
        return true;
    }
}

let rossoCoin = new Blockchain()
console.log('Mining block 1....');
rossoCoin.addBlock(new Block(1, '02/03/2021', {ammount: 4}));



console.log('Mining block 2....');
rossoCoin.addBlock(new Block(2, '02/03/2021', {ammount: 10}))




//VIDEO 1
// console.log('iIs blockchain valid BEFORE', rossoCoin.isChainValid());
// console.log(JSON.stringify(rossoCoin, null, 4));

// //lets try to mess with the chain
// rossoCoin.chain[1].data = {ammount: 100000};

// //recalculating hash works on the last coiun
// rossoCoin.chain[1].hash = rossoCoin.chain[1].calculateHash()
// //this wont work be3cause of our check 

// //but what about if we tamper with the has? 
// // rossoCoin.chain[4].hash = rossoCoin.chain[1].calculateHash()


// console.log('iIs blockchain valid AFTER', rossoCoin.isChainValid());

// console.log(JSON.stringify(rossoCoin, null, 4));


