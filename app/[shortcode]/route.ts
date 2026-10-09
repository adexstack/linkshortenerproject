import { notFound, redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { getLinkByShortCode } from "@/data/links";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;
  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    notFound();
  }

  redirect(link.originalUrl);
}
