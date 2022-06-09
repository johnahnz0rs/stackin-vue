
===================================================================================

2022-04-07, Thurs

* MAJOR COMPONENTS
  * REASONS
  * WINS
  * PROGRAM (used to create recurring wins)

* CRUD INTERFACES
  * CREATE
    * *************************************** reasons -- /my-account
    * *************************************** program -- /my-account
    * wins -- n/a
  * READ
    * reasons -- /dashboard, /my-account
    * *************************************** program -- BTS/dashboard, /my-account
    * wins -- /dashboard[, /journal]
  * UPDATE
    * reasons -- /my-account
    * program -- /my-account
    * wins -- /dashboard
  * DELETE
    * reasons -- /my-account
    * program -- /my-account
    * wins -- n/a

















































===================================================================================

PLANNING - 2022-03-16


LAYOUT
- /dash
  - component - reasons
  - component - program
- /my-account
  - component - crud program
  - component - crud reasons
- /performance-review
  - date picker (week selector)
  - summary
  - analysis
- /login
- /register
- /faq
- /contact(?) - maybe in v2



=================

1. define features
2. derive the data we need/vuex
  - state, getters, actions, mutations
3. derive the design - components/layout
  - 

FEATURES
- WINS TRACKER
  - list all the user's daily wins (we call this their program)
  - check yes/no: i stacked this win.
  - add a note to the win
  - edit your program
- REMINDERS DISPLAY
  - display all reminders 


DATA
- list of WINS

===================================================================================



