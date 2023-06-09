function updateContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const k = element.getAttribute("data-i18n");
      element.innerHTML = i18next.t(k);
    }
  }
  
  async function i18Loader() {
    const langs = ["en", "cs"];
    const jsons = await Promise.all(
      langs.map((l) => fetch("src/i18/" + l + ".json").then((r) => r.json()))
    );
    const res = langs.reduce((acc, l, idx) => {
      acc[l] = { translation: jsons[idx] };
      return acc;
    }, {});
    await i18next.init({
      lng: "en",
      debug: true,
      resources: res
    });
    updateContent();
    i18next.on("languageChanged", () => {
      updateContent();
    });
    const langSelector = document.getElementById("langSelector");
    langSelector.removeAttribute("disabled");
    langSelector.addEventListener("change", (e) => {
      i18next.changeLanguage(e.target.value);
    });
  }
  
  i18Loader();