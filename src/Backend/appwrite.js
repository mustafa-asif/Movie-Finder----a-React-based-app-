import {Client, Databases ,ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const Movies_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const Movies_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PROJECT_ID)

// create a new database instance
const database = new Databases(client);


export const updateSearchCount = async(searchTerm,movie)=>{
  // 1 .use appwrite sdk to search if searchterm exists in the database
  try {
    const result = await database.listDocuments(Movies_DATABASE_ID, Movies_COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);


    // 2. if it exists update the count 
    if(result.documents.length > 0){
      const doc=result.documents[0];
      await database.updateDocument(Movies_DATABASE_ID,Movies_COLLECTION_ID,doc.$id,{
        searchCount: doc.searchCount + 1,
      })
      
      // 3. if it does not exist create a new document with the search term and count 1
    }else{
      await database.createDocument(Movies_DATABASE_ID,Movies_COLLECTION_ID,ID.unique(),{
        searchTerm,
        searchCount:1,
        id:movie.id,
        poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`

      })
    }
    
  } catch (error) {
    console.error(`Error updating search count: ${error}`);
    
  }

}


export const getTrendingMovies = async() =>{
  try {
    const result = await database.listDocuments(Movies_DATABASE_ID, Movies_COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('searchCount')
    ]);
    return result.documents;

  } catch (error) {
    console.error(`Error getting trending movies: ${error}`);
    
  }
}
