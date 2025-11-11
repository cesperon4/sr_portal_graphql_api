import { redis } from "../lib/redis";
import crypto from 'crypto';
import stringify from 'fast-json-stable-stringify';

import { type CacheKeyVariables, type CacheValues } from "graphql/types/cache";


export function makeCacheKey(operationName: string, variables: CacheKeyVariables){
    const payload = `${operationName}:${stringify(variables ?? {})}`
    return crypto.createHash('sha256').update(payload).digest('hex')
}

export async function setJSON<T>(key: string, value: T , ttlMs: number): Promise<void>{
    await redis.set(key, JSON.stringify(value), 'PX', ttlMs)
}

export async function getJSON<T>(key: string): Promise<T | null>{

    const raw = await redis.get(key)
    if(!raw) return null

    try{
        return JSON.parse(raw) as T
    }catch(err){
        await redis.del(key)
        return null
    }
}