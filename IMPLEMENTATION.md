# A2BUD — obsługa strony

## Uruchomienie

- `npm install`
- `npm run dev` — lokalny podgląd, domyślnie http://localhost:4321
- `npm run build` — statyczna strona w `dist/`
- `npm run preview` — podgląd wersji produkcyjnej

## Treści i fotografie

- Dane dziewięciu usług: `src/data/services.ts`.
- Wspólny nagłówek i stopka: `src/layouts/Layout.astro`.
- Style i lokalne fonty: `src/styles/global.css`.
- Wszystkie miejsca na fotografie używają `src/components/Placeholder.astro` i atrybutu `data-photo-slot` z opisem.
- Po otrzymaniu zdjęć można rozszerzyć komponent o opcjonalne źródło obrazu, zachowując istniejący kontener i proporcje. Obraz powinien wypełniać kontener (`width: 100%; height: 100%; object-fit: cover`) oraz otrzymać właściwy tekst alternatywny.
- Galeria świadomie zawiera wyłącznie miejsca na przyszłe projekty. Przed dodaniem faktycznych realizacji uzupełnij opisy, nazwy i lokalizacje oraz usuń komunikaty o przygotowywaniu galerii.

## Kontakt

Formularz ma walidację przeglądarkową. Wybranie wyceny na podstronie usługi przekazuje jej identyfikator do formularza. Po zatwierdzeniu formularz otwiera wiadomość `mailto:` — nie wysyła jej przez serwer. Użytkownik potrzebuje skonfigurowanego programu pocztowego. Pliki nie są przesyłane: ich nazwy trafiają do wiadomości, a same załączniki należy dołączyć ręcznie.

Bezpośrednia wysyłka bez programu pocztowego wymaga wdrożenia backendu lub usługi formularzy, konfiguracji odbiorcy oraz zabezpieczeń przed spamem. Dane do takiej usługi nie zostały dostarczone.

## Przed publikacją

- Uzupełnij pełną politykę prywatności o dane właściciela i faktyczne zasady przetwarzania danych. Obecna podstrona opisuje działanie techniczne i wyraźnie wskazuje brakujące informacje.
- Po ustaleniu domeny dodaj adres `site` w konfiguracji Astro, adresy kanoniczne i mapę witryny z rzeczywistą domeną.
- Sprawdź układ oraz interakcje w przeglądarkach mobilnych i desktopowych. Automatyczny dostęp do przeglądarki był niedostępny podczas realizacji.

## Weryfikacja

Build Astro zakończony poprawnie: 15 stron. Kontrola wygenerowanego HTML: po jednym H1 na stronę, polski język, opisy meta, 353 poprawne odwołania wewnętrzne, 48 placeholderów i brak elementów zdjęć. Strona główna, kontakt, realizacje i przykładowa podstrona usługi zwróciły HTTP 200.
