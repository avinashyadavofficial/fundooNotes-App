#  FundooNotes Application

FundooNotes is a **Google Keep-inspired note-taking web application** built using **Angular** with a modular and component-based architecture.

This project showcases:
- Full-featured CRUD operations
- Responsive UI with Material Design
- Dialog-based note editing
- Auto-expanding input fields
- Modular service and component structure
- Real-world best practices with Angular Standalone Components

---

##  Tech Stack

- **Frontend:** Angular (v16+)
- **Styling:** Angular Material + SCSS/CSS
- **Architecture:** Standalone Components, Reactive Forms, Services
- **Backend:** Connected to REST API (custom/mock)

---

## Features Implemented

### Notes Functionality
- Create, edit, delete notes
- Auto-expanding textarea (like Google Keep)
- Archive and Trash sections
- Pinning and unpinning of notes
- Color-coded notes
- Image upload integration
- Reminder and collaborator support (mocked)

### UI/UX
- Responsive layout (grid/list toggle)
- Google Keep-style note cards with icons
- Editable popup using Angular Material `MatDialog`
- Click-outside-to-close dialogs
- Properly styled icons using Material Symbols

### Application Architecture
- Built using Angular **Standalone Components**
- Modular folder structure:
  - `components/`: All UI components
  - `services/`: Note, auth, view, refresh services
  - `pages/`: Auth pages, dashboard views
- Reusable `NoteIconsComponent` for common actions
- Centralized refresh mechanism using `noteRefreshService`

---

## Current Functional Demos

-  **Note CRUD with instant UI refresh**
-  **Dialog popup for editing notes**
-  **Click-to-edit title/description**
-  **Auto-resizing textarea on input**
-  **Archived and trashed note sections**
-  **Color changes reflected instantly**

---

##  How to Run Locally

```bash
https://github.com/avinashyadavofficial/fundooNotes-App
cd fundooNotes
npm install
ng serve
```

Navigate to `http://localhost:4200` in your browser.

---

## What I Learned

- Deep understanding of Angular Standalone Components
- Material UI integration and dynamic dialogs
- Building refreshable and reactive UIs
- Handling component communication via services
- Auto-resizing input UX techniques

---

## Possible Future Enhancements

- Firebase or Node.js backend integration
- Real-time collaboration using WebSockets
- Reminder notifications
- JWT-based user auth with token refresh

---

## Author

**Avinash Yadav**  
A passionate Angular developer focusing on performance, clean architecture, and user-centric UI.

---

## License

This project is for educational and demonstration purposes only.
