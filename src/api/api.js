export const mealApi = async (query) => {
      if(!query) return [];

      try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        return data.meals;

      }catch(error){
        console.log(error);
        alert("not fetching data");
     }
      
}

 
 
 

 
export async function getRandomMeals(count = 6) {
  try {
    const promises = Array(count).fill(null).map(() =>
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json())
    );

    const results = await Promise.all(promises);
    return results.map(r => r.meals[0]);
  } catch (error) {
    console.error("Error fetching random meals:", error);
    return [];
  }
}
