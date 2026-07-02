// shared.js - Shared UI components and authentication check for Safranbonu POS

document.addEventListener("DOMContentLoaded", () => {
    // 1. Authenticate user
    const isLoginPage = window.location.pathname.endsWith("login.html");
    const user = window.db ? window.db.getCurrentSession() : null;

    if (!user && !isLoginPage) {
        window.location.href = "login.html";
        return;
    }

    // 2. Load sidebar and header if present
    const aside = document.querySelector("aside");
    if (aside && user) {
        renderSidebar(aside, user);
    }

    const header = document.querySelector("header");
    if (header && user) {
        renderHeader(header, user);
    }
});

// Render sidebar
function renderSidebar(aside, user) {
    const path = window.location.pathname;
    
    // Clear and build aside styling
    aside.className = "fixed left-0 top-0 h-full flex flex-col py-lg z-40 overflow-y-auto bg-surface-container-low dark:bg-surface-dim shadow-sm w-64 border-r border-outline-variant/30";
    
    // Calculate today's revenue
    let todayRevenue = 0;
    if (window.db) {
        const todayStr = new Date().toISOString().split('T')[0];
        const todayOrders = window.db.getOrders().filter(o => o.date === todayStr && o.status === "Yakunlandi");
        todayRevenue = todayOrders.reduce((sum, o) => sum + o.amount, 0);
    }

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('uz-UZ').format(val) + " UZS";
    };

    const navItems = [
        { name: "Dashboard", file: "dashboard.html", icon: "dashboard" },
        { name: "POS Sotuv", file: "pos.html", icon: "point_of_sale" },
        { name: "Ombor", file: "warehouse.html", icon: "warehouse" },
        { name: "Mijozlar", file: "customers.html", icon: "group" },
        { name: "Hisobotlar", file: "reports.html", icon: "analytics" },
        { name: "Xodimlar", file: "employees.html", icon: "badge" },
        { name: "Xarajatlar", file: "expenses.html", icon: "payments" },
        { name: "Sozlamalar", file: "settings.html", icon: "settings" }
    ];

    let navHtml = `
    <div class="px-md mb-xl flex flex-col gap-xs">
        <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Safranbonu</h1>
        <p class="font-label-lg text-label-lg text-on-surface-variant/70 uppercase tracking-widest">Premium POS</p>
    </div>
    <nav class="flex flex-col gap-1 px-sm">
    `;

    navItems.forEach(item => {
        // Simple match: does path contain filename? Or default to index.html
        const isActive = path.endsWith(item.file) || (item.file === "index.html" && (path.endsWith("/") || path.endsWith("/index.html")));
        
        const activeClass = "flex items-center gap-md bg-primary-container text-on-primary-container rounded-lg px-md py-sm transition-all duration-200 active:scale-[0.98]";
        const inactiveClass = "flex items-center gap-md text-on-surface-variant hover:text-on-surface hover:bg-surface-variant dark:hover:bg-surface-container-highest px-md py-sm rounded-lg transition-colors";
        const iconStyle = isActive ? "font-variation-settings: 'FILL' 1;" : "";

        navHtml += `
        <a class="${isActive ? activeClass : inactiveClass}" href="${item.file}">
            <span class="material-symbols-outlined" style="${iconStyle}">${item.icon}</span>
            <span class="font-label-lg text-label-lg">${item.name}</span>
        </a>
        `;
    });

    navHtml += `
    </nav>
    <div class="mt-auto px-md pt-lg">
        <div class="p-md rounded-xl bg-primary-fixed/30 border border-primary-container/20">
            <p class="font-label-md text-label-md text-on-primary-fixed-variant mb-xs">Bugungi tushum</p>
            <p class="font-title-lg text-title-lg font-bold text-primary" id="sidebar-revenue">${formatCurrency(todayRevenue)}</p>
            <div class="w-full bg-surface-container-highest h-1.5 rounded-full mt-sm overflow-hidden">
                <div class="bg-primary-container h-full rounded-full" style="width: ${Math.min(100, (todayRevenue / 15000000) * 100)}%"></div>
            </div>
        </div>
    </div>
    `;

    aside.innerHTML = navHtml;
}

// Render header
function renderHeader(header, user) {
    header.className = "sticky top-0 z-50 flex justify-between items-center px-xl h-20 w-full backdrop-blur-md border-b border-surface-variant dark:border-outline-variant bg-glass-bg dark:bg-surface-bright/70";
    
    // Check active path for label
    const path = window.location.pathname;
    let pageTitle = "Safranbonu POS";
    if (path.endsWith("pos.html")) pageTitle = "POS Sotuv Oynasi";
    else if (path.endsWith("warehouse.html")) pageTitle = "Ombor Nazorati";
    else if (path.endsWith("customers.html")) pageTitle = "Mijozlar Bazasi";
    else if (path.endsWith("reports.html")) pageTitle = "Tahlil & Hisobotlar";
    else if (path.endsWith("employees.html")) pageTitle = "Xodimlar Boshqaruvi";
    else if (path.endsWith("expenses.html")) pageTitle = "Xarajatlar Tizimi";
    else if (path.endsWith("settings.html")) pageTitle = "Tizim Sozlamalari";

    // User Headshot (fallback if not exist)
    const userImg = user.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuByaqPISn_8kAUw0g1vJpzUYmhQpwCf_y1xwqSBKItTmUjBVou8UEkcUoo4LQhTStYkQV1kUkVoVBAqZ6KUeSxXDyY9ZTRSgqfTKvopLbyAXmdhEm9d-uO8a0S8xlzDCD9u6slmFZw6nRsxuf8Q7sY7SrWu91vbPt_6s9TMd1n8W5zMAQiHVn73DOnrFgPtRyMBhcXHFwFgoPjZ1Rw6Z78madBa1eA5eAwQKacjtRCzfBDxPNiX2N8cHBuqWjM3UY2pDNCgGXIyNA65";

    header.innerHTML = `
    <div class="flex items-center gap-xl">
        <h2 class="font-headline-sm text-headline-sm font-black text-primary">${pageTitle}</h2>
    </div>
    <div class="flex items-center gap-md">
        <div class="relative group hidden lg:block">
            <span class="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
            <input class="pl-xl pr-md py-sm bg-surface-container-high rounded-full border-none focus:ring-2 focus:ring-primary-container w-64 transition-all" placeholder="Qidiruv..." type="text">
        </div>
        <div class="flex items-center gap-xs">
            <button id="theme-toggle" class="p-sm hover:bg-surface-container-high/50 rounded-full transition-all text-on-surface-variant active:opacity-80">
                <span class="material-symbols-outlined" id="theme-icon">dark_mode</span>
            </button>
            <button class="p-sm hover:bg-surface-container-high/50 rounded-full transition-all text-on-surface-variant active:opacity-80 relative">
                <span class="material-symbols-outlined">notifications</span>
                <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
            </button>
        </div>
        <div class="flex items-center gap-sm ml-sm pl-md border-l border-outline-variant/30 relative group cursor-pointer">
            <div class="text-right hidden sm:block">
                <p class="font-title-md text-title-md font-bold leading-none">${user.name}</p>
                <p class="font-label-md text-label-md text-on-surface-variant">${user.role}</p>
            </div>
            <img class="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="${userImg}" alt="Avatar">
            
            <!-- Profile Dropdown Menu on Hover/Click -->
            <div class="absolute right-0 top-12 w-48 bg-white dark:bg-surface-dim border border-outline-variant/30 rounded-xl shadow-lg py-sm hidden group-hover:block hover:block z-50">
                <div class="px-md py-xs border-b border-outline-variant/10 mb-xs">
                    <p class="font-label-md text-label-md font-bold">${user.name}</p>
                    <p class="font-label-md text-[10px] text-on-surface-variant">${user.role}</p>
                </div>
                <a href="settings.html" class="flex items-center gap-sm px-md py-sm hover:bg-surface-variant transition-colors text-body-md">
                    <span class="material-symbols-outlined text-[18px]">settings</span> Sozlamalar
                </a>
                <button onclick="window.db.logout()" class="w-full text-left flex items-center gap-sm px-md py-sm hover:bg-error-container hover:text-on-error-container transition-colors text-body-md text-error">
                    <span class="material-symbols-outlined text-[18px]">logout</span> Chiqish
                </button>
            </div>
        </div>
    </div>
    `;

    // Hook theme toggle
    const themeBtn = header.querySelector("#theme-toggle");
    const themeIcon = header.querySelector("#theme-icon");
    
    // Sync theme
    const syncThemeIcon = () => {
        if (document.documentElement.classList.contains("dark")) {
            themeIcon.innerText = "light_mode";
        } else {
            themeIcon.innerText = "dark_mode";
        }
    };
    
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }
    syncThemeIcon();

    themeBtn.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        syncThemeIcon();
    });
}
function initNavigation() {
    const navLinks = document.querySelectorAll('aside a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            loadPage(target);
        });
    });
}

function loadPage(page) {
    // Perform a full navigation to the target page
    window.location.href = page;
}

// Initialize navigation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    // Load default page if none specified
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        loadPage('dashboard.html');
    }
});
