import '@hyperledger/aries-askar-nodejs'
import { ariesAskar, LogLevel, Store, StoreKeyMethod } from '@hyperledger/aries-askar-shared'

export const getRawKey = () => Store.generateRawKey(Buffer.from('00000000000000000000000000000My1'))
export const testStoreUri = process.env.URI || 'sqlite://:memory:'

let fnCounter = 0
const fnOnce = (fn: () => void) => {
  if (!fnCounter) {
    fn()
    fnCounter++
  }
}

export const setup = () => {
  fnOnce(
    () =>
      process.env.LOG &&
      ariesAskar.setCustomLogger({
        logger: () => {
          /* TODO */
        },
        logLevel: LogLevel.Trace,
      })
  )
}

export const setupWallet = async () => {
  const key = getRawKey()

  return await Store.provision({
    recreate: true,
    uri: testStoreUri,
    keyMethod: StoreKeyMethod.Raw,
    passKey: key,
  })
}

export const base64url = (str: string) => Buffer.from(str).toString('base64url')
