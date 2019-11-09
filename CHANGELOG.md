# Spotlight Changelog
All notable changes to Spotlight will be documented here.

## Version 1.2.6 (2019-10-28)

### Added
 - Added logo to splash screen (SPOT-84)
 - Added list of actions when confirming password (SPOT-133)
 - Added fallback page for users that don't have JavaScript enabled (SPOT-146)
 - Added timeout on student check-in to reduce server load (SPOT-147)

### Fixed
 - Fixed a bug where new staff weren't given a title attribute (SPOT-112)

### Security
 - Require password confirmation when creating staff accounts (SPOT-109)
 - Delete auth tokens when cancelling password change (SPOT-107)
 - Delete auth tokens when enforcing password changes (SPOT-111)

## Version 1.2.5 (2019-10-23)

### Added
 - Added ability to hide sidebar menu (SPOT-144)

### Changed
 - Decrease bundle size by 93% (SPOT-128)

### Fixed
 - Fixed the search functionality in tables (SPOT-138)

## Version 1.2.4 (2019-10-16)

### Fixed
 - Fixed the Table search feature (SPOT-138)

## Version 1.2.3 (2019-10-15)

### Added
 - Added the ability to automatically submit entered student numbers (SPOT-136)

### Changed
 - Limit the number of appointments that can be booked per student per block (SPOT-118)
 - Change the timing for notification checking (SPOT-132)

### Security
 - Changed authentication token expiry (SPOT 85)

## Version 1.2.2 (2019-10-10)

### Added
 - Created the Credentials Manager for administrators (SPOT-126)
 - Added enumerated filter type to tables (SPOT-125)

### Changed
 - Changed bundle name so that new updates are instantly downloaded (SPOT-115)

### Fixed
 - Fixed a bug in Firefox and Safari which caused student number fetching to fail (SPOT-129)

## Version 1.2.1 (2019-10-07)

### Added
 - Added ability to remember usernames when logging in (SPOT-83)
 - Added list that shows unsuccessful check-ins (SPOT-23)
 - Added student number accumulation to check-in form in order to expedite check-ins (SPOT-23)

### Changed
 - Change permissions for staff creating other staff accounts (SPOT-113)
 - Changed how failed authentication is handled (SPOT-83)
 - Changed the loading screen (SPOT-83)

### Fixed
 - Fixed bug that caused Calendar dialog to crash in browser (SPOT-114)

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
