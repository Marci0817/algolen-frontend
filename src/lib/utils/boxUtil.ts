import { env } from '$env/dynamic/public'
import algosdk from 'algosdk'
import { EncodedUInt64ToString } from './encoding'
import { fetchAsset } from './assetUtil'
import type { AlgolenListing, AlgolenRent } from './types'
import PlaceholderNFT from '$lib/assets/placeholderNFT.png'
const ALGOLENLISTINGCODEC = algosdk.ABIType.from(
    '(uint64,uint64,uint64,address)'
)
const ALGOLENRENTCODEC = algosdk.ABIType.from('(uint64,uint64,address,address)')

export async function getAlgolenListingBoxes(
    algodClient: algosdk.Algodv2,
    indexerClient: algosdk.Indexer
): Promise<AlgolenListing[]> {
    let resultset: AlgolenListing[] = []
    let boxes = await algodClient
        .getApplicationBoxes(parseInt(env.PUBLIC_APP_ID))
        .do()
    const boxNames: Uint8Array[] = boxes.boxes.map((box) => box.name)
    for (const boxName of boxNames) {
        let encodedValue = await algodClient
            .getApplicationBoxByName(
                parseInt(env.PUBLIC_APP_ID),
                boxName as unknown as Uint8Array
            )
            .do()
        try {
            let decodedValue = ALGOLENLISTINGCODEC.decode(encodedValue.value)
            let decodedBoxName = EncodedUInt64ToString(boxName)
            const asset = await fetchAsset(decodedBoxName, indexerClient)
            let url;
            try {
                new URL(asset.params.url);
                url = asset.params.url;
            } catch(ex) {
                url = PlaceholderNFT
            }
            resultset.push({
                asset_id: parseInt(decodedBoxName),
                name: asset.params.name,
                url: url,
                deposit: Number(decodedValue[0]),
                price_per_day: Number(decodedValue[1]),
                max_duration_in_days: Number(decodedValue[2]),
                owner: decodedValue[3],
            })
        } catch (ex) {
            
        }
    }
    return resultset
}

export async function getAlgolenRentBoxes(
    algodClient: algosdk.Algodv2,
    indexerClient: algosdk.Indexer
): Promise<AlgolenRent[]> {
    let resultset: AlgolenRent[] = []
    let boxes = await algodClient
        .getApplicationBoxes(parseInt(env.PUBLIC_APP_ID))
        .do()
    const boxNames: Uint8Array[] = boxes.boxes.map((box) => box.name)
    for (const boxName of boxNames) {
        let encodedValue = await algodClient
            .getApplicationBoxByName(
                parseInt(env.PUBLIC_APP_ID),
                boxName as unknown as Uint8Array
            )
            .do()
        try {
            let decodedValue = ALGOLENRENTCODEC.decode(encodedValue.value)
            let decodedBoxName = EncodedUInt64ToString(boxName)
            const asset = await fetchAsset(decodedBoxName, indexerClient)
            let url;
            try {
                new URL(asset.params.url)
                url = asset.params.url
            } catch(ex) {
                url = PlaceholderNFT
            }
            resultset.push({
                asset_id: parseInt(decodedBoxName),
                name: asset.params.name,
                url: url,
                end_date: Number(decodedValue[0]),
                deposit: Number(decodedValue[1]),
                asset_owner: decodedValue[2],
                asset_renter: decodedValue[3],
            })
        } catch (ex) {
            continue
        }
    }
    return resultset
}
