# SNK Business Website + Admin Dashboard

Public site + `/admin/login` + `/admin/dashboard`. Firebase diye login ar save hoy. GitHub Pages-e host hoy (snkbp.com ba username.github.io).

## Folder
```
index.html                     public website
assets/firebase-config.js      <-- ekhane Firebase config boshate hobe (ekbar)
assets/site.css, core.js       site design + content structure
assets/admin.css, firebase.js  admin style + Firebase connection
admin/login/index.html         login page      -> /admin/login/
admin/dashboard/index.html     dashboard       -> /admin/dashboard/
admin/index.html               /admin -> login e pathay
firestore.rules                Firestore security rules (copy-paste)
```

## Setup (ekbar)

### 1. Firebase project
1. https://console.firebase.google.com -> Add project.
2. Build -> Firestore Database -> Create database (Production mode).
3. Build -> Authentication -> Get started -> Email/Password -> Enable.
4. Authentication -> Users -> Add user. Apnar admin email + password din. Eitai admin login.
5. Authentication -> Settings -> Authorized domains -> `snkbp.com` (ar username.github.io) add korun.

### 2. Config boshano
1. Project settings (gear) -> Your apps -> Web (`</>`) -> app register korun.
2. `firebaseConfig` copy korun.
3. `assets/firebase-config.js` file e YOUR_... gulor jaygay boshan.

### 3. Security rules
1. Firestore -> Rules tab.
2. `firestore.rules` file er shob copy kore paste korun.
3. `ADMIN_EMAIL_HERE` (2 jaygay) er jaygay admin email din. Publish.

### 4. GitHub e upload
1. Repo kholun -> Add file -> Upload files.
2. Folder-er bhitorer shob file ar folder (index.html, assets, admin) drag kore din. Zip nije upload korben na, age extract korun.
3. Commit changes. `CNAME` file thakle delete korben na.
4. Settings -> Pages -> Branch `main` / root -> Save.
5. 1-2 minute por site live.

## Use
- Login: `https://snkbp.com/admin/login/`
- Login holei dashboard khule.
- Bam pashe section, majhe edit form, dan pashe live preview.
- Edit kore **Save** (ba Ctrl+S) chapun. Sathe sathe sobai notun content dekhe.
- Logo/banner/photo upload: image field-e file select korun, tarpor Save.
- Password bhule gele login page-e "Password bhule gechhen?" chapun.

## Jene rakhun
- File local theke double-click kore khulle Firebase kaj korbe na. Hosted site (GitHub Pages) theke kholun.
- Config na boshale site default content dekhabe, login hobe na.
- Form submit WhatsApp/email-e jay. Dashboard -> Consultation & Form e number/email din.
- Brochure button `brochure.pdf` file-er link. Oi naame PDF upload korun, ba Hero section e link bodlan.
