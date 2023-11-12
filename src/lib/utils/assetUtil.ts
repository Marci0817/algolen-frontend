import type { Asset } from "algosdk/dist/types/client/v2/algod/models/types";
import { getAlgolenListingBoxes, type AlgolenListing } from "./boxUtil";
import type AlgodClient from "algosdk/dist/types/client/v2/algod/algod";
import type IndexerClient from "algosdk/dist/types/client/v2/indexer/indexer";

export const fetchAsset = async (asset_id, algodClient): Promise<Asset> => {
  const indexerAssetInfo = await algodClient.lookupAssetByID(asset_id).do();
  return indexerAssetInfo.asset;
};

export const searchListings = async (
  algod: AlgodClient,
  indexer: IndexerClient,
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
