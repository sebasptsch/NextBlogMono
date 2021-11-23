import { Chakra } from "@/utils/chakra";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { NextScript } from "next/document";
import React from "react";
import "react-static-tweets/styles.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_AU",
          url: "https://sebasptsch.dev/",
          site_name: "Sebastian Pietschner - Developer and Student",
        }}
        twitter={{
          handle: "@sebasptsch",
          site: "@sebasptsch",
          cardType: "summary_large_image",
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Sebastian Pietschner"
        url="https://sebasptsch.dev"
        sameAs={["https://twitter.com/sebasptsch"]}
      />
      <Component {...pageProps} />
      {/* </SessionProvider> */}
      <NextScript>
        {
      `(function(d,t) {
        var BASE_URL="https://chat.sebasptsch.dev";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.chatwootSDK.run({
            websiteToken: 'd8XEBQR66PMkAVXPMXuSLn1y',
            baseUrl: BASE_URL
          })
        }
      })(document,"script");`
    }
      </NextScript>
    </Chakra>
  );
}
export { getServerSideProps } from "@/utils/chakra";
export default MyApp;
