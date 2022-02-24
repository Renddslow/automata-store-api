export type ItemSpec = {
  label: string;
  value: string;
};

export type Delivery = {
  option: string;
  vendor: string;
  price: number;
  estimatedDate: string;
};

export type Item = {
  name: string;
  slug: string;
  manufacturer: string;
  originalPrice: number;
  overview: string;
  description: string;
  specs: ItemSpec[];
  warranty: string;
  image: string;
  pricing: {
    amount: number;
    validTo: string;
    saleName: string;
  };
};

export type ItemData = {
  id: number;
  name: string;
  msrp: number;
  manufacturer: string;
  description: Buffer;
  overview: Buffer;
  warranty: Buffer;
  image: string;
  label: string;
  value: string;
  amount: number;
  valid_to: string;
  sale_name: string;
};
