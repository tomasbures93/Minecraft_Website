# Changelog

17.07.2025
### API
- Added support for `HTTPS` debugging (due to the use of `HttpOnly` and `Secure` cookies).
- ⚠️ Note: A **self-signed certificate** is now required when running the application locally.

### Website
- Fixed issue with setting `HttpOnly` cookies on the frontend. Users can now log in and log out successfully.

- From now on you might need SelfSignedCertificate if you want to run it local
  
<hr />

16.07.2025
### Website
- `Footer.jsx` , `NotFound.jsx` and `Login.jsx` redesign
- You can login into `AdminPage.jsx` via `Login.jsx`
- Created `NavbarAdmin.jsx` and `LogoutPage.jsx`
  - LogoutPage does not work / Routing for NavbarAdmin does not work

<hr />

15.07.2025
### Website
- Imported `phosphor-react` package ( icons )
- Complete redesign of a website

<hr />

14.07.2025
### API
- Added RateLimiting ( very primitive DDOS attack protection )
- Added `ValidPassword()` and `ValidPIN()` in RegisterModel ( Password Requirements, PIN length Requirements )

### Website
- Added `Login.jsx` - Login page to get into AdminPanel - basic Design done
- Added `Impressum.jsx`, `Datenschutz.jsx` and `NotFound.jsx` - still empty pages
- Moved `Navbar.jsx` from Pages to Components

<hr />

13.07.2025
### Api
- `ServerStatusChecker` class added (background worker for Server status checking)
- Reworked `GetServerInfo()` method to also give ServerStatus back

### Website
- Small update of `Server.jsx` ( how it gives data back and design )
- `HomePageData.jsx` redesign how Articles are shown
- `ChangeLogData.jsx` redesign how Articles are shown
- Added some text to `Footer.jsx`

<hr />

11.07.2025
### Api
- Refactored existing methods:
  - `GET` methods are now publicly accessible
  - `POST`, `PUT`, and `DELETE` methods require a valid JWT token
- Implemented connection to MySQL
- App can now be fully configured via `appsettings.json`:
  - `ConnectionStrings`
  - `JWT` settings
  - `CORS` configuration
    
### Website
-  Created component Server, AboutData, RulesData
-  Finished fetching data for About page
