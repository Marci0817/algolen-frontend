import { env } from "$env/dynamic/public";
import algosdk from "algosdk";
const ALGOLENLISTINGCODEC = algosdk.ABIType.from("(uint64,uint64,uint64,address)");
const ALGOLENRENTCODEC = algosdk.ABIType.from("(uint64,uint64,address,address)");

interface AlgolenListing {
    deposit: BigInt
    price_per_day: BigInt
    max_duration_in_days: BigInt
    owner: string
}

interface AlgolenRent {
    end_date: BigInt
    deposit: BigInt
    asset_owner: string
    asset_renter: string
}

export async function getAlgolenListingBoxes(algodClient: algosdk.Algodv2): Promise<AlgolenListing[]> {
    let resultset: AlgolenListing[] = [];
    let boxes = await algodClient.getApplicationBoxes(parseInt(env.PUBLIC_APP_ID)).do();
    const boxNames: Uint8Array[] = boxes.boxes.map((box) => box.name);
    for(const boxName of boxNames) {
        let encodedValue = await algodClient.getApplicationBoxByName(parseInt(env.PUBLIC_APP_ID), boxName as unknown as Uint8Array).do();
        try {
            let decodedValue = ALGOLENLISTINGCODEC.decode(encodedValue.value);
            resultset.push({
                "deposit": decodedValue[0],
                "price_per_day": decodedValue[1],
                "max_duration_in_days": decodedValue[2],
                "owner": decodedValue[3]
            })
        }
        catch(ex) {
            continue;
        }
    }
    return resultset;
}

export async function getAlgolenRentBoxes(algodClient: algosdk.Algodv2): Promise<AlgolenRent[]> {
    let resultset: AlgolenRent[] = [];
    let boxes = await algodClient.getApplicationBoxes(parseInt(env.PUBLIC_APP_ID)).do();
    const boxNames: Uint8Array[] = boxes.boxes.map((box) => box.name);
    for(const boxName of boxNames) {
        let encodedValue = await algodClient.getApplicationBoxByName(parseInt(env.PUBLIC_APP_ID), boxName as unknown as Uint8Array).do();
        try {
            let decodedValue = ALGOLENRENTCODEC.decode(encodedValue.value);
            resultset.push({
                "end_date": decodedValue[0],
                "deposit": decodedValue[1],
                "asset_owner": decodedValue[2],
                "asset_renter": decodedValue[3]
            })
        }
        catch(ex) {
            continue;
        }
    }
    return resultset;
}
