export interface AlgolenListing {
    asset_id: string;
    name: string;
    url: string;
    deposit: Number;
    price_per_day: Number;
    max_duration_in_days: Number;
    owner: string;
  }

export interface AlgolenRent {
    end_date: BigInt
    deposit: BigInt
    asset_owner: string
    asset_renter: string
}

export type NFT = {
    address: string;
    url: string;
}