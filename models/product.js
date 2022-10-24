const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  static fetchAll() { // static giúp gọi method trực tiếp từ class, ko thông qua instance
    return products;
  }
}