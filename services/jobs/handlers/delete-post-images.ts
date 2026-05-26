import type { FileObject } from "@supabase/storage-js";

import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import type { DeletePostImages } from "../../../queues/storage.queue";

const BUCKET = "images";

export async function deletePostImagesHandler({
  imageKeys,
}: DeletePostImages): Promise<FileObject[]> {
  if (imageKeys.length === 0) return [];

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove(imageKeys);

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`);
  }

  return data ?? [];
}
