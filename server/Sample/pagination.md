
Yes, you can implement pagination with Mongoose while also retrieving the total number of documents in a MongoDB collection. Here’s how you can do it:

Retrieve a subset of documents for the current page.
Retrieve the total count of documents.
Here is an example of how you can achieve this using Mongoose:

javascript
Copy code
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define your schema
const MySchema = new Schema({
  // your schema fields
});

const MyModel = mongoose.model('MyModel', MySchema);

// Pagination function
const getPaginatedResults = async (page, limit) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Retrieve the documents and the total count
    const [documents, totalCount] = await Promise.all([
      MyModel.find().skip(skip).limit(limit).exec(),
      MyModel.countDocuments().exec()
    ]);

    // Return the paginated results and total count
    return {
      documents,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    console.error('Error fetching paginated results:', error);
    throw error;
  }
};

// Example usage
const page = 1; // Current page number
const limit = 20; // Number of documents per page

getPaginatedResults(page, limit).then(result => {
  console.log('Paginated Results:', result);
}).catch(error => {
  console.error('Error:', error);
});
Explanation:
Schema Definition: Define your schema using Mongoose.
Pagination Function: Create a function getPaginatedResults that takes the page and limit as parameters.
Skip Calculation: Calculate the number of documents to skip based on the current page and the limit.
Retrieve Documents and Count: Use Promise.all to execute two queries simultaneously: one for retrieving the documents with skip and limit, and the other for counting the total number of documents.
Return Results: Return an object containing the documents, total count, current page, and total pages.
Example Usage: Demonstrate how to use the getPaginatedResults function with a specific page and limit.
By using this approach, you can efficiently paginate through your MongoDB collection while also displaying the total number of documents.










const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define your schema
const MySchema = new Schema({
  // your schema fields
});

const MyModel = mongoose.model('MyModel', MySchema);

// Pagination function
const getPaginatedResults = async (page, limit) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Retrieve the documents and the total count
    const [documents, totalCount] = await Promise.all([
      MyModel.find().skip(skip).limit(limit).exec(),
      MyModel.countDocuments().exec()
    ]);

    // Return the paginated results and total count
    return {
      documents,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    console.error('Error fetching paginated results:', error);
    throw error;
  }
};

// Example usage
const page = 1; // Current page number
const limit = 20; // Number of documents per page

getPaginatedResults(page, limit).then(result => {
  console.log('Paginated Results:', result);
}).catch(error => {
  console.error('Error:', error);
});
