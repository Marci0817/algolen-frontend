import type { Asset } from "algosdk/dist/types/client/v2/algod/models/types";
import { getAlgolenListingBoxes, type AlgolenListing } from "./boxUtil";
import type algosdk from "algosdk";

export const fetchAsset = async (asset_id, algodClient): Promise<Asset> => {
  const indexerAssetInfo = await algodClient.lookupAssetByID(asset_id).do();
  return indexerAssetInfo.asset;
};

export const searchListings = async (
  algod: algosdk.Algodv2,
  indexer: algosdk.Indexer,
  search?: string
): Promise<AlgolenListing[]> => {
  let listings = await getAlgolenListingBoxes(algod, indexer);
  if (!search) {
    return listings;
  }
  return listings.filter((listing) => {
    return listing.name.toLowerCase().includes(search.toLowerCase());
  });
};
