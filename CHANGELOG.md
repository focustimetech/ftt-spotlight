# Spotlight Changelog
All notable changes to Spotlight will be documented here.

## Version 1.2.0 (2019-09-30)

### Added
 - Staff and students have colored avatars (SPOT-46)
 - Created the Check-in page (SPOT-63)
    - Selectable date
    - Roll call check-in (SPOT-22)
    - Quickly view who's been checked in
 - Added global schedule amendments, e.g. No Focus, Non-Instructional (SPOT-95)
 - Added amendments to the Power Scheduler (SPOT-61)
 - Staff able to add additional staff (SPOT-82)

### Changes
 - Changed Staff, Student and Power Scheduler table columns (SPOT-98)
 - Changed the behavior of pop-up notifications which got out of hand (SPOT-64)
 - Changed the home screen to the new Check-in page, rather than the Students table (SPOT-102)

### Fixed
 - Fixed Staff table search crashing in-browser (SPOT-57)
 - Fixed bug where Amend button was visible to students (but not usable) (SPOT-96)
 - Fixed permission denied to staff creating students (SPOT-97)

### Security
 - Flagged staff and students that are still using their default password (SPOT-89)

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
