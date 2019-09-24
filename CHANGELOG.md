# Spotlight Changelog
All notable changes to Spotlight will be documented here.


## Version 1.1.1 (2019-09-24)

### Added
 - Staff can book themselves as Unavilable when creating new Topics (SPOT-2)

### Fixed
 - Staff can view which students are booked into their block (SPOT-91)
 - Fixed stability issues (SPOT-88)

### Security
 - Added ability to force user password changes (SPOT-68)

## Version 1.1.0 (2019-09-23)

### Added
 - Created the Power Scheduler (SPOT-28)
 - Error messaging for failed sign-ins (SPOT-10)
 - Staff and students are able to change their password (SPOT-30, SPOT-21)
 - Added school name to login page (SPOT-73, SPOT-80)
 - Students able to schedule themselves for flex blocks (SPOT-13)
 - Staff able to set classroom capacity (SPOT-66)
 - Added schedule Amendments (SPOT-60, SPOT-75)
 - Added Grade 8 to the list of student grades (SPOT-72)
 - Added site favicon (SPOT-79)

### Changes
 - Removed student numbers from API responses to increate user privacy (SPOT-74)
 - Refactored the TopNav component (SPOT-50)
 - Redirect students to profile when visiting unauthorized routes (SPOT-70)

### Fixes
 - Staff can set Topics on calendar blocks (SPOT-32)
 - Students are able to sign out (SPOT-20)
 - Newly created Topics are shown only once (SPOT-33)
 - Fixed splash images loading on login page (SPOT-39)
 - Fixed various service outages (SPOT-58)
 - Individual students can be added (SPOT-78)

### Security
 - Remove auth tokens on sign out (SPOT-8)
