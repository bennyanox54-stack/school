# WaMUT Website

This project contains the front-end website and the PHP-based student authentication flow for WaMUT.

## Local preview

```bash
cd "/run/media/waweru/6EAE-EAC7/school regislation .html"
python3 -m http.server 8000
```

Then open: http://localhost:8000/

## Database setup

Copy `.env.example` to `.env` and fill in your MySQL credentials:

```bash
cp .env.example .env
```

The PHP code expects these values:
- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## GitHub Pages note

GitHub Pages only supports static files. The front-end pages can be hosted there, but the PHP login and registration flow requires a PHP-capable hosting provider or server with MySQL access.

## Student database

The schema is in `detais.sql`.

Use the following PHP files for sign-in and registration:
- `register.php`
- `authenticate.php`
- `db.php`
