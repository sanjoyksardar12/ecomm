import { useCallback, useEffect, useState } from "react"

const API = "https://dummyjson.com/products"


const StringConstants = {
  Price: "price",
  Currency: "$"
}


function Product({ addToCart, name, category, id, description, price, thumbnail, brand, rating, discountPercentage }) {
  return (
    <div className="productDetail">
      <img src={thumbnail} alt={name} />
      <h3>
        {name}
      </h3>

      <p>{description}</p>
      <p>{StringConstants.Price}: {price}{StringConstants.Currency}</p>
      <span>brand:  {brand}</span>{"   "}  <span>Rating: {rating}</span>
      <p>discountPercentage: {discountPercentage}</p>
      <p>category: {category}</p>
    </div>
  )

}

function ProductsList({ products, addToCart }) {
  return (<div>
    {products.map(({ name, id, description, price, category, thumbnail, brand, rating, discountPercentage }) =>
      <Product key={id}
        name={name}
        id={id}
        description={description}
        price={price}
        thumbnail={thumbnail}
        brand={brand}
        category={category}
        rating={rating}
        discountPercentage={discountPercentage}
        addToCart={addToCart}
      />)}
  </div>)
}



function Filter({ applyFilter }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFitler, setBrandFilter] = useState("")
  const [sortByDiscount, setSortByDiscount] = useState(false)

  //use callback
  const submitFilter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    applyFilter({ brandFitler, categoryFilter, sortByDiscount })

  }



  return (
    <>
      Brand: <input type="text" name="brand" onChange={(event) => setBrandFilter(event.target.value)} value={brandFitler} />
      {" "}
      Category: <input type="text" name="brand" onChange={(event) => setCategoryFilter(event.target.value)} value={categoryFilter} />

      {" "}
      <button
        className={sortByDiscount ? "selected" : "not-selected"}
        onClick={() => setSortByDiscount(!sortByDiscount)}> Sort By Discount</button>

      <button onClick={submitFilter}>Apply</button>

      </>
  )

}


// function  Discount({setSortByDiscount, sortByDiscount}) {

//   return <button
//    className={sortByDiscount? "selected": "not-selected"}
//    onClick={()=>setSortByDiscount(!sortByDiscount)}> Sort By Discount</button>
// }

function ProductsContainer() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVIsibleProducts] = useState([])

  // const addToCart = () => {

  // }

  useEffect(() => {
    async function getProducts() {
      const resp = await fetch(API);
      const { products = [] } = await resp.json();
      setProducts(products)
      setVIsibleProducts(products)
    }
    getProducts()

  }, [setProducts])


  //usecallback
  const applyFilter = ({ brandFitler, categoryFilter, sortByDiscount }) => {
    const prods = products.filter(({ brand, category }) => {
      if (!brandFitler || brandFitler === brand) { //regex with case sensitive
        if (!categoryFilter || categoryFilter === category) { //regex with case sensitive
          return true
        }
      }
    })

    if (sortByDiscount) {
      prods.sort((a, b) => b.discountPercentage - a.discountPercentage)
    }
    setVIsibleProducts(prods);
  }


  return (
    <div>
      <Filter applyFilter={applyFilter} />
      {/* <Discount setSortByDiscount={applySortByDiscounts} sortByDiscount={sortByDiscount} /> */}
      <ProductsList products={visibleProducts} />
    </div>
  )


}


export default ProductsContainer;
