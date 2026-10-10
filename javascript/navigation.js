// Header Elements
const logoCheckpoint = document.querySelector(".logo-checkpoint");
const infoCheckpoint = document.querySelector(".info-checkpoint");
const coursesCheckpoint = document.querySelector(".courses-checkpoint");
const pathwaysCheckpoint = document.querySelector(".pathways-checkpoint");
const contactCheckpoint = document.querySelector(".contact-checkpoint");

const heroSection = document.querySelector("#hero");
const aboutSection = document.querySelector("#about");
const coursesSection = document.querySelector("#courses");
const pathwaysSection = document.querySelector("#pathways");
const contactSection = document.querySelector("#contact");

const main = document.querySelector("main");
const contactButton = document.querySelector(".contact");

// SECTION DATA
const scrollSections = [
  heroSection,
  aboutSection,
  coursesSection,
  pathwaysSection,
  contactSection,
];

const sections = [
  { section: heroSection, checkpoint: logoCheckpoint },
  { section: aboutSection, checkpoint: infoCheckpoint },
  { section: coursesSection, checkpoint: coursesCheckpoint },
  { section: pathwaysSection, checkpoint: pathwaysCheckpoint },
  { section: contactSection, checkpoint: contactCheckpoint },
];

// CURRENT SECTION
let currentSection = 0;
let isScrolling = false;

// SCROLL TO SECTION
function goToSection(index) {
  currentSection = index;
  isScrolling = true;

  scrollSections[currentSection].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// CHECKPOINT CLICKS
logoCheckpoint.addEventListener("click", () => {
  goToSection(0);
});

infoCheckpoint.addEventListener("click", () => {
  goToSection(1);
});

coursesCheckpoint.addEventListener("click", () => {
  goToSection(2);
});

pathwaysCheckpoint.addEventListener("click", () => {
  goToSection(3);
});

contactButton.addEventListener("click", () => {
  goToSection(4);
});

// MOUSE WHEEL - ONE SECTION AT A TIME
main.addEventListener("wheel", (event) => {
  // Ignore tiny wheel movements
  if (Math.abs(event.deltaY) < 10) {
    return;
  }

  // Don't allow another scroll while moving
  if (isScrolling) {
    event.preventDefault();
    return;
  }

  event.preventDefault();

  if (event.deltaY > 0) {
    // Scroll DOWN
    if (currentSection < scrollSections.length - 1) {
      goToSection(currentSection + 1);
    }
  } else {
    // Scroll UP
    if (currentSection > 0) {
      goToSection(currentSection - 1);
    }
  }
});

// ACTIVE CHECKPOINT
function updateActiveCheckpoint() {
  const mainTop = main.getBoundingClientRect().top;

  let currentIndex = 0;
  let smallestDistance = Infinity;

  sections.forEach(({ section }, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    const distance = Math.abs(sectionTop - mainTop);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      currentIndex = index;
    }
  });

  // Reset checkpoint states
  document.querySelectorAll(".checkpoint").forEach((checkpoint) => {
    checkpoint.classList.remove("active");
    checkpoint.classList.remove("passed");
  });

  // Mark previous checkpoints as passed
  sections.forEach(({ checkpoint }, index) => {
    if (index < currentIndex) {
      checkpoint.classList.add("passed");
    }
  });

  // Mark current checkpoint as active
  sections[currentIndex].checkpoint.classList.add("active");
}

main.addEventListener("scroll", updateActiveCheckpoint);

// PROGRESS LINE
const progressFill = document.querySelector(".progress-fill");

function updateScrollProgress() {
  const isMobile = document.body.classList.contains("is-mobile");

  const sectionProgress = isMobile
    ? {
        hero: 0,
        about: 0.302,
        courses: 0.48,
        pathways: 0.65,
        contact: 1,
      }
    : {
        hero: 0,
        about: 0.26,
        courses: 0.495,
        pathways: 0.728,
        contact: 1,
      };

  let progress = 0;

  const mainTop = main.getBoundingClientRect().top;

  let closestSection = null;
  let smallestDistance = Infinity;

  sections.forEach(({ section }) => {
    const sectionTop = section.getBoundingClientRect().top;
    const distance = Math.abs(sectionTop - mainTop);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection === heroSection) {
    progress = sectionProgress.hero;
  }

  if (closestSection === aboutSection) {
    progress = sectionProgress.about;
  }

  if (closestSection === coursesSection) {
    progress = sectionProgress.courses;
  }

  if (closestSection === pathwaysSection) {
    progress = sectionProgress.pathways;
  }

  if (closestSection === contactSection) {
    progress = sectionProgress.contact;
  }

  progressFill.style.transform = `scaleX(${progress})`;
}

main.addEventListener("scroll", updateScrollProgress);

// INITIAL STATE
window.addEventListener("load", () => {
  updateActiveCheckpoint();
  updateScrollProgress();
});
