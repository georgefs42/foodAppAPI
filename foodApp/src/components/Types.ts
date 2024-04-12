export interface Recipe {
    title: string;
    description: string;
    ratings: number;
    imageUrl: string;
    timeInMins: number;
    price: number;
    categories: string[];
    instructions: string[];
    ingredients: Ingredient[];
  }
  interface Ingredient{
    name: string;
    amount: number;
    unit: string;
  }
  