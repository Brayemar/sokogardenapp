import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const Getproducts = () => {
  
  // 1.initialize hooks to help manage the state of your application 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // below we specify the image base url
  const img_url = "https://brayemar.alwaysdata.net/static/images/"

  // 2.create a function to help you fetch the products from your API 
  const fetchProducts = async() =>{
    // 3.Come up with the try and catch block. 
    try{
      // 4.Update the loading hook 
      setLoading(true)

      // 5.Interact with your endpoint for fetching the products 
      const response = await axios.get("https://brayemar.alwaysdata.net/api/get_products")

      //6. Update the products hook with the response given from the API
      setProducts(response.data)

      // 7.Set the Loading hook back to default
      setLoading(false)
    }
    catch(error){
      // 8. Update the contents on the catch block
      // If there is an error
      // Set the loading hook back to default
      setLoading(false)

      // Update the error hook with a message
      setError(error.message)

    }
  }
  // We shall use the useEffect hook. This hook enables us to automatically re-render new features incase of any changes.
  useEffect(() => {
    fetchProducts()
  }, []) 

  // console.log(products)
  


  return (
    <div className='row'>
      <h3 className="text-primary">Available Products</h3>
      {loading && <Loader/>}
      <h4 className="text-danger">{error}</h4>

      {/* map the products fetched from the API to the user interface */}

      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-3">
        <div className="card shadow">
          <img
          src={img_url + product.product_photo}
          className='product_img mt-3' />

          <div className="card-body">
            <h5 className="text-primary"> {product.product_name} </h5>

            <p className="text-dark"> {product.product_description.slice(0, 100)}... </p>

            <h4 className="text-warning"> Ksh {product.product_cost} </h4>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Getproducts;
