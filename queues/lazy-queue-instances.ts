import { createLazyQueue } from "./lazy-queue";

export const getCacheQueue = createLazyQueue("cache");
export const getEmailQueue = createLazyQueue("email");
export const getStorageQueue = createLazyQueue("storage");
export const getUploadQueue = createLazyQueue("upload");

export const CACHE_QUEUE_NAME = "cache";
export const EMAIL_QUEUE_NAME = "email";
export const STORAGE_QUEUE_NAME = "storage";
export const UPLOAD_QUEUE_NAME = "upload";
