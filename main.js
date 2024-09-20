const animate_elements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

for (let i = 0; i < animate_elements.length; i++) {
  const el = animate_elements[i];

  observer.observe(el);
}
