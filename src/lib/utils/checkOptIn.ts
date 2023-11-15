import type algosdk from 'algosdk'

export const check_opted_into_asset = async (
    indexer: algosdk.Indexer,
    assetId: number,
    address: string
) => {
    let out = await indexer.lookupAccountAssets(address).do()
    let assetIds = out.assets.map((asset) => parseInt(asset['asset-id']))
    return assetIds.includes(assetId)
}
