import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Your webhook secret from Sanity (we'll set this up in the environment variables)
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text(); // Get the raw body
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) as string;

    if (!secret || !signature) {
      return Response.json(
        { message: "Missing secret or signature" },
        { status: 401 },
      );
    }

    // Validate the webhook signature
    if (!isValidSignature(body, signature, secret)) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }

    const jsonBody = JSON.parse(body);
    const { _type } = jsonBody;

    // Determine which tags to revalidate based on the document type
    switch (_type) {
      case "post":
        await revalidateTag("post");
        break;
      case "author":
        await revalidateTag("author");
        break;
      case "category":
        await revalidateTag("category");
        break;
    }

    return Response.json({
      message: `Revalidated ${_type}`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return Response.json({ message: (err as Error).message }, { status: 500 });
  }
}
