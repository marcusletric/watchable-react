import type { RootState } from "@watchable/store";

export type CacheKeyType = string | number | symbol;

export type CacheRecord<CacheEntryType> = Record<CacheKeyType, CacheEntryType>;

export type CacheFolder<CacheEntryType, CacheFolderKey extends CacheKeyType> = RootState & {[k in CacheFolderKey]: CacheRecord<CacheEntryType>};

export type StateWithCachePartition<CacheEntryType, CachePartitionKey extends CacheKeyType> = RootState & {[k in CachePartitionKey]: CacheFolder<CacheEntryType, CacheKeyType>};