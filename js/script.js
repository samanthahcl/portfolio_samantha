document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const header = document.querySelector('header');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Função para mostrar uma seção e esconder as outras
    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Rola suavemente para a seção
            const headerHeight = header ? header.offsetHeight : 0;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20; // 20px de margem extra

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    // Função para atualizar a classe 'active' nos links de navegação
    function updateActiveNavLink(currentId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentId) {
                link.classList.add('active');
            }
        });
    }

    // Adiciona evento de clique a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            updateActiveNavLink(targetId);
        });
    });

    // Modo Escuro
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
    });

    // Verifica a preferência do usuário ao carregar a página
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Modo Claro';
    } else {
        darkModeToggle.textContent = 'Modo Escuro';
    }


    // Opcional: Atualizar a seção ativa ao rolar a página (para navegação ativa)
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header ? header.offsetHeight : 0;

        contentSections.forEach(section => {
            // Calcula a posição do topo da seção em relação ao topo da viewport
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.clientHeight;

            // Se o scroll estiver dentro da seção (considerando o header)
            if (pageYOffset >= (sectionTop - headerHeight - 30) && pageYOffset < (sectionTop + sectionHeight - headerHeight - 30)) {
                current = '#' + section.getAttribute('id');
            }
        });

        // Atualiza apenas se a seção atual for diferente da última ativa
        if (current && document.querySelector(`[href="${current}"]`) && !document.querySelector(`[href="${current}"]`).classList.contains('active')) {
            updateActiveNavLink(current);
        }
    });

    // Define a seção inicial para ser "Sobre Mim" ao carregar a página
    // e atualiza o link ativo.
    const initialSectionId = window.location.hash || '#about';
    showSection(initialSectionId);
    updateActiveNavLink(initialSectionId);
});