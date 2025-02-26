export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    extras?: string[];
  }
  
  export const menuData: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: "Barbecue Buffalo Wings",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 17.0,
      image: "https://source.unsplash.com/400x300/?chicken,wings",
      category: "Starters",
      extras: ["Lorem Ipsum", "Dolor Sit Amet"],
    },
    {
      id: 2,
      name: "Stuffed Jalapeños",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et.",
      price: 12.5,
      image: "https://source.unsplash.com/400x300/?jalapeno,food",
      category: "Starters",
      extras: ["Consectetur Adipiscing", "Elit Nullam"],
    },
    {
      id: 3,
      name: "Mozzarella Sticks",
      description: "Pellentesque habitant morbi tristique senectus et netus et.",
      price: 9.0,
      image: "https://source.unsplash.com/400x300/?mozzarella,sticks",
      category: "Starters",
      extras: ["Ut Faucibus", "Amet Purus"],
    },
    {
      id: 4,
      name: "Garlic Butter Shrimp",
      description: "Curabitur non nulla sit amet nisl tempus convallis.",
      price: 15.0,
      image: "https://source.unsplash.com/400x300/?shrimp,garlic",
      category: "Starters",
      extras: ["Faucibus Leo", "Accumsan Nec"],
    },
  
    // Salads
    {
      id: 5,
      name: "Caesar Salad",
      description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.",
      price: 12.5,
      image: "https://source.unsplash.com/400x300/?caesar,salad",
      category: "Salads",
      extras: ["Eget Tincidunt", "Nibh Pulvinar"],
    },
    {
      id: 6,
      name: "Greek Salad",
      description: "Donec rutrum congue leo eget malesuada fusce dapibus.",
      price: 11.0,
      image: "https://source.unsplash.com/400x300/?greek,salad",
      category: "Salads",
      extras: ["Sapien Massa", "Convallis"],
    },
    {
      id: 7,
      name: "Cobb Salad",
      description: "Etiam porta sem malesuada magna mollis euismod.",
      price: 14.0,
      image: "https://source.unsplash.com/400x300/?cobb,salad",
      category: "Salads",
      extras: ["Ultricies Mi", "Duis Mollis"],
    },
  
    // Main Course
    {
      id: 8,
      name: "Grilled Salmon",
      description: "Nulla porttitor accumsan tincidunt praesent commodo cursus.",
      price: 22.0,
      image: "https://source.unsplash.com/400x300/?grilled,salmon",
      category: "Main Course",
      extras: ["Accumsan Ipsum", "Purus"],
    },
    {
      id: 9,
      name: "Spaghetti Carbonara",
      description: "Curabitur aliquet quam id dui posuere blandit.",
      price: 18.5,
      image: "https://source.unsplash.com/400x300/?carbonara,pasta",
      category: "Main Course",
      extras: ["Mollis Ipsum", "Etiam Porta"],
    },
    {
      id: 10,
      name: "Steak & Mashed Potatoes",
      description: "Vivamus suscipit tortor eget felis porttitor volutpat.",
      price: 28.0,
      image: "https://source.unsplash.com/400x300/?steak,food",
      category: "Main Course",
      extras: ["Faucibus Elit", "Quam Nullam"],
    },
  
    // Desserts
    {
      id: 11,
      name: "Chocolate Lava Cake",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et.",
      price: 9.5,
      image: "https://source.unsplash.com/400x300/?lava,cake",
      category: "Desserts",
      extras: ["Massa Venenatis", "Aenean"],
    },
    {
      id: 12,
      name: "Strawberry Cheesecake",
      description: "Cras ultricies ligula sed magna dictum porta.",
      price: 10.0,
      image: "https://source.unsplash.com/400x300/?strawberry,cheesecake",
      category: "Desserts",
      extras: ["Blandit Tempor", "Porttitor"],
    },
    {
      id: 13,
      name: "Apple Pie",
      description: "Quisque velit nisi pretium ut lacinia in elementum.",
      price: 8.5,
      image: "https://source.unsplash.com/400x300/?apple,pie",
      category: "Desserts",
      extras: ["Purus Blandit", "Quis Hendrerit"],
    },
  
    // Drinks
    {
      id: 14,
      name: "Mojito",
      description: "Proin eget tortor risus nulla quis lorem ut libero malesuada feugiat.",
      price: 7.0,
      image: "https://source.unsplash.com/400x300/?mojito,drink",
      category: "Drinks",
      extras: ["Extra Mint", "Lime Wedge"],
    },
    {
      id: 15,
      name: "Iced Coffee",
      description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      price: 5.5,
      image: "https://source.unsplash.com/400x300/?iced,coffee",
      category: "Drinks",
      extras: ["Almond Milk", "Extra Espresso Shot"],
    },
    {
      id: 16,
      name: "Pineapple Smoothie",
      description: "Vivamus magna justo lacinia eget consectetur sed.",
      price: 6.5,
      image: "https://source.unsplash.com/400x300/?smoothie,pineapple",
      category: "Drinks",
      extras: ["Coconut Milk", "Chia Seeds"],
    },
  ];
  