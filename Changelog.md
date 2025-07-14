# Changelog

14.07.2025
### API
- Added RateLimiting ( very primitive DDOS attack protection )
- Added `ValidPassword()` in RegisterModel ( Password Requirements )

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
