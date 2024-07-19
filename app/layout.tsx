import "./globals.css";
import { Manrope } from "next/font/google";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/provider/toaster.provider";
import { Analytics } from "@vercel/analytics/react";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      appearance={{
        variables: {
          colorTextSecondary: "#454545",
          colorTextOnPrimaryBackground: "#ffffff",
          colorPrimary: "#3657FF",
          colorBackground: "#D9E2FF",
          colorInputBackground: "#FFFFFF",
          colorText: "#121212",
          colorWarning: "#F5B40B",
          colorDanger: "#DC2626",
          colorNeutral: "#121212",
          colorInputText: "#121212",
        },
      }}
    >
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="robots" content="index,follow" />
          <meta name="theme-color" content="#EEF2FF" />
          <meta name="author" content="Thomas Remblier" />
          <title>Open 3D</title>
          <meta property="og:site_name" content="Open 3D" />
          <meta name="twitter:title" content="Open 3D" />
          <meta property="og:title" content="Open 3D" />
          <meta property="og:type" content="website" />
          <meta name="twitter:image:alt" content="logo open 3d" />
          <meta name="twitter:locale" content="fr_FR" />
          <meta name="twitter:site" content="@site" />
          <meta name="twitter:creator" content="@kc_thomaaas" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content="Tuto blender, blender,cours 3D,cours 3D en ligne , tuto modélisation, tuto texture, Open 3D, 3D, animation 3D, texture 3D"
          />
          <meta property="og:url" content="https://www.liftdigital.fr" />
          <meta property="og:image" content="/big-logo.png" />
          <meta name="twitter:image" content="/logo2.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="apple-touch-icon" href="/flavicon.ico" />
          <link rel="canonical" href="liftdigital.fr" />

          <meta
            name="description"
            content="Bienvenue sur Open 3D, votre compagnon dans l'apprentissage de la modélisation, de la texturation et de l'animation 3D. Retrouvez un ensemble de tutoriels et de cours en ligne pour vous aider à progresser dans le monde de la 3D."
          />
          <meta
            property="og:description"
            content="Bienvenue sur Open 3D, votre compagnon dans l'apprentissage de la modélisation, de la texturation et de l'animation 3D. Retrouvez un ensemble de tutoriels et de cours en ligne pour vous aider à progresser dans le monde de la 3D."
          />
          <meta
            name="twitter:description"
            content="Bienvenue sur Open 3D, votre compagnon dans l'apprentissage de la modélisation, de la texturation et de l'animation 3D. Retrouvez un ensemble de tutoriels et de cours en ligne pour vous aider à progresser dans le monde de la 3D."
          />
        </head>
        <body
          className={`${manrope.className} ${poppins.className} bg-blue-ribbon-50`}
        >
          <ToastProvider />
          {children}
        </body>
      </html>
      <Analytics />
    </ClerkProvider>
  );
}
