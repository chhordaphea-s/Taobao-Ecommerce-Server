const Product = require('../models/products');

const createProduct = async (product, files) => {
  try {
    const newProduct = new Product(product);
    files.forEach(file => {
      newProduct.images.push(file.path)
    });
    
    const savedProduct = await newProduct.save();
    
    return {
        success: true,
        data: savedProduct
    }
} catch (error) {
    return {
      success: false,
      message: error
    }

  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return {
      success: true,
      data: products
  }

  } catch (error) {
    return {
      success: false,
      message: error
    }
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return {
        success: false,
        message: `No product with id ${id} was found.`
      }
    }
    
    return {
      success: true,
      data: product
    }    

  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: null
    }
  }
};

const updateProduct = async (productID, product) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      product,
      { new: true }
    );
    if (!updatedProduct) {
      return {
        success: false,
        message: "No such document in the database"
      }
    }

    return {
      success: true,
      data: updateProduct
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: `Failed to update ${product._id}`
    }
  }
};

const searchProductByName = async(productName) => {
  try {
    const products = await Product.find({ name: { $regex: productName, $options: 'i' } });
    console.log(`${productName}: `, products)
  
    if(!products) {
      return {
        success: false,
        message: "Data not found"
      }
    }

    return {
      success: true, 
      data: products
    };
  } catch(error) {
    return {
      success: false,
      message: `${error}`,
    }
  }
  }

const deleteProduct = async (productID) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct) {
      return {
        success: false,
        message: "No such record exists."
      }
    }
    return {
      success: true,
      data: deleteProduct
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`
    }
  }
};


module.exports = {createProduct, getAllProducts, getProductById, updateProduct, searchProductByName, deleteProduct}