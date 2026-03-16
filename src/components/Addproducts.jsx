import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  // introduce the hooks 
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // declare the additional hooks to manage the state of the application 
  const [loading, setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const [error,setError] = useState("");

  // create a function that will handle the submit action 
  const handleSubmit = async (e) =>{
    // prevent the site from reloading 
    e.preventDefault()

    // setloading hook with a message (activate it) 
    setLoading(true)

    try{
      // create a form data 
      const formdata = new FormData()
      // append the details to the formdata created 
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // nteract with axios module that will help you use the method POST
      const response = await axios.post("https://brayemar.alwaysdata.net/api/add_product", formdata)

      // set the loading back to default
      setLoading(false);

      // update the success hook with a message
      setSuccess(response.data.message)

      // clearing the hooks (setting them back to default/empty)
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

    }
    catch(error){
      // set loading hook back to default
      setLoading(false)

      // update the setError with a message
      setError(error.messsage)
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3 className='text-primary'>Welcome to Add Product</h3>
        {/*bind the loading hook*/}
        {loading && <Loader />}
        <h3 className="text-success"> {success} </h3>
        <h4 className="text-danger"> {error} </h4>

        <form onSubmit={handleSubmit}>
          <input type="text"
          placeholder='Enter the product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)} /> <br />

          {/* {product_name}  */}

          <input type="text"
          placeholder='Enter the product description'
          className='form-control'
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)} /> <br />

          {/* {product_description}  */}

          <input type="number"
          placeholder='Enter the price of the product'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)} /> <br />

          {/* {product_cost}  */}

          <label>Product Photo</label>
          <input type="file"
          className='form-control'
          required
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />

          <input type="submit"
          value="Add product"
          className='btn btn-outline-primary' />
        </form>
      </div>
    </div>
  )
}

export default Addproducts;
