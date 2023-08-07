const CreditCard = require('../models/creditcard');

const createCreditCard = async (creditcard) => {
  try {

    const result = await creditcard.save();

    return {
        sucess: true,
        data: result
    }
  } catch (error) {
    return {
        sucess: false,
        message: `${error}: Error creating credit card.`
    }
  }
};

const getAllCreditCards = async () => {
  try {
    const result = await CreditCard.find();

    return {
        sucess: true,
        data: result
    }
} catch (error) {
    return {
        sucess: false,
        message: `${error}: Error fetching all credit cards.`
    }
  }
};

const getCreditCardById = async (creditCardId) => {
  try {
    const result = await CreditCard.findById(creditCardId);
    if (!result) {
        return {
            sucess: false,
            message: `Credit card not found.`
        }
    }

    return {
        sucess: true,
        data: result
    }

} catch (error) {
    return {
        sucess: false,
        message: `${error}: Error fetching credit cards.`
    }
  }
};

const getCreditCardByUser = async (userID) => {
    try {
        const result = await CreditCard.find({userID})
        if (!result) {
            return {
                sucess: false,
                message: `Credit card not found.`
            }
        }

        return {
            sucess: true,
            data: result
        }
    }  catch (error) {
        return {
            sucess: false,
            message: `${error}: Error fetching credit cards.`
        }
      }
}

const updateCreditCard = async (newCreditCard) => {
  try {
    const result = await CreditCard.findByIdAndUpdate(newCreditCard);
    if (!existingCreditCard) {
        return {
            sucess: false,
            message: `Credit card not found.`
        }
    }

    return {
        sucess: true,
        data: result
    }

  } catch (error) {
    return {
        sucess: false,
        message: `${error}: Error updating credit cards.`
    }
  }
};

// Function to delete an existing credit card
const deleteCreditCard = async (creditCardId) => {
  try {

    // Check if the credit card with the provided ID exists
    const result = await CreditCard.findByIDAndDelete(creditCardId);
    if (!result) {
        return {
            sucess: false,
            message: `Credit card not found.`
        }
    }
    return {
        sucess: true,
        data: result
    }
  } catch (error) {
    return {
        sucess: false,
        message: `${error}: Error deleting credit cards.`
    }

  }
};

module.exports = {createCreditCard, getAllCreditCards, updateCreditCard, deleteCreditCard, getCreditCardById, getCreditCardByUser}