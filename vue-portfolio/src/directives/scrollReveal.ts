export default {
    mounted(el: HTMLElement) {
        // Classe initiale (invisible)
        el.classList.add("before-reveal");

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.classList.add("animate-reveal");
                        el.classList.remove("before-reveal");
                        observer.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.15, // 15% visible = déclenchement
            }
        );

        observer.observe(el);
    }
};
