import * as fs from 'fs';

interface Product {
  id: string;
  name: string;
  unit_price: number;
  quantity: number;
  created_date: Date; // can be number (unix time) if you want to
}

interface Messsage {
  [add:string] : string,
  update : string,
  delete: string
}

type UpdateProduct = Pick<Product, 'id' | 'quantity' | 'unit_price'>

const getAllProd = () =>{
  const allProd =fs.readFileSync('./data.json','utf8')
  return JSON.parse(allProd)
}

const setAllProd = (products: Product[],type: string, product: Product)=>{

  const msg: Messsage = {
    add:'Submitted Product',
    update: 'Product Updated',
    delete: 'Product Deleted'
  }

  try {

    fs.writeFileSync('./data.json', JSON.stringify(products))
    console.log("\n===============================")  
    console.log(msg[type])
    console.log(product)   
    console.log("===============================")
    
    if(type !== 'add'){
      console.log("\n==================ALL=PRODUCTS==================")  
      products.forEach( (e:Product) => {
        console.log(e)
      })
      console.log("===============================")  
    }
    
  } catch (error) {
      console.log("\n===============================")  
      console.log("Something went wrong")
      console.log("===============================")  
  }

}
//CRUD
const addProduct = (product: Product) =>{

  const strProducts = fs.readFileSync('./data.json','utf8')

  let products = JSON.parse(strProducts)

  const found = products.find( (prod:Product )=> prod.id === product.id )
  
  if(found){
    console.log("\n===============================")  
    console.log('Product ID already exists')
    console.log("===============================")  
    return
  }

  products.push(product)

//  fs.writeFile('./data.json', JSON.stringify(products), (err)=>{

//   if(err){
//     console.log("\n===============================")  
//     console.log("Something went wrong")
//     console.log("===============================")  
//     return
//   }
//   console.log("\n===============================")  
//   console.log("Submitted Product")  
//   console.log(product)  
//   console.log("===============================")   

//  })

  setAllProd(products,'add',product)


}

const viewAllProducts = ()=>{
  fs.readFile('./data.json','utf8', (err, res)=>{

    if(err){
      console.log("\n===============================")  
      console.log('Get All Products Something Went Wrong')
      console.log("===============================")  
    }

  const arrRes =[...JSON.parse(res)]
    .filter( (a:Product)=> a.quantity > 0 )
    .sort((a:Product,b:Product) => {
    
    if(a.created_date > b.created_date){
      return -1
    }

    if(a.created_date < b.created_date){
      return 1
    }

    return 0
  } )

  console.log("\n===============================")    
  arrRes.forEach( (data: Product) => {
    console.log({
      "NAME: ":data.name,
      "UNIT PRICE: ":data.unit_price,
      "TOTAL PRICE": data.unit_price * data.quantity
    })
  } )
  console.log("===============================")  
  })


}

const updateProduct = (product: UpdateProduct)=>{
  const {id, quantity, unit_price} = product

  let allProd = getAllProd()

  const oneProd = allProd.find( (e:Product) => e.id === id)

  if(!oneProd){
    console.log("\n===============================")  
    console.log('Product does not exist')
    console.log("===============================")  
    return    
  }

  oneProd.quantity = quantity
  oneProd.unit_price = unit_price


//  fs.writeFile('./data.json', JSON.stringify(allProd), (err)=>{

//   if(err){
//     console.log("\n===============================")  
//     console.log("Something went wrong")
//     console.log("===============================")  
//     return
//   }
//   console.log("\n===============================")  
//   console.log("Product Updated")  
//   viewAllProducts()
//   console.log("===============================")   

//  })
  setAllProd(allProd,'update',{...oneProd})



}

const removeProduct = (id: string)=>{

  let allProd: Product[] = getAllProd()

  const index = allProd.findIndex( (e:Product) => e.id === id)

  
  if(index < 0){
    console.log("\n===============================")  
    console.log('Product does not exist')
    console.log("===============================")  
    return    
  }
  const deletedProd = {...allProd[index]}
  allProd.splice(index, 1);
  // fs.writeFile('./data.json', JSON.stringify(allProd), (err)=>{

  //   if(err){
  //     console.log("\n===============================")  
  //     console.log("Something went wrong")
  //     console.log("===============================")  
  //     return
  //   }
  //   console.log("\n===============================")  
  //   console.log("Product Deleted")  
  //   viewAllProducts()
  //   console.log("===============================")   
  
  //  })

  setAllProd(allProd,'delete',deletedProd)


}




// addProduct({
//   id:'1',
//   name: 'product x',
//   unit_price: 1,
//   quantity: 0,
//   created_date: new Date()

// })

// addProduct({
//   id:'11',
//   name: 'product x',
//   unit_price: 1,
//   quantity: 1,
//   created_date: new Date()
// })


// viewAllProducts()


// updateProduct({
//   id:'11',
// unit_price: 2,
// quantity: 100,
// })

//  removeProduct('22')

// removeProduct('11')



