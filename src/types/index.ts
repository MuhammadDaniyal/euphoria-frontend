export type NFTDetail = {
  contractAddress: string;
  name: string;
  tokenId: number;
  tokenStandard: string;
  chain: string;
  lastUpdated: string;
  creatorEarnings: string;
};
export type NFT = {
  id: number;
  marketplace: string;
  name: string;
  userName: string;
  currentBid: number;
  inDollars: number;
  details: NFTDetail[];
};

export type MarketPlaceItem = {
  category: string;
  nft: NFT[];
};

export type CategoriesCardProps = {
  title: string;
  cardimage: string;
};

export type ContributorCardProps = {
  name: string;
  ethAmount: string;
};

export type CollectionsCardProps = {
  id: number;
  tag: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  name: string;
  floorPrice: number;
  createdBy: string;
};

export type tagsData = {
  class: string;
  tag: string;
  category?: string[];
};

export type FAQsData = {
  question: string;
  answer: string[];
};

export type stepsData = {
  img: string;
  step: string;
  title: string;
  description: string;
};

type Details = {
  contractAddress: string;
  name: string;
  tokenId: number;
  tokenStandard: string;
  chain: string;
  lastUpdated: string;
  creatorEarnings: number;
};

export type History = {
  name: string;
  userName: string;
  bidPrice: number;
};

export type Listings = {
  id: number;
  marketplace: string;
  name: string;
  title: string;
  userName: string;
  image: string;
  currentBid: number;
  inDollars: number;
  startDate: string;
  endDate: string;
  details: Details;
  history: History[];
};

export type CollectionsData = {
  marketplace: string;
  userName: string;
  currentBid: number;
  inDollars: number;
  image: string;
  endAt: number;
  startAt: number;
  id: number;
  userId: number;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  tag: string;
  onSale: boolean;
  category: string;
  featured: boolean;
  name: string;
  description: string;
  creatorEarning: number;
  totalItems: number;
  createdAt: string;
  logo: string;
  coverImage: string;
  createdBy: string;
  floorPrice: number;
  Listings: Listings[];
};

export type NFTType = {
  id: number;
  type: string;
};

export type BidModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cancelButtonRef: any;
  _id: number;
  settingstate:any;
  tdata:boolean;
};

export type LoadingModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cancelButtonRef: any;
  loadingText:string;
  textToDisplay:string;
};

export type WalletType = {
  walletAddress: string;
  walletBalance: string;
};
export type UsersData = {
  id: string;
  walletAddress: string;
  Name?: string;
  userName: string;
  profileLogo?: string;
  coverPic?: string;
  Background?: string;
  type?: "celebrity" | "fan";
  collections: CollectionsData[];
};

export type _Nft = {
  marketplace: string;
  name: string;
  own: string;
  seller: string;
  tokenId: number;
  Imagelink: string;
  reservedPrice: number;
  startAt: number;
  endAt: number;
  status: number;
  highestBid: number;
  highestBidder: string;
  royality: number;
  HON: string;
  category: string;
  collection: string;
  typee:string
};
