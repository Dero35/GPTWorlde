# 🟩 Klon Wordle – Instrukcja

Prosta gra przeglądarkowa typu Wordle napisana w TypeScript i Vite.

## Funkcje

- Zgadnij losowe 5-literowe słowo w 6 próbach
- Obsługa klawiatury ekranowej i fizycznej
- Kolorowe podpowiedzi dla liter trafionych, błędnych i na złym miejscu
- Instrukcja „Jak grać”
- Przycisk restartu gry

## Jak grać

1. Zgadnij **5-literowe słowo** w 6 próbach.
2. Każda próba musi być poprawnym 5-literowym słowem.
3. Wciśnij **Enter** (lub kliknij Enter na ekranie), aby zatwierdzić, oraz **Backspace** (lub ←), aby usunąć literę.
4. Kolory pól:
   - 🟩 **Zielony**: poprawna litera i pozycja
   - 🟨 **Żółty**: poprawna litera, zła pozycja
   - ⬜ **Szary**: litery nie ma w słowie

## Uruchomienie lokalnie

### Wymagania

- [Node.js](https://nodejs.org/) (zalecana wersja 16 lub nowsza)
- [npm](https://www.npmjs.com/) (instaluje się razem z Node.js)

### Instalacja i uruchomienie

1. **Pobierz lub sklonuj** to repozytorium na swój komputer.
2. Otwórz terminal w folderze projektu.

3. **Zainstaluj zależności:**
   ```sh
   npm install
   ```

4. **Uruchom serwer deweloperski:**
   ```sh
   npm run dev
   ```

5. Otwórz przeglądarkę i przejdź pod adres wyświetlony w terminalu (zwykle [http://localhost:5173](http://localhost:5173)).

### Budowanie wersji produkcyjnej

Aby zbudować statyczną wersję gry:

```sh
npm run build
```

Wynik znajdziesz w folderze `dist/`.

---

Miłej zabawy!