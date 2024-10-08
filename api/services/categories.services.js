const { faker } = require("@faker-js/faker");

class CategoriaServices {

  constructor(){
    this.categories=[];
    this.generate();
  }


  generate(){
    const limit = 100;
      for (let index = 0; index < limit; index++) {
        this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        imagen: faker.image.url(),
        });
      }
  }

  async create(data){
    const newCategories = ({
      id: faker.string.uuid(),
      ... data
    })
    this.categories.push(newCategories);
    return newCategories;
  }

  find(){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
       resolve(this.categories);
      },5000);
    });
  }

  async findOne(id){
    return this.categories.find(item =>item.id === id );
  }

  async update(id,changes){
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1){
      throw new Error('product not found');
    }
    const categorie = this.categories[index];
    this.categories[index]={
      ...categorie,
      ...changes
    };
    return this.categories[index];
  }

  delete(id){
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1){
      throw new Error('product not found');
    }
    this.categories.splice (index,1);
    return { id };
  }
}

module.exports = CategoriaServices;
