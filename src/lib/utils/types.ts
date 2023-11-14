export interface AlgolenListing {
  asset_id: number;
  name: string;
  url: string;
  deposit: Number;
  price_per_day: Number;
  max_duration_in_days: Number;
  owner: string;
}

export interface AlgolenRent {
  asset_id: number;
  name: string;
  url: string;
  end_date: Number;
  deposit: Number;
  asset_owner: string;
  asset_renter: string;
}

export type NFT = {
  asset_id: number;
  address: string;
  name: string;
  url: string;
};
