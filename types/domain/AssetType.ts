import { isObject } from 'utils/isObject'

export interface AssetType {
  object: 'asset'
  id: number
  created_transaction_hash: string
  created_transaction_timestamp: string
  identifier: string
  metadata: string
  name: string
  owner: string
  supply: string
}

export function isAsset(maybeAsset: unknown): maybeAsset is AssetType {
  if (!isObject(maybeAsset)) return false

  const obj = maybeAsset as object

  return 'object' in obj && obj.object === 'asset'
}

export default AssetType
