# security_project
This is a small application I built for school during our security course. I have some previous experience with Astro however I decided to leverage Astro's server side rendering for this assignment.

The layout of the project is as follows:
  - /src:
    - Components: Contains Navbar as well as ProductCard Astro components
    - Layouts: Contains main layout of page
    - Pages: Contains all astro pages ie index (main), login, logout etc
    - api.js: Contains methods for database calls
    - db.js: Similar to "dbContext" from Microsoft Entity, contains initialization of Sequelize as well as models for Users and Products
    - utils.js: Helper methods for authentication, authorization, encryption, and logging

The main goals of the application were to prevent XSS and SQL Injection attacks, as well as implement authentication and authorization. We also needed to hash and salt passwords as well as ensure that the log file was inaccessible

SQL Injections:
  - Used Sequelize which implements parameterized queries
XSS Attacks:
  - Implemented CORS to limit data types to JSON
  - Used html-sanitze, a recognized library to sanitize inputs before querying db
Authentication & Authorization:
  - Used Json Web Tokens and Cookies for authentication and authorization
Hashing:
  - Used Argon2 due to it's prevelance to hash and verify passwords
Logging:
  - Used winston for logging
  - Added vite middleware to redirect users when trying to access the logging file
