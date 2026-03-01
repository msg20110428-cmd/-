"use server";

import { type NextRequest, NextResponse } from "next/server";

/***
 * Mode 기본값을 설정합니다.
 *
 * User Agent 기반으로 모바일은 simple, 기타 환경은 high-quality가 설정되고,
 * 이미 설정된 값이 있으면 변경하지 않습니다.
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const mode = req.cookies.get("mode");

  if (!mode) {
    const userAgent = req.headers.get("user-agent") || "";

    function isMobile(userAgent: string): boolean {
      return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
    }

    if (isMobile(userAgent)) {
      res.cookies.set("mode", "simple", { path: "/" });
    } else {
      res.cookies.set("mode", "high-quality", { path: "/" });
    }
  }

  return res;
}