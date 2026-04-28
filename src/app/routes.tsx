import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Zarzad } from "./pages/Zarzad";
import { CertyfikatyPage } from "./pages/CertyfikatyPage";
import { KlienciPage } from "./pages/KlienciPage";
import { AktualnosciPage } from "./pages/Aktualnosci";
import { Services } from "./pages/Services";
import { Products } from "./pages/Products";
import { Contact } from "./pages/Contact";
import { DoPobrania } from "./pages/DoPobrania";
import { ZglosNieprawidlowosc } from "./pages/ZglosNieprawidlowosc";
import { StaticPage } from "./pages/StaticPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },

      // O nas
      { path: "o-nas", Component: About },
      { path: "o-nas/w-skrocie", element: <StaticPage slug="w-skrocie" title="W skrócie" /> },
      { path: "o-nas/zarzad", Component: Zarzad },
      { path: "o-nas/film-korporacyjny", element: <StaticPage slug="film-korporacyjny" title="Film korporacyjny" /> },
      { path: "o-nas/kodeks-etyki", element: <StaticPage slug="kodeks-etyki" title="Kodeks Etyki" /> },
      { path: "o-nas/rowne-szanse", element: <StaticPage slug="rowne-szanse" title="Równe Szanse" /> },
      { path: "o-nas/certyfikaty", Component: CertyfikatyPage },
      { path: "o-nas/klienci", Component: KlienciPage },
      { path: "o-nas/strategia-podatkowa", element: <StaticPage slug="strategia-podatkowa" title="Strategia podatkowa" /> },

      // Aktualności
      { path: "aktualnosci", Component: AktualnosciPage },

      // Nasza oferta
      { path: "nasza-oferta", Component: Services },
      { path: "nasza-oferta/wykonawstwo-instalacji", element: <StaticPage slug="wykonawstwo-instalacji" title="Wykonawstwo instalacji" /> },
      { path: "nasza-oferta/techniczny-facility-management", element: <StaticPage slug="techniczny-facility-management" title="Techniczny Facility Management" /> },

      // Projekty
      { path: "projekty", Component: Products },
      { path: "projekty/:kategoria", Component: Products },

      // Remaining pages
      { path: "dolacz-do-nas", element: <StaticPage slug="dolacz-do-nas" title="Dołącz do nas" /> },
      { path: "rodo", element: <StaticPage slug="rodo" title="RODO" /> },
      { path: "do-pobrania", Component: DoPobrania },
      { path: "zglos-nieprawidlowosc", Component: ZglosNieprawidlowosc },
      { path: "kontakt", Component: Contact },
      { path: "polityka-prywatnosci", element: <StaticPage slug="polityka-prywatnosci" title="Polityka prywatności" /> },

      // Legacy redirects
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "products", Component: Products },
      { path: "contact", Component: Contact },

      { path: "*", Component: NotFound },
    ],
  },
]);
