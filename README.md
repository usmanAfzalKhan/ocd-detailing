# OCD Detailing

A sleek, responsive single-page React application for OCD Detailing — a premium mobile auto-detailing service. Showcase services, special offers, detailed service pages, an interactive gallery, and enable customers to request quotes and submit reviews seamlessly.

## 🚀 Live Demo

[https://ocddetailing.netlify.app/](https://ocddetailing.netlify.app/)

## 🎯 Features

* **Hero Slider**: Engaging full-screen carousel highlighting key services, powered by `src/data/slides.js` and `Hero.jsx`.
* **Services Catalogue**: List of detail packages sourced from `src/data/services.js`, with individual service detail pages (`ServiceDetailPage.jsx`).
* **Special Offers**: Interactive offers row with expandable cards (`OffersRow.jsx`) and smooth scroll behavior.
* **Gallery & Videos**: Before/after image comparisons and video showcases via `Gallery.jsx` and `src/data/galleryImages.js`.
* **FAQ Section**: Collapsible FAQ accordion driven by `Faq.jsx` and content from `src/data/faq.js`.
* **Reviews Section**: Display existing customer reviews and submit new ones through a modal form (`ReviewForm.jsx`), with data storage in Firebase.
* **Contact Form**: Quote request form with date picker, service and vehicle inputs, and form validation in `ContactForm.jsx`.
* **Smooth Navigation**: Automatic scroll-to-top on route change (`ScrollToTop.jsx`).
* **Responsive Design**: Mobile-first layout optimized for all devices.
* **Accessibility**: ARIA labels, keyboard support, and focus management for interactive elements.

## 🛠 Tech Stack

* **React** (v18+) — Component-based UI library
* **React Router DOM** — Client-side routing
* **CSS Modules** — Scoped styling per component
* **Firebase** (Firestore) — Backend for storing reviews and contact submissions
* **Netlify** — Deployment and hosting

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ocd-detailing.git
   cd ocd-detailing
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

## ▶️ Usage

* **Start Development Server**

  ```bash
  npm start
  # or
  yarn start
  ```

* **Build for Production**

  ```bash
  npm run build
  # or
  yarn build
  ```

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add YourFeature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request describing your changes.

Please follow the existing code style and include tests where applicable.

## 📄 License

MIT © OCD Detailing
