export interface AlgolenListing {
    asset_id: number
    name: string
    url: string
    deposit: number
    price_per_day: number
    max_duration_in_days: number
    owner: string
}

export interface AlgolenRent {
    asset_id: number
    name: string
    url: string
    end_date: Number
    deposit: Number
    asset_owner: string
    asset_renter: string
}

export type NFT = {
    asset_id: number
    address: string
    name: string
    url: string
}
