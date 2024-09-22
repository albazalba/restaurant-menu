export interface Category {
    id: string;
    name: string;
    url: string;
  }

  export interface MenuItem {
    id: string;
    name: string;
    url: string;
    price: number;
    discount_rate: number;
    stock?: {
      availability: number;
    };
    description: string;
    photo: string | null;
    category_id: string;
  }

  export interface MenuData {
    categories: Category[];
    items: MenuItem[];
  }
