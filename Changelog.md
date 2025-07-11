# Changelog
11.07.2025
### Api
#### Changed
- Refactored existing methods:
  - `GET` methods are now publicly accessible
  - `POST`, `PUT`, and `DELETE` methods require a valid JWT token

#### Added
- Implemented connection to MySQL
- App can now be fully configured via `appsettings.json`:
  - `ConnectionStrings`
  - `JWT` settings
  - `CORS` configuration
    
### Website
-  Created component Server, AboutData, RulesData
-  Finished fetching data for About page
