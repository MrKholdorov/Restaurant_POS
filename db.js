// db.js - Safranbonu POS local storage database layer

const DB_PREFIX = "safranbonu_";

// Helper to get from localstorage
function getDB(key, defaultVal = []) {
    const data = localStorage.getItem(DB_PREFIX + key);
    return data ? JSON.parse(data) : defaultVal;
}

// Helper to set in localstorage
function setDB(key, data) {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(data));
}

// Preload mock data if database is empty
function initMockDatabase() {
    if (!localStorage.getItem(DB_PREFIX + "initialized")) {
        console.log("Initializing Safranbonu POS Mock Database...");
        
        // 1. Categories
        setDB("categories", [
            { id: "cat-1", name: "Milliy taomlar" },
            { id: "cat-2", name: "Salatlar" },
            { id: "cat-3", name: "Ichimliklar" },
            { id: "cat-4", name: "Desertlar" }
        ]);

        // 2. Products
        setDB("products", [
            { id: "prod-1", name: "Osh (Choyxona)", price: 45000, categoryId: "cat-1", stock: 150, unit: "pors", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVoxJ_IT8izGZ7uqU5w3Dc8mgivez4Baf3GJb5OhPLbCo4cBrmRgEmSWWH-HuhHiK6v3kUzKMzDNkqFUoqmXRgcvW-G5lGIEMKFgU5qtxRJsEeodptPnhU5lV_LFDMnJHEj-hmcObtASAL67NofzI6shrWZunoHu40RMjFTPfTYexG1SzmxrySqCmrEJXhCVTDrIIXthppAdol8CTMacQEiRLGA4D3VV8SdHMGEseufWQFZJYWFytlaHiT6aDwCMdKyn8On_sZW3Az" },
            { id: "prod-2", name: "Qo'y qovurdoq", price: 65000, categoryId: "cat-1", stock: 60, unit: "pors", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWYEi9xlHMWuK4X0TjlzmvNNa5GScS2ZoAVuC3Q8eQDa115YmAkstr6OHOzoiH9BNHklbOCh7ZiMXzfc_Un-eeEatO66SPT2QivuC-wg2-Qrfr2_a2Y8Wf47nXQ16PMXATOA84ofqfGJAmO9HzxUpr7dbA4T8nGLYSoBDrAG9y-mR6eEVKyd3ruhouuwqelTV23I1xrirc9P4lZQ1zKBtMGCnFZNk7rzifluLWzK9NGo-fgjCrhVMVx0mTNmY6jsyiw-MbruoyJcY6" },
            { id: "prod-3", name: "Manti (Katta)", price: 8000, categoryId: "cat-1", stock: 350, unit: "dona", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=500&auto=format&fit=crop&q=60" },
            { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, categoryId: "cat-2", stock: 120, unit: "pors", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYvp5bUS_uIyZ0VtNnrKXzGmEKKFeQ0FrCkkgg-V1aSSsq358dl7lUyuviM58R-VKQOWtfr7J0bktoTXShgcguY1io6_aTFJA_Dyet01jYf-JsZSePlZX7Wm2WI6MguLsU-vGcrK428MMNfx5phpkZ4CLTHaVAjbENhSTnwDZusP51YwizX9Ij_NwM1aZhT9RUiRaZ6J-nsxaJMH2TZnqQ3O4IBRH5voEpFYOCR7xNpAX-Nu_eEaEuyPmVsECkTVUkJxufSO2dYnUQ" },
            { id: "prod-5", name: "Bahor salati", price: 18000, categoryId: "cat-2", stock: 80, unit: "pors", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60" },
            { id: "prod-6", name: "Ko'k choy", price: 5000, categoryId: "cat-3", stock: 400, unit: "choynak", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60" },
            { id: "prod-7", name: "Coca-Cola 1.5L", price: 15000, categoryId: "cat-3", stock: 180, unit: "dona", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60" },
            { id: "prod-8", name: "Medovik torti", price: 25000, categoryId: "cat-4", stock: 35, unit: "dona", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" }
        ]);

        // 3. Tables
        setDB("tables", [
            // Asosiy Zal
            { id: "T-01", room: "Asosiy zal", status: "Bo'sh", capacity: 4, orderId: null, x: "10%", y: "15%", shape: "circle" },
            { id: "T-02", room: "Asosiy zal", status: "Band", capacity: 6, orderId: "ord-1002", x: "10%", y: "45%", shape: "rect" },
            { id: "T-03", room: "Asosiy zal", status: "Bo'sh", capacity: 4, orderId: null, x: "40%", y: "15%", shape: "circle" },
            { id: "T-04", room: "Asosiy zal", status: "Bo'sh", capacity: 8, orderId: null, x: "40%", y: "45%", shape: "rect" },
            // VIP
            { id: "T-05", room: "VIP", status: "Bo'sh", capacity: 10, orderId: null, x: "20%", y: "20%", shape: "rect" },
            { id: "T-06", room: "VIP", status: "Bo'sh", capacity: 6, orderId: null, x: "60%", y: "20%", shape: "circle" },
            // Ayvon
            { id: "T-07", room: "Ayvon", status: "Bo'sh", capacity: 4, orderId: null, x: "15%", y: "30%", shape: "circle" },
            { id: "T-08", room: "Ayvon", status: "Bo'sh", capacity: 4, orderId: null, x: "50%", y: "30%", shape: "circle" }
        ]);

        // 4. Customers
        setDB("customers", [
            { id: "cust-1", name: "Dilshod Axmedov", phone: "+998 90 123 45 67", points: 450, totalSpent: 1200000, visitCount: 8, lastVisit: "2026-07-01", cardId: "LOYAL-4921" },
            { id: "cust-2", name: "Sardor Rahimov", phone: "+998 93 987 65 43", points: 120, totalSpent: 450000, visitCount: 3, lastVisit: "2026-06-28", cardId: "LOYAL-8821" },
            { id: "cust-3", name: "Nigora Karimova", phone: "+998 94 333 22 11", points: 890, totalSpent: 2300000, visitCount: 15, lastVisit: "2026-07-01", cardId: "LOYAL-0912" },
            { id: "cust-4", name: "Jasur Alimov", phone: "+998 97 777 88 99", points: 0, totalSpent: 0, visitCount: 0, lastVisit: "Hech qachon", cardId: "LOYAL-1111" }
        ]);

        // 5. Employees
        setDB("employees", [
            { id: "emp-1", name: "Ali Valiyev", role: "Admin", pin: "1111", username: "admin", password: "admin123", status: "Faol", hireDate: "2025-01-10", phone: "+998 90 555 11 22", salary: "8,000,000 UZS", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByaqPISn_8kAUw0g1vJpzUYmhQpwCf_y1xwqSBKItTmUjBVou8UEkcUoo4LQhTStYkQV1kUkVoVBAqZ6KUeSxXDyY9ZTRSgqfTKvopLbyAXmdhEm9d-uO8a0S8xlzDCD9u6slmFZw6nRsxuf8Q7sY7SrWu91vbPt_6s9TMd1n8W5zMAQiHVn73DOnrFgPtRyMBhcXHFwFgoPjZ1Rw6Z78madBa1eA5eAwQKacjtRCzfBDxPNiX2N8cHBuqWjM3UY2pDNCgGXIyNA65" },
            { id: "emp-2", name: "Sobir Hasanov", role: "Kassir", pin: "2222", username: "kassir", password: "kassir123", status: "Faol", hireDate: "2025-03-15", phone: "+998 90 555 33 44", salary: "5,000,000 UZS" },
            { id: "emp-3", name: "Malika Odilova", role: "Ofitsiant", pin: "3333", username: "waiter", password: "waiter123", status: "Faol", hireDate: "2025-05-01", phone: "+998 90 555 55 66", salary: "4,000,000 UZS" }
        ]);

        // 6. Expenses
        setDB("expenses", [
            { id: "exp-1", title: "Go'sht sotib olish (Qo'y)", amount: 1200000, category: "Oziq-ovqat", date: "2026-06-28", description: "Bozordan 12 kg yangi qo'y go'shti" },
            { id: "exp-2", title: "Ko'katlar va Sabzavotlar", amount: 450000, category: "Oziq-ovqat", date: "2026-06-29", description: "Sabzi, piyoz, pomidor, bodring" },
            { id: "exp-3", title: "Elektr energiya to'lovi", amount: 1500000, category: "Kommunal", date: "2026-06-30", description: "Iyun oyi uchun elektr energiyasi" }
        ]);

        // 7. System Settings
        setDB("settings", {
            restaurantName: "Safranbonu POS",
            restaurantAddress: "Toshkent sh., Amir Temur shoh ko'chasi, 42-uy",
            restaurantPhone: "+998 71 200 42 42",
            taxRate: 12, // QQS
            serviceCharge: 10,
            currency: "UZS"
        });

        // 8. Orders (Historic and Active)
        const todayStr = new Date().toISOString().split('T')[0];
        const historicOrders = [];
        
        const daysAgo = (n) => {
            const d = new Date();
            d.setDate(d.getDate() - n);
            return d.toISOString().split('T')[0];
        };

        // Create completed orders
        historicOrders.push(
            { id: "ord-101", date: daysAgo(6), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 20 }, { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 15 }], amount: 1125000, status: "Yakunlandi", tableId: "T-01", customerId: "cust-1", paymentMethod: "Naqd" },
            { id: "ord-102", date: daysAgo(6), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 30 }, { id: "prod-7", name: "Coca-Cola 1.5L", price: 15000, qty: 10 }], amount: 2100000, status: "Yakunlandi", tableId: "T-02", customerId: "cust-2", paymentMethod: "Karta" }
        );
        historicOrders.push(
            { id: "ord-103", date: daysAgo(5), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 45 }, { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 35 }], amount: 2550000, status: "Yakunlandi", tableId: "T-03", customerId: null, paymentMethod: "Naqd" },
            { id: "ord-104", date: daysAgo(5), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 15 }], amount: 975000, status: "Yakunlandi", tableId: "T-04", customerId: "cust-3", paymentMethod: "Karta" }
        );
        historicOrders.push(
            { id: "ord-105", date: daysAgo(4), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 38 }, { id: "prod-6", name: "Ko'k choy", price: 5000, qty: 25 }], amount: 1835000, status: "Yakunlandi", tableId: "T-01", customerId: "cust-1", paymentMethod: "Naqd" },
            { id: "ord-106", date: daysAgo(4), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 20 }, { id: "prod-8", name: "Medovik torti", price: 25000, qty: 10 }], amount: 1550000, status: "Yakunlandi", tableId: "T-05", customerId: null, paymentMethod: "Payme" }
        );
        historicOrders.push(
            { id: "ord-107", date: daysAgo(3), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 60 }, { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 45 }], amount: 3375000, status: "Yakunlandi", tableId: "T-02", customerId: "cust-3", paymentMethod: "Click" },
            { id: "ord-108", date: daysAgo(3), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 25 }, { id: "prod-7", name: "Coca-Cola", price: 15000, qty: 20 }], amount: 1925000, status: "Yakunlandi", tableId: "T-03", customerId: null, paymentMethod: "Karta" }
        );
        historicOrders.push(
            { id: "ord-109", date: daysAgo(2), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 70 }], amount: 3150000, status: "Yakunlandi", tableId: "T-04", customerId: null, paymentMethod: "Naqd" },
            { id: "ord-110", date: daysAgo(2), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 45 }], amount: 2925000, status: "Yakunlandi", tableId: "T-06", customerId: "cust-2", paymentMethod: "Click" }
        );
        historicOrders.push(
            { id: "ord-111", date: daysAgo(1), items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 90 }, { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 65 }], amount: 5025000, status: "Yakunlandi", tableId: "T-01", customerId: "cust-3", paymentMethod: "Naqd" },
            { id: "ord-112", date: daysAgo(1), items: [{ id: "prod-2", name: "Qo'y qovurdoq", price: 65000, qty: 55 }], amount: 3575000, status: "Yakunlandi", tableId: "T-05", customerId: null, paymentMethod: "Karta" }
        );
        historicOrders.push(
            { id: "ord-113", date: todayStr, items: [{ id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 40 }, { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 30 }], amount: 2250000, status: "Yakunlandi", tableId: "T-01", customerId: "cust-1", paymentMethod: "Naqd" }
        );

        // One active order on Table T-02
        historicOrders.push(
            {
                id: "ord-1002",
                date: todayStr,
                items: [
                    { id: "prod-1", name: "Osh (Choyxona)", price: 45000, qty: 4 },
                    { id: "prod-4", name: "Achchiq-chuchuk", price: 15000, qty: 3 },
                    { id: "prod-6", name: "Ko'k choy", price: 5000, qty: 2 }
                ],
                amount: 235000,
                status: "Faol",
                tableId: "T-02",
                customerId: "cust-1",
                paymentMethod: null
            }
        );

        setDB("orders", historicOrders);
        localStorage.setItem(DB_PREFIX + "initialized", "true");
    }
}

initMockDatabase();

const db = {
    getProducts: () => getDB("products"),
    saveProduct: (prod) => {
        const prods = getDB("products");
        if (prod.id) {
            const index = prods.findIndex(p => p.id === prod.id);
            if (index !== -1) prods[index] = prod;
        } else {
            prod.id = "prod-" + Date.now();
            prods.push(prod);
        }
        setDB("products", prods);
        return prod;
    },
    deleteProduct: (id) => {
        const prods = getDB("products").filter(p => p.id !== id);
        setDB("products", prods);
    },

    getCategories: () => getDB("categories"),
    saveCategory: (cat) => {
        const cats = getDB("categories");
        if (cat.id) {
            const index = cats.findIndex(c => c.id === cat.id);
            if (index !== -1) cats[index] = cat;
        } else {
            cat.id = "cat-" + Date.now();
            cats.push(cat);
        }
        setDB("categories", cats);
        return cat;
    },

    getTables: () => getDB("tables"),
    updateTableStatus: (tableId, status, orderId = null) => {
        const tables = getDB("tables");
        const idx = tables.findIndex(t => t.id === tableId);
        if (idx !== -1) {
            tables[idx].status = status;
            tables[idx].orderId = orderId;
            setDB("tables", tables);
        }
    },

    getCustomers: () => getDB("customers"),
    saveCustomer: (cust) => {
        const custs = getDB("customers");
        if (cust.id) {
            const index = custs.findIndex(c => c.id === cust.id);
            if (index !== -1) custs[index] = cust;
        } else {
            cust.id = "cust-" + Date.now();
            cust.points = 0;
            cust.totalSpent = 0;
            cust.visitCount = 0;
            cust.lastVisit = new Date().toISOString().split('T')[0];
            cust.cardId = "LOYAL-" + Math.floor(1000 + Math.random() * 9000);
            custs.push(cust);
        }
        setDB("customers", custs);
        return cust;
    },

    getEmployees: () => getDB("employees"),
    saveEmployee: (emp) => {
        const emps = getDB("employees");
        if (emp.id) {
            const index = emps.findIndex(e => e.id === emp.id);
            if (index !== -1) emps[index] = emp;
        } else {
            emp.id = "emp-" + Date.now();
            emp.status = "Faol";
            emp.hireDate = new Date().toISOString().split('T')[0];
            emps.push(emp);
        }
        setDB("employees", emps);
        return emp;
    },
    deleteEmployee: (id) => {
        const emps = getDB("employees").filter(e => e.id !== id);
        setDB("employees", emps);
    },

    getExpenses: () => getDB("expenses"),
    saveExpense: (exp) => {
        const exps = getDB("expenses");
        exp.id = "exp-" + Date.now();
        if (!exp.date) exp.date = new Date().toISOString().split('T')[0];
        exps.push(exp);
        setDB("expenses", exps);
        return exp;
    },
    deleteExpense: (id) => {
        const exps = getDB("expenses").filter(e => e.id !== id);
        setDB("expenses", exps);
    },

    getSettings: () => getDB("settings", {}),
    saveSettings: (settings) => setDB("settings", settings),

    getOrders: () => getDB("orders"),
    saveOrder: (order) => {
        const orders = getDB("orders");
        if (order.id) {
            const index = orders.findIndex(o => o.id === order.id);
            if (index !== -1) orders[index] = order;
        } else {
            order.id = "ord-" + Date.now();
            order.date = new Date().toISOString().split('T')[0];
            orders.push(order);
        }
        setDB("orders", orders);
        return order;
    },
    deleteOrder: (id) => {
        const orders = getDB("orders").filter(o => o.id !== id);
        setDB("orders", orders);
    },
    getActiveOrderForTable: (tableId) => {
        return getDB("orders").find(o => o.tableId === tableId && o.status === "Faol");
    },

    getCurrentSession: () => {
        const sess = localStorage.getItem(DB_PREFIX + "session");
        return sess ? JSON.parse(sess) : null;
    },
    login: (username, password) => {
        const emps = getDB("employees");
        const user = emps.find(e => e.username === username && e.password === password);
        if (user) {
            localStorage.setItem(DB_PREFIX + "session", JSON.stringify(user));
            return user;
        }
        return null;
    },
    logout: () => {
        localStorage.removeItem(DB_PREFIX + "session");
        window.location.href = "login.html";
    },
    checkAuth: () => {
        const user = db.getCurrentSession();
        if (!user && !window.location.pathname.endsWith("login.html")) {
            window.location.href = "login.html";
        }
        return user;
    }
};

window.db = db;
