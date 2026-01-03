import { NextResponse } from "next/server";
import { createUserIfNotExists } from "@/lib/users";

export async function GET() {
  const fakeUid = "test_uid_123";
  const fakeEmail = "test@riseup.com";

  await createUserIfNotExists(fakeUid, fakeEmail);

  return NextResponse.json({
    success: true,
    message: "User created or already exists",
  });
}

