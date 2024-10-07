const { faker } = require("@faker-js/faker");

class UsersServices {

  constructor(){
    this.users=[];
    this.generate();
  }

  generate(){
    const limit = 100;
      for (let index = 0; index < limit; index++) {
        this.users.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        imagen: faker.image.url(),
        });
      }
  }

  async create(){
    const newUser = ({
      id: faker.string.uuid(),
      ... data
    })
    this.users.push(newUser);
    return newUser;
  }

  find(){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(this.users);
      },5000);
    });
  }

  async findOne(id){
    return this.users.find(item =>item.id === id );
  }

  async update(id,changes){
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1){
      throw new Error('product not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id){
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1){
      throw new Error('product not found');
    }
    this.users.splice (index,1);
    return { id };
  }
}

  module.exports = UsersServices;
