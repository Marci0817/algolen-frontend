import { APP_SPEC } from './client_generate'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import {
    transferAlgos,
    microAlgos,
    getAppClient,
    transferAsset,
    getBoxReference,
} from '@algorandfoundation/algokit-utils'
import type { BoxIdentifier } from '@algorandfoundation/algokit-utils/types/app'
import { env } from '$env/dynamic/public'
import algosdk from 'algosdk'
import type { ApplicationClient } from '@algorandfoundation/algokit-utils/types/app-client'
export class AlgolenClient {
    app_client: ApplicationClient
    signer: TransactionSignerAccount
    app_address: string
    app_id: number
    algod: algosdk.Algodv2
    indexer: algosdk.Indexer

    constructor(
        app_id: number,
        app_address: string,
        signer: TransactionSignerAccount,
        algod: algosdk.Algodv2,
        indexer: algosdk.Indexer
    ) {
        this.app_client = getAppClient(
            { resolveBy: 'id', id: app_id, app: APP_SPEC, sender: signer },
            algod
        )
        this.signer = signer
        this.app_address = app_address
        this.app_id = app_id
        this.algod = algod
        this.indexer = indexer
    }

    async check_opted_into_asset(assetId: number) {
        let out = await this.indexer.lookupAccountAssets(this.app_address).do()
        let assetIds = out.assets.map((asset) => parseInt(asset['asset-id']))
        return assetIds.includes(assetId)
    }
    async optIntoAsset(assetId: number) {
        return await transferAsset(
            {
                from: this.signer,
                to: this.signer.addr,
                assetId: assetId,
                amount: 0,
                skipSending: false,
            },
            this.algod
        )
    }

    async opt_in_to_asset(assetId: number) {
        const txn = await transferAlgos(
            {
                from: this.signer,
                to: this.app_address,
                amount: microAlgos(1_000_000),
                skipSending: true,
            },
            this.algod
        )
        await this.app_client.call({
            method: 'opt_in_to_asset',
            methodArgs: [txn.transaction],
            assets: [assetId],
        })
    }

    async listNft(
        assetId: number,
        deposit: number,
        pricePerDay: number,
        MaxDurationInDays: number
    ) {
        const encoder = new TextEncoder()
        let txn = await transferAsset(
            {
                from: this.signer,
                to: this.app_address,
                assetId: assetId,
                amount: 1,
                skipSending: true,
            },
            this.algod
        )

        await this.app_client.call({
            method: 'list_nft',
            methodArgs: [
                txn.transaction,
                deposit,
                pricePerDay,
                MaxDurationInDays,
            ],
            boxes: [
                { appId: this.app_id, name: algosdk.encodeUint64(assetId) },
            ],
            assets: [assetId],
        })
    }
    async delistNFT(assetId: number) {
        const txn = await transferAlgos(
            {
                from: this.signer,
                to: this.app_address,
                amount: microAlgos(1000),
                skipSending: true,
            },
            this.algod
        )
        await this.app_client.call({
            method: 'delist_nft',
            methodArgs: [txn.transaction],
            boxes: [
                { appId: this.app_id, name: algosdk.encodeUint64(assetId) },
            ],
            assets: [assetId],
        })
    }

    async rentNFT(
        assetId: number,
        durationInDays: number,
        pricePerDay: number
    ) {
        const txn = await transferAlgos(
            {
                from: this.signer,
                to: this.app_address,
                amount: microAlgos(pricePerDay * durationInDays + 4000),
                skipSending: true,
            },
            this.algod
        )
        await this.app_client.call({
            method: 'rent_nft',
            methodArgs: [txn.transaction, durationInDays],
            boxes: [
                { appId: this.app_id, name: algosdk.encodeUint64(assetId) },
            ],
            assets: [assetId],
        })
    }
    async returnNFT(assetId: number) {
        let txn = await transferAsset(
            {
                from: this.signer,
                to: this.app_address,
                assetId: assetId,
                amount: 1,
                skipSending: true,
            },
            this.algod
        )

        await this.app_client.call({
            method: 'return_nft',
            methodArgs: [txn.transaction],
            boxes: [
                { appId: this.app_id, name: algosdk.encodeUint64(assetId) },
            ],
            assets: [assetId],
        })
    }

    async claimDeposit(assetId: number) {
        await this.app_client.call({
            method: 'claim_deposit',
            methodArgs: [],
            boxes: [
                { appId: this.app_id, name: algosdk.encodeUint64(assetId) },
            ],
            assets: [assetId],
        })
    }
}
