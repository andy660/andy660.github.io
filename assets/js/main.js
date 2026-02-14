(() => {
  // ======================
  // Theme switch
  // ======================
  const body = document.body;
  const lamp = document.getElementById("mode");
  
  if (!lamp) return;

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.removeAttribute("data-theme");
      if (!savedTheme) {
        localStorage.setItem("theme", "light");
      }
    }
  };

  lamp.addEventListener("click", toggleTheme);
  initTheme();

  // ======================
  // Menu blur effect
  // ======================
  const cbox = document.getElementById("menu-trigger");
  const wrapper = document.querySelector(".wrapper");

  if (cbox && wrapper) {
    cbox.addEventListener("change", function () {
      if (this.checked) {
        wrapper.classList.add("blurry");
      } else {
        wrapper.classList.remove("blurry");
      }
    });
  }

  // ======================
  // Optional: Follow system theme
  // ======================
  if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e) => {
      if (e.matches) {
        body.setAttribute("data-theme", "dark");
      } else {
        body.removeAttribute("data-theme");
      }
    };
    
    prefersDark.addListener(handleSystemThemeChange);
    handleSystemThemeChange(prefersDark);
  }
})();