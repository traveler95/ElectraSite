const BASE_URL = 'https://cms.23.88.63.245.sslip.io';

export function fileUrl(fileId: string | null | undefined): string {
  if (!fileId) return '';
  return `${BASE_URL}/assets/${fileId}`;
}

async function fetchItems<T>(collection: string, params?: Record<string, string>): Promise<T[]> {
  const url = new URL(`${BASE_URL}/items/${collection}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch ${collection}`);
  return (await res.json()).data;
}

async function createItem(collection: string, body: object): Promise<void> {
  const res = await fetch(`${BASE_URL}/items/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to submit to ${collection}`);
}

export type Projekt = {
  id: number;
  tytul: string;
  slug: string;
  kategoria: number | { nazwa: string };
  opis: string;
  zdjecie_glowne: string | null;
  opublikowany: boolean;
};

export type KategoriaProjektu = {
  id: number;
  nazwa: string;
  slug: string;
  zdjecie: string | null;
};

export type Oferta = {
  id: number;
  tytul: string;
  slug: string;
  tresc: string;
  kolejnosc: number;
};

export type CzlonekZarzadu = {
  id: number;
  imie_nazwisko: string;
  stanowisko: string;
  zdjecie: string | null;
};

export type Aktualnosc = {
  id: number;
  tytul: string;
  slug: string;
  miniaturka: string | null;
  zajawka: string;
  tresc: string;
  data_publikacji: string;
  opublikowany: boolean;
};

export type ZgloszenieKontaktowe = {
  imie_nazwisko: string;
  email: string;
  telefon: string;
  temat: string;
  zgoda_rodo: boolean;
};

export const api = {
  projekty: {
    list: (params?: Record<string, string>) =>
      fetchItems<Projekt>('projekty', {
        'filter[opublikowany][_eq]': 'true',
        'fields[]': '*,kategoria.nazwa',
        ...params,
      }),
  },
  kategorie: {
    list: () => fetchItems<KategoriaProjektu>('kategorie_projektow', { sort: 'kolejnosc' }),
  },
  oferty: {
    list: () => fetchItems<Oferta>('oferty', { sort: 'kolejnosc' }),
  },
  zarzad: {
    list: () => fetchItems<CzlonekZarzadu>('zarzad', { sort: 'kolejnosc' }),
  },
  aktualnosci: {
    list: (params?: Record<string, string>) =>
      fetchItems<Aktualnosc>('aktualnosci', {
        'filter[opublikowany][_eq]': 'true',
        sort: '-data_publikacji',
        ...params,
      }),
  },
  kontakt: {
    submit: (data: ZgloszenieKontaktowe) => createItem('zgloszenia_kontaktowe', data),
  },
};
