const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://realtimefoodrecipies.firebaseio.com'
});

const db = admin.firestore();
const recipesCollection = db.collection('recipesTEST');

// Sample recipe data
const recipesToAdd = [
    {
        name: 'Recipe 1',
        description: 'Description for Recipe 1',
        cookTimeMin: 30,
        servings: 4,
        category: 'Main Dish',
        dietaryRestrictions: 'None',
        cuisine: 'Italian',
        cookingMethod: 'Baking',
        imgUrl: 'https://example.com/recipe1.jpg',
        ingredients: ['Ingredient A', 'Ingredient B'],
        steps: ['Step 1', 'Step 2'],
        createdBy: 'User123',
        createdAt: new Date(),
        likedBy: []
    },
    // Add more recipe objects here
];

// Create a batch write
const batch = db.batch();

// Add new recipes to the batch
recipesToAdd.forEach(recipe => {
    const newDocRef = recipesCollection.doc(); // Automatically generates a unique ID
    batch.set(newDocRef, recipe);
});

// Commit the batch write
batch.commit()
    .then(() => {
        console.log('Batch write completed successfully.');
    })
    .catch(error => {
        console.error('Error performing batch write:', error);
    });
