# Changelog

04.08.2025
### Website
- Created `TextArea.jsx` (Admin component) - Selected text in the textarea can now be wrapped with Markdown syntax using custom buttons (**bold**, _italic_), rendered via `ReactMarkdown`. *This component is reusable and can be integrated into multiple admin pages.*
- Created `HomePage.jsx` (Admin page) - Admins can now create new articles. *(Edit and Delete functionality coming soon)*
- Created `ChangelogPage.jsx` (Admin page) - placeholder page for future changelog display.

### Api
- `WebsiteController` - Added [FromBody] attribute to all methods that require it.
  
30.07.2025
### Website
- `RulesPage.jsx` - Selected text in the textarea can now be wrapped with Markdown syntax using custom buttons (**bold**, _italic_), rendered via `ReactMarkdown`. ( This logic is reusable and will also work in other .jsx pages. )

28.07.2025
### Website
- Finished `RulesPage.jsx`: fetching and updating rules now works.

22.07.2025
### API
- Fixed bugs in `Login` and `UpdateServerInfo` methods

### Website
- Reworked token handling: Instead of storing a real token, the app now sets a flag (token = true) in sessionStorage when a valid JWT is received via HttpOnly cookie. This "pseudo token" is used as a simple marker to control access to the admin panel on the client side.
- Completed `AdminPage.jsx` - includes full design and backend integration for managing website information.
- Added `RulesPage.jsx` as blank page for now

17.07.2025
### API
- Added support for `HTTPS` debugging (due to the use of `HttpOnly` and `Secure` cookies).
- ⚠️ Note: A **self-signed certificate** is now required when running the application locally.
- Added more properties to `ServerInfo` class 

### Website
- Fixed issue with setting `HttpOnly` cookies on the frontend. Users can now log in and log out successfully.
- Moved fetching of `ServerInfo` data from `Footer.jsx` to `App.jsx` for improved structure and centralized state management.
- Started development on `AdminPage.jsx` to allow editing and saving of website information.

16.07.2025
### Website
- `Footer.jsx` , `NotFound.jsx` and `Login.jsx` redesign
- You can login into `AdminPage.jsx` via `Login.jsx`
- Created `NavbarAdmin.jsx` and `LogoutPage.jsx`
  - LogoutPage does not work / Routing for NavbarAdmin does not work

15.07.2025
### Website
- Imported `phosphor-react` package ( icons )
- Complete redesign of a website

14.07.2025
### API
- Added RateLimiting ( very primitive DDOS attack protection )
- Added `ValidPassword()` and `ValidPIN()` in RegisterModel ( Password Requirements, PIN length Requirements )

### Website
- Added `Login.jsx` - Login page to get into AdminPanel - basic Design done
- Added `Impressum.jsx`, `Datenschutz.jsx` and `NotFound.jsx` - still empty pages
- Moved `Navbar.jsx` from Pages to Components

13.07.2025
### Api
- `ServerStatusChecker` class added (background worker for Server status checking)
- Reworked `GetServerInfo()` method to also give ServerStatus back

### Website
- Small update of `Server.jsx` ( how it gives data back and design )
- `HomePageData.jsx` redesign how Articles are shown
- `ChangeLogData.jsx` redesign how Articles are shown
- Added some text to `Footer.jsx`

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
