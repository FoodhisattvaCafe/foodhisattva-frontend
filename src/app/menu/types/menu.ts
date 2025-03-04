export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    dietaryTags: string[];
    keyIngredients: string[];
    image?: string;
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
  }