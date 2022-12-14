
export interface UserPreview {
  id: number;
  nickname: string;
  profilePicture: string;
  email: string;
}

export interface User extends UserPreview {
  description: string;
  createdAt: Date;
  lastActivity: Date;
  offers: OfferPreview[];
}


export interface CategoryPreview {
  id: number;
  name: string
}

export interface Category extends CategoryPreview {
  offers: OfferPreview[];
}

export interface OfferPreview {
  id: number;
  title: string;
  price: number;
  place: string,
  createdAt: Date,
  updatedAt: Date;
  description: string;
  author: UserPreview,
  photos: Photo[],
  finished: boolean
}

export interface Offer extends OfferPreview {
  categories: CategoryPreview[]
}

export interface Photo {
  id: number;
  path: string;
  description: string;
}
