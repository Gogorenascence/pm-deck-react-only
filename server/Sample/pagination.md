
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






// Get paginated and filtered deck list
router.get('/', async (req, res) => {
    const { deckName, description, cardName, strategies, seriesName, user } = req.query;
    const limit = parseInt(req.query.limit) || 10; // Number of decks per page
    const page = parseInt(req.query.page) || 1; // Page number
    const skip = (page - 1) * limit;

    // Build the query object based on provided parameters
    const query = {};
    if (deckName) query.name = new RegExp(deckName, 'i');
    if (description) query.description = new RegExp(description, 'i');
    if (cardName) query.card_names = new RegExp(cardName, 'i');
    if (strategies) query.strategies = new RegExp(strategies, 'i');
    if (seriesName) query.series_names = new RegExp(seriesName, 'i');
    if (user) query.creator = new RegExp(user, 'i');

    try {
        const totalDecks = await Deck.countDocuments(query);
        const totalPages = Math.ceil(totalDecks / limit);

        const decks = await Deck.find(query).skip(skip).limit(limit);
        const processed_decks = decks.map(deck => {
            deck.id = deck._id ? (deck._id.$oid ? deck._id.$oid : deck._id) : deck.id;
            return deck;
        });

        res.send({
            totalDecks,
            totalPages,
            currentPage: page,
            decks: processed_decks
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


const [deckQuery, setDeckQuery] = useState({
    deckName: "",
    description: "",
    cardName: "",
    strategies: "",
    seriesName: "",
    user: "",
});

const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
});


const fetchDecks = async () => {
    const { deckName, description, cardName, strategies, seriesName, user } = deckQuery;
    const { limit, page } = pagination;

    const queryParams = new URLSearchParams({
        deckName,
        description,
        cardName,
        strategies,
        seriesName,
        user,
        limit,
        page
    }).toString();

    try {
        const response = await fetch(`/api/decks?${queryParams}`);
        const data = await response.json();

        // Handle the response data
        console.log(data);
    } catch (error) {
        console.error('Error fetching decks:', error);
    }
};

// Call fetchDecks whenever deckQuery or pagination changes
useEffect(() => {
    fetchDecks();
}, [deckQuery, pagination]);
