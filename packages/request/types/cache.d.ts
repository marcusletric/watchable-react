import type { Store } from "@watchable/store";

export type CacheKeyType = string | number | symbol;

export type CacheRecord<CacheEntryType> = Record<CacheKeyType, CacheEntryType>;

export type CachePartition<CacheEntryType> = Record<CacheKeyType, CacheRecord<CacheEntryType>>;

export type StateWithCachePartition<StoreSchema, CacheEntryType, CachePartitionKey extends CacheKeyType> = Record<CachePartitionKey & keyof StoreSchema, CachePartition<CacheEntryType> & unknown>;

export type StoreWithCache<StoreSchema extends object, CacheEntryType, CachePartitionKey extends CacheKeyType> = Store<StateWithCachePartition<StoreSchema, CacheEntryType, CachePartitionKey>>;