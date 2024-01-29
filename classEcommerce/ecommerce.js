class Product {
  constructor(objeto) {
    this.id = objeto.id
    this.name = objeto.name
    this.amount = objeto.amount
    this.price = objeto.price
    // this.dataCriacao = new Date().toISOString()
  }
}
class Ecommerce {
  constructor() {
    this.productList = []
    this.cart = []
  }
  addProduct(name, price, amount) {
    if (
      isNaN(Number(price)) ||
      isNaN(Number(amount)) ||
      typeof name !== 'string'
    ) {
      return console.log('Formato inválido')
    } else {
      const productExists = this.productList.find(names => names.name == name)
      if (productExists != undefined) {
        const newAmount = productExists.amount + amount
        productExists.amount = newAmount
      } else {
        const id = this.productList.length + 1
        this.productList.push(new Product({ id, name, amount, price }))
      }
    }
  }
  setProductPrice(productId, newPrice) {
    const currentPrice = this.productList.find(ids => ids.id == productId)
    if (currentPrice === undefined) {
      return console.log('Produto inexistente')
    }
    if (productId < 1 || isNaN(Number(productId)) || isNaN(Number(newPrice))) {
      return console.log('Formato inválido')
    } else {
      currentPrice.price = newPrice
    }
  }
  getAllProduct() {
    return console.log(this.productList)
  }
  getAllProductNames() {
    const productsNames = this.productList.map(names => names.name)
    const productWithSemicolon = productsNames.join(';')
    return console.log(productWithSemicolon.toString())
  }
  getProductById(productId) {
    const productById = this.productList.find(ids => ids.id == productId)
    if (isNaN(Number(productId)) || productById === undefined) {
      return console.log('Produto inexistente')
    }
    return console.log(productById)
  }
  getProductByName(productName) {
    const productByName = this.productList.find(
      names => names.name == productName
    )
    if (typeof productName !== 'string' || productByName === undefined) {
      return console.log('Produto inexistente')
    }
    return console.log(productByName)
  }
  getProductsByPrice(initialPrice, finalPrice) {
    if (isNaN(Number(initialPrice)) || isNaN(Number(finalPrice))) {
      return console.log('Formato inválido')
    }
    const productsBetweenPrices = this.productList.filter(
      prices => prices.price >= initialPrice && prices.price < finalPrice
    )
    if (productsBetweenPrices.length == 0) {
      return console.log('Não temos produtos entre esses parâmetros')
    }
    return console.log(productsBetweenPrices)
  }
  addProductToCart(product, amount) {
    const getProduct = this.productList.find(names => names.name == product)
    if (getProduct != undefined) {
      const newAmount = getProduct.amount - amount
      if (newAmount < 0) {
        return console.log('Essa quantidade não temos no estoque')
      }
      const name = getProduct.name
      const unitPrice = getProduct.price
      const convertPriceForEuro = unitPrice * amount
      const price = convertPriceForEuro.toLocaleString('en-DE', {
        style: 'currency',
        currency: 'EUR'
      })
      return this.cart.push({
        name,
        amount,
        unitPrice,
        price
      })
    }
    console.log('Produto inexistente')
  }
  getCart() {
    return console.log(this.cart)
  }
  getCartTotalPrice() {
    const setTotal = this.cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.unitPrice * currentValue.amount,
      0
    )
    const convertPriceForEuro = setTotal.toLocaleString('en-DE', {
      style: 'currency',
      currency: 'EUR'
    })
    return console.log(`TOTAL A PAGAR: ${convertPriceForEuro}`)
  }
}
const VendaDoManuel = new Ecommerce()
VendaDoManuel.addProduct('sabonete', 0.75, 1)
VendaDoManuel.addProduct('condicionador', 12.29, 50)
VendaDoManuel.addProduct('shampoo', 4.89, 25)
VendaDoManuel.addProduct('creme dental', 2.69, 80)
VendaDoManuel.addProduct('escova de dente', 1.24, 200)
VendaDoManuel.addProduct('desodorante', 7.19, 75)
VendaDoManuel.addProduct('secador de cabelo', 49.9, 5)
VendaDoManuel.addProduct('alicate de unhas', 18.59, 20)
VendaDoManuel.addProduct('pulseira de prata', 24.49, 8)
VendaDoManuel.addProduct('brinco de prata', 14.99, 10)
VendaDoManuel.addProduct('sabonete', 0.75, 1)
VendaDoManuel.getAllProduct()
// VendaDoManuel.getAllProductNames()
// VendaDoManuel.getProductById(2)
// VendaDoManuel.getProductByName(1)
// VendaDoManuel.getProductsByPrice(10, 15)
// VendaDoManuel.setProductPrice(2, 9.99)

VendaDoManuel.addProductToCart('escova de dente', 2)
VendaDoManuel.addProductToCart('sabonete', 2)
VendaDoManuel.addProductToCart('desodorante', 1)
VendaDoManuel.addProductToCart('alicate de unhas', 2)
VendaDoManuel.addProductToCart('escova de dente', 1)
VendaDoManuel.addProductToCart('shampoo', 3)
// VendaDoManuel.addProductToCart('arroz', 4)       RETORNA PRODUTO INEXISTENTE

VendaDoManuel.getCart()
VendaDoManuel.getCartTotalPrice()
