"use client";

import Script from "next/script";

/**
 * Baidu auto-push. Fires once per page view and tells Baidu the URL exists,
 * which is the cheapest way to shorten its discovery lag on a new section.
 * Loaded only inside /zh so it never runs for non-Chinese visitors.
 */
export function BaiduAutoPush() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="baidu-auto-push" strategy="afterInteractive">
      {`(function(){
        var bp = document.createElement('script');
        var protocol = window.location.protocol.split(':')[0];
        bp.src = protocol === 'https'
          ? 'https://zz.bdstatic.com/linksubmit/push.js'
          : 'http://push.zhanzhang.baidu.com/push.js';
        var first = document.getElementsByTagName('script')[0];
        if (first && first.parentNode) first.parentNode.insertBefore(bp, first);
      })();`}
    </Script>
  );
}
