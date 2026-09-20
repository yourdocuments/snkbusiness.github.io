/* =========================================================
   SNK BUSINESS
   Premium Single Page Website
   script.js
========================================================= */


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const contactForm = document.getElementById("contactForm");
const yearElement = document.getElementById("year");


/* =========================================================
   02. CURRENT YEAR
========================================================= */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   03. STICKY HEADER
========================================================= */

function handleHeaderScroll() {

  if (!header) return;

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}

window.addEventListener(
  "scroll",
  handleHeaderScroll,
  { passive: true }
);

handleHeaderScroll();


/* =========================================================
   04. MOBILE MENU
========================================================= */

if (menuToggle && mobileNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      mobileNav.classList.toggle("show");

    menuToggle.classList.toggle(
      "active",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  /* Close mobile menu after clicking a link */

  const mobileLinks =
    mobileNav.querySelectorAll("a");

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("show");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", event => {

    const clickedInsideMenu =
      mobileNav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedToggle &&
      mobileNav.classList.contains("show")
    ) {

      mobileNav.classList.remove("show");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}


/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll("main section[id]");

const desktopLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


function updateActiveNavigation() {

  let currentSection = "";

  const scrollPosition =
    window.scrollY + 180;


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop;

    const sectionHeight =
      section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition <
        sectionTop + sectionHeight
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  desktopLinks.forEach(link => {

    link.classList.remove("active");

    const href =
      link.getAttribute("href");

    if (
      href === `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

updateActiveNavigation();


/* =========================================================
   06. SMOOTH SCROLL
========================================================= */

const allAnchorLinks =
  document.querySelectorAll(
    'a[href^="#"]'
  );


allAnchorLinks.forEach(link => {

  link.addEventListener("click", event => {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    const headerHeight =
      header
        ? header.offsetHeight
        : 0;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;


    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  });

});


/* =========================================================
   07. SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    `
    .section-heading,
    .about-main,
    .about-point,
    .service-card,
    .why-content,
    .why-item,
    .stat,
    .contact-content,
    .contact-form
    `
  );


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(25px)";

  element.style.transition =
    "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

});


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target.style.opacity = "1";

        entry.target.style.transform =
          "translateY(0)";


        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.12,

      rootMargin:
        "0px 0px -50px 0px"
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   08. STAGGER SERVICE CARDS
========================================================= */

const serviceCards =
  document.querySelectorAll(
    ".service-card"
  );


serviceCards.forEach(
  (card, index) => {

    card.style.transitionDelay =
      `${index * 80}ms`;

  }
);


/* =========================================================
   09. STAGGER WHY ITEMS
========================================================= */

const whyItems =
  document.querySelectorAll(
    ".why-item"
  );


whyItems.forEach(
  (item, index) => {

    item.style.transitionDelay =
      `${index * 90}ms`;

  }
);


/* =========================================================
   10. CONTACT FORM
========================================================= */

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "name"
        )?.value.trim();


      const email =
        document.getElementById(
          "email"
        )?.value.trim();


      const subject =
        document.getElementById(
          "subject"
        )?.value.trim();


      const message =
        document.getElementById(
          "message"
        )?.value.trim();


      if (
        !name ||
        !email ||
        !message
      ) {

        showFormMessage(
          "Please fill in the required fields.",
          "error"
        );

        return;

      }


      /*
       * Temporary frontend form.
       *
       * Later we can connect this form
       * with:
       *
       * 1. Formspree
       * 2. EmailJS
       * 3. Firebase
       * 4. Custom backend
       */


      const mailSubject =
        encodeURIComponent(
          subject ||
          "New Message from SNK Business Website"
        );


      const mailBody =
        encodeURIComponent(
`Name: ${name}

Email: ${email}

Message:
${message}`
        );


      /*
       * Change this email later
       * to your real SNK Business email.
       */

      const emailAddress =
        "hello@snkbusiness.com";


      const mailtoURL =
        `mailto:${emailAddress}` +
        `?subject=${mailSubject}` +
        `&body=${mailBody}`;


      showFormMessage(
        "Opening your email application...",
        "success"
      );


      setTimeout(() => {

        window.location.href =
          mailtoURL;

      }, 500);

    }
  );

}


/* =========================================================
   11. FORM MESSAGE
========================================================= */

function showFormMessage(
  message,
  type = "success"
) {

  let messageBox =
    document.querySelector(
      ".form-message"
    );


  if (!messageBox) {

    messageBox =
      document.createElement("div");

    messageBox.className =
      "form-message";

    if (contactForm) {

      contactForm.appendChild(
        messageBox
      );

    }

  }


  messageBox.textContent =
    message;


  messageBox.className =
    `form-message ${type}`;


  messageBox.style.marginTop =
    "15px";

  messageBox.style.padding =
    "12px 15px";

  messageBox.style.borderRadius =
    "10px";

  messageBox.style.fontSize =
    "12px";

  messageBox.style.fontWeight =
    "600";


  if (type === "error") {

    messageBox.style.background =
      "#fff0f0";

    messageBox.style.color =
      "#b42318";

  } else {

    messageBox.style.background =
      "rgba(184, 214, 43, 0.15)";

    messageBox.style.color =
      "#203707";

  }

}


/* =========================================================
   12. HERO PARALLAX
========================================================= */

const heroVisual =
  document.querySelector(
    ".hero-visual"
  );


if (
  heroVisual &&
  window.matchMedia(
    "(min-width: 801px)"
  ).matches
) {

  window.addEventListener(
    "mousemove",
    event => {

      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 10;


      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 10;


      heroVisual.style.transform =
        `translate(${x * 0.35}px, ${y * 0.35}px)`;

    },
    { passive: true }
  );


  document.addEventListener(
    "mouseleave",
    () => {

      heroVisual.style.transform =
        "translate(0, 0)";

    }
  );

}


/* =========================================================
   13. RESIZE HANDLER
========================================================= */

window.addEventListener(
  "resize",
  () => {

    /*
     * Close mobile menu if
     * user switches back to desktop.
     */

    if (
      window.innerWidth > 800 &&
      mobileNav &&
      menuToggle
    ) {

      mobileNav.classList.remove(
        "show"
      );

      menuToggle.classList.remove(
        "active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* =========================================================
   14. PREVENT EMPTY LINK JUMP
========================================================= */

document
  .querySelectorAll('a[href="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();

      }
    );

  });


/* =========================================================
   15. INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (menuToggle) {

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    updateActiveNavigation();

  }
);


/* =========================================================
   END — SNK BUSINESS JAVASCRIPT
========================================================= */
