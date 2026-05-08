import { useState, useRef } from "react";

const LOGO_BASE64 = "data:image/png;base64,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";


// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  DE: {
    tagline: "Feel Good Soul Food",
    venue: "Pödeldorfer Straße 174 · 96050 Bamberg",
    tags: ["Biozertifiziert", "Regional & Saisonal", "Soul Food"],
    flatrateTitle: "Flatrate",
    flatrateText: "Wasser, Tee & Filterkaffee — so oft nachfüllen wie Sie möchten",
    all: "Alle",
    popular: "BELIEBT",
    onRequest: "Preis auf Anfrage",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 Gästemenü",
    managerTab: "⚙️ Manager",
    pinTitle: "Manager-Bereich",
    pinSub: "Bitte PIN eingeben um fortzufahren",
    pinBtn: "Einloggen",
    pinDemo: "Demo-PIN: 1234",
    pinError: "Falsche PIN",
    live: "Menü live",
    dashSub: "MenuQR · Manager Dashboard",
    scans: "Scans heute",
    scansSub: "+12 vs. gestern",
    activeItems: "Aktive Gerichte",
    of: "von",
    total: "gesamt",
    lastUpdate: "Zuletzt aktualisiert",
    lastUpdateSub: "von Ihnen",
    dwell: "Ø Verweildauer",
    dwellSub: "min auf Menü",
    manage: "SPEISEKARTE VERWALTEN",
    addBtn: "+ Gericht hinzufügen",
    qrBtn: "📥 QR-Code",
    previewBtn: "👁 Vorschau",
    publishBtn: "🚀 Veröffentlichen",
    newItem: "Neues Gericht",
    editItem: "Gericht bearbeiten",
    emoji: "EMOJI",
    category: "KATEGORIE",
    itemName: "NAME",
    itemDesc: "BESCHREIBUNG",
    itemPrice: "PREIS (€) — 0 für 'Preis auf Anfrage'",
    allergens: "ALLERGENE (kommagetrennt)",
    popularCheck: 'Als "Beliebt" markieren ★',
    cancel: "Abbrechen",
    save: "Speichern",
    toastQr: "QR-Code als PDF heruntergeladen",
    toastPreview: "Vorschau geöffnet",
    toastPublish: "✓ Menü veröffentlicht!",
    toastAdded: "hinzugefügt ✓",
    toastUpdated: "aktualisiert ✓",
    toastDeleted: "gelöscht",
    toastHidden: "Gericht versteckt",
    toastActive: "Gericht aktiviert ✓",
    noItems: "Keine Gerichte in dieser Kategorie.",
    infoTitle: "Kontakt & Öffnungszeiten",
    address: "Adresse",
    phone: "Telefon",
    hours: "Öffnungszeiten",
    closed: "Geschlossen",
    days: ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],
    dayHours: ["Geschlossen","Geschlossen","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
  EN: {
    tagline: "Feel Good Soul Food",
    venue: "Pödeldorfer Straße 174 · 96050 Bamberg",
    tags: ["Organic Certified", "Regional & Seasonal", "Soul Food"],
    flatrateTitle: "Flatrate",
    flatrateText: "Water, tea & filter coffee — refill as often as you like",
    all: "All",
    popular: "POPULAR",
    onRequest: "Price on request",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 Guest Menu",
    managerTab: "⚙️ Manager",
    pinTitle: "Manager Area",
    pinSub: "Please enter PIN to continue",
    pinBtn: "Log in",
    pinDemo: "Demo PIN: 1234",
    pinError: "Wrong PIN",
    live: "Menu live",
    dashSub: "MenuQR · Manager Dashboard",
    scans: "Scans today",
    scansSub: "+12 vs. yesterday",
    activeItems: "Active dishes",
    of: "of",
    total: "total",
    lastUpdate: "Last updated",
    lastUpdateSub: "by you",
    dwell: "Avg. time on menu",
    dwellSub: "min",
    manage: "MANAGE MENU",
    addBtn: "+ Add dish",
    qrBtn: "📥 QR Code",
    previewBtn: "👁 Preview",
    publishBtn: "🚀 Publish",
    newItem: "New dish",
    editItem: "Edit dish",
    emoji: "EMOJI",
    category: "CATEGORY",
    itemName: "NAME",
    itemDesc: "DESCRIPTION",
    itemPrice: "PRICE (€) — 0 for 'Price on request'",
    allergens: "ALLERGENS (comma separated)",
    popularCheck: 'Mark as "Popular" ★',
    cancel: "Cancel",
    save: "Save",
    toastQr: "QR code downloaded as PDF",
    toastPreview: "Preview opened",
    toastPublish: "✓ Menu published!",
    toastAdded: "added ✓",
    toastUpdated: "updated ✓",
    toastDeleted: "deleted",
    toastHidden: "Dish hidden",
    toastActive: "Dish activated ✓",
    noItems: "No dishes in this category.",
    infoTitle: "Contact & Opening Hours",
    address: "Address",
    phone: "Phone",
    hours: "Opening Hours",
    closed: "Closed",
    days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    dayHours: ["Closed","Closed","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
  ES: {
    tagline: "Feel Good Soul Food",
    venue: "Pödeldorfer Straße 174 · 96050 Bamberg",
    tags: ["Certificado Ecológico", "Regional y de Temporada", "Soul Food"],
    flatrateTitle: "Tarifa plana",
    flatrateText: "Agua, té y café de filtro — recarga cuantas veces quieras",
    all: "Todo",
    popular: "POPULAR",
    onRequest: "Precio a consultar",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 Menú",
    managerTab: "⚙️ Manager",
    pinTitle: "Área de Manager",
    pinSub: "Por favor introduce el PIN para continuar",
    pinBtn: "Iniciar sesión",
    pinDemo: "PIN demo: 1234",
    pinError: "PIN incorrecto",
    live: "Menú en vivo",
    dashSub: "MenuQR · Panel de Manager",
    scans: "Escaneos hoy",
    scansSub: "+12 vs. ayer",
    activeItems: "Platos activos",
    of: "de",
    total: "total",
    lastUpdate: "Última actualización",
    lastUpdateSub: "por ti",
    dwell: "Tiempo medio en menú",
    dwellSub: "min",
    manage: "GESTIONAR MENÚ",
    addBtn: "+ Añadir plato",
    qrBtn: "📥 Código QR",
    previewBtn: "👁 Vista previa",
    publishBtn: "🚀 Publicar",
    newItem: "Nuevo plato",
    editItem: "Editar plato",
    emoji: "EMOJI",
    category: "CATEGORÍA",
    itemName: "NOMBRE",
    itemDesc: "DESCRIPCIÓN",
    itemPrice: "PRECIO (€) — 0 para 'Precio a consultar'",
    allergens: "ALÉRGENOS (separados por coma)",
    popularCheck: 'Marcar como "Popular" ★',
    cancel: "Cancelar",
    save: "Guardar",
    toastQr: "Código QR descargado en PDF",
    toastPreview: "Vista previa abierta",
    toastPublish: "✓ ¡Menú publicado!",
    toastAdded: "añadido ✓",
    toastUpdated: "actualizado ✓",
    toastDeleted: "eliminado",
    toastHidden: "Plato ocultado",
    toastActive: "Plato activado ✓",
    noItems: "No hay platos en esta categoría.",
    infoTitle: "Contacto y Horario",
    address: "Dirección",
    phone: "Teléfono",
    hours: "Horario de apertura",
    closed: "Cerrado",
    days: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    dayHours: ["Cerrado","Cerrado","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
  TR: {
    tagline: "Feel Good Soul Food",
    venue: "Pödeldorfer Str. 174 · 96050 Bamberg",
    tags: ["Organik Sertifikalı", "Yerel & Mevsimsel", "Soul Food"],
    flatrateTitle: "Sınırsız",
    flatrateText: "Su, çay ve filtre kahve — istediğiniz kadar doldurun",
    all: "Tümü",
    popular: "POPÜLER",
    onRequest: "Fiyat için sorunuz",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 Menü",
    managerTab: "⚙️ Yönetici",
    pinTitle: "Yönetici Alanı",
    pinSub: "Devam etmek için PIN girin",
    pinBtn: "Giriş Yap",
    pinDemo: "Demo PIN: 1234",
    pinError: "Yanlış PIN",
    live: "Menü yayında",
    dashSub: "MenuQR · Yönetici Paneli",
    scans: "Bugünkü taramalar",
    scansSub: "Dünden +12 fazla",
    activeItems: "Aktif yemekler",
    of: "/",
    total: "toplam",
    lastUpdate: "Son güncelleme",
    lastUpdateSub: "sizin tarafınızdan",
    dwell: "Ort. menüde kalma",
    dwellSub: "dk",
    manage: "MENÜYÜ YÖNET",
    addBtn: "+ Yemek ekle",
    qrBtn: "📥 QR Kod",
    previewBtn: "👁 Önizleme",
    publishBtn: "🚀 Yayınla",
    newItem: "Yeni yemek",
    editItem: "Yemeği düzenle",
    emoji: "EMOJİ",
    category: "KATEGORİ",
    itemName: "AD",
    itemDesc: "AÇIKLAMA",
    itemPrice: "FİYAT (€) — 0 = fiyat sorunuz",
    allergens: "ALERJENLER (virgülle ayırın)",
    popularCheck: '"Popüler" olarak işaretle ★',
    cancel: "İptal",
    save: "Kaydet",
    toastQr: "QR kod PDF olarak indirildi",
    toastPreview: "Önizleme açıldı",
    toastPublish: "✓ Menü yayınlandı!",
    toastAdded: "eklendi ✓",
    toastUpdated: "güncellendi ✓",
    toastDeleted: "silindi",
    toastHidden: "Yemek gizlendi",
    toastActive: "Yemek aktifleştirildi ✓",
    noItems: "Bu kategoride yemek yok.",
    infoTitle: "İletişim & Çalışma Saatleri",
    address: "Adres",
    phone: "Telefon",
    hours: "Çalışma Saatleri",
    closed: "Kapalı",
    days: ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],
    dayHours: ["Kapalı","Kapalı","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
  FR: {
    tagline: "Feel Good Soul Food",
    venue: "Pödeldorfer Str. 174 · 96050 Bamberg",
    tags: ["Certifié Bio", "Local & Saisonnier", "Soul Food"],
    flatrateTitle: "Forfait boissons",
    flatrateText: "Eau, thé & café filtre — resservez-vous autant que vous voulez",
    all: "Tout",
    popular: "POPULAIRE",
    onRequest: "Prix sur demande",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 Menu",
    managerTab: "⚙️ Manager",
    pinTitle: "Espace Manager",
    pinSub: "Veuillez entrer votre PIN pour continuer",
    pinBtn: "Se connecter",
    pinDemo: "PIN démo : 1234",
    pinError: "PIN incorrect",
    live: "Menu en ligne",
    dashSub: "MenuQR · Tableau de bord",
    scans: "Scans aujourd'hui",
    scansSub: "+12 vs. hier",
    activeItems: "Plats actifs",
    of: "sur",
    total: "total",
    lastUpdate: "Dernière mise à jour",
    lastUpdateSub: "par vous",
    dwell: "Temps moyen sur le menu",
    dwellSub: "min",
    manage: "GÉRER LE MENU",
    addBtn: "+ Ajouter un plat",
    qrBtn: "📥 QR Code",
    previewBtn: "👁 Aperçu",
    publishBtn: "🚀 Publier",
    newItem: "Nouveau plat",
    editItem: "Modifier le plat",
    emoji: "EMOJI",
    category: "CATÉGORIE",
    itemName: "NOM",
    itemDesc: "DESCRIPTION",
    itemPrice: "PRIX (€) — 0 = prix sur demande",
    allergens: "ALLERGÈNES (séparés par des virgules)",
    popularCheck: 'Marquer comme "Populaire" ★',
    cancel: "Annuler",
    save: "Enregistrer",
    toastQr: "QR code téléchargé en PDF",
    toastPreview: "Aperçu ouvert",
    toastPublish: "✓ Menu publié !",
    toastAdded: "ajouté ✓",
    toastUpdated: "mis à jour ✓",
    toastDeleted: "supprimé",
    toastHidden: "Plat masqué",
    toastActive: "Plat activé ✓",
    noItems: "Aucun plat dans cette catégorie.",
    infoTitle: "Contact & Horaires",
    address: "Adresse",
    phone: "Téléphone",
    hours: "Horaires d'ouverture",
    closed: "Fermé",
    days: ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],
    dayHours: ["Fermé","Fermé","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
  AR: {
    tagline: "طعام روح المزاج الجيد",
    venue: "شارع بودلدورفر 174 · 96050 بامبرغ",
    tags: ["معتمد عضوي", "محلي وموسمي", "Soul Food"],
    flatrateTitle: "اشتراك مشروبات",
    flatrateText: "ماء، شاي وقهوة — أعد الملء كما تشاء",
    all: "الكل",
    popular: "الأكثر طلباً",
    onRequest: "السعر عند الطلب",
    poweredBy: "Powered by MenuQR · menuqr.de",
    menuTab: "🍽 القائمة",
    managerTab: "⚙️ المدير",
    pinTitle: "منطقة المدير",
    pinSub: "الرجاء إدخال رمز PIN للمتابعة",
    pinBtn: "تسجيل الدخول",
    pinDemo: "رمز تجريبي: 1234",
    pinError: "رمز PIN خاطئ",
    live: "القائمة مباشرة",
    dashSub: "MenuQR · لوحة التحكم",
    scans: "المسح اليوم",
    scansSub: "+12 مقارنة بالأمس",
    activeItems: "الأطباق النشطة",
    of: "من",
    total: "المجموع",
    lastUpdate: "آخر تحديث",
    lastUpdateSub: "بواسطتك",
    dwell: "متوسط الوقت في القائمة",
    dwellSub: "دقيقة",
    manage: "إدارة القائمة",
    addBtn: "+ إضافة طبق",
    qrBtn: "📥 رمز QR",
    previewBtn: "👁 معاينة",
    publishBtn: "🚀 نشر",
    newItem: "طبق جديد",
    editItem: "تعديل الطبق",
    emoji: "إيموجي",
    category: "الفئة",
    itemName: "الاسم",
    itemDesc: "الوصف",
    itemPrice: "السعر (€) — 0 = عند الطلب",
    allergens: "مسببات الحساسية (مفصولة بفاصلة)",
    popularCheck: 'وضع علامة "شائع" ★',
    cancel: "إلغاء",
    save: "حفظ",
    toastQr: "تم تنزيل رمز QR كـ PDF",
    toastPreview: "تم فتح المعاينة",
    toastPublish: "✓ تم نشر القائمة!",
    toastAdded: "تمت الإضافة ✓",
    toastUpdated: "تم التحديث ✓",
    toastDeleted: "تم الحذف",
    toastHidden: "الطبق مخفي",
    toastActive: "الطبق نشط ✓",
    noItems: "لا توجد أطباق في هذه الفئة.",
    infoTitle: "التواصل وأوقات العمل",
    address: "العنوان",
    phone: "الهاتف",
    hours: "أوقات العمل",
    closed: "مغلق",
    days: ["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"],
    dayHours: ["مغلق","مغلق","06:30–22:00","06:30–22:00","06:30–22:00","07:00–22:00","07:00–22:00"],
    dayClosed: [true,true,false,false,false,false,false],
  },
};

// ─── MENU DATA ────────────────────────────────────────────────────────────────
const MENU_ITEMS = {
  DE: [
    { id:1,  emoji:"🫘", name:"Chana Masala", desc:"Gemüsecurry, Kichererbsen, Kartoffel, Tomate, Zwiebel, Koriander, Basmatireis", cat:"haupt", price:"14.80", allergens:["Vegan","Glutenfrei"], popular:false, active:true },
    { id:2,  emoji:"🥨", name:"Brezenknödel", desc:"Mit Spinat, Parmesan, Orangenöl, Pilzrahmragout", cat:"haupt", price:"14.90", allergens:["Gluten","Laktose"], popular:false, active:true },
    { id:3,  emoji:"🍝", name:"Pasta Basta Gnocchi", desc:"Salbeibutter, getrocknete Tomate, Melanzane, Auberginen-Paprika Creme, Rucola, Parmesan", cat:"haupt", price:"15.70", allergens:["Gluten","Laktose"], popular:true, active:true },
    { id:4,  emoji:"🎃", name:"Herbstspezial", desc:"Karamellisierter Ziegenkäse, Feldsalat, Ofenkürbis, Süßkartoffelspalten, Quittenchutney, Walnüsse, Feigen-Dattelessig", cat:"haupt", price:"16.90", allergens:["Laktose","Nüsse"], popular:true, active:true },
    { id:5,  emoji:"🐟", name:"Lachs Nord", desc:"Hausgemachter Beizlachs, Zitrone, Wacholder, Steinofenbrot, Gurke, Apfel, Himbeer-Zwiebel, Wasabischmand", cat:"haupt", price:"17.90", allergens:["Gluten","Fisch"], popular:true, active:true },
    { id:6,  emoji:"🦌", name:"Wildthing Köttbullar", desc:"Wildbällchen, Kartoffelstampf, Preiselbeeren, Bratenjus", cat:"haupt", price:"16.80", allergens:["Gluten","Laktose"], popular:false, active:true },
    { id:7,  emoji:"🦐", name:"Bouillabaisse", desc:"Sauce Safranrouille, Skreifilet, Lachsforelle, Miesmuscheln, Shrimps, Steinofenbaguette", cat:"haupt", price:"14.90", allergens:["Gluten","Fisch","Meeresfrüchte"], popular:false, active:true },
    { id:8,  emoji:"🌍", name:"Empfehlung der Küche", desc:"Ländertypisches Hauptgericht von unseren Mitarbeiter:innen — täglich wechselnd", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
    { id:9,  emoji:"🎃", name:"Kürbis-Ingwer-Kokossuppe", desc:"Basilikum-Limettenespuma, Saunagarten Brunnenkresse", cat:"bio", price:"8.90", allergens:["Vegan","Glutenfrei"], popular:false, active:true },
    { id:10, emoji:"🐟", name:"Wildlachsquiche", desc:"Mit Spinat, Rote Bete Carpaccio, Feldsalat, Walnüsse, Orangen-Senfvinaigrette", cat:"bio", price:"17.80", allergens:["Gluten","Fisch","Nüsse"], popular:true, active:true },
    { id:11, emoji:"🍗", name:"Bio-Hähnchengeschnetzeltes", desc:"Egerlinge, Kartoffelrösti, Grünzeug der Saison, Orangen-Senfvinaigrette", cat:"bio", price:"24.90", allergens:["Glutenfrei","Laktose"], popular:false, active:true },
    { id:12, emoji:"🍋", name:"Limoncello-Mascarpone Creme", desc:"Kakao-Mandelcrumble, Zitronengel, Waldbeerragout", cat:"bio", price:"7.60", allergens:["Laktose","Nüsse"], popular:true, active:true },
    { id:13, emoji:"🌟", name:"Bio-Drei Gang Menü", desc:"Suppe oder Vorspeise, Hauptgang, Dessert — dazu 0,1l Jarasole Bio-Frizzante Prosecco", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
    { id:14, emoji:"🥗", name:"Huhn & Kartoffelsalat", desc:"Frischer Salat mit Hühnchen und Kartoffeln", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
    { id:15, emoji:"🥑", name:"Avocado & Parmesan", desc:"Frischer Salat mit Avocado und Parmesan", cat:"salat", price:"16.90", allergens:["Laktose"], popular:true, active:true },
    { id:16, emoji:"🌿", name:"Grünzeug der Saison", desc:"Saisonaler Blattsalat, täglich frisch", cat:"salat", price:"9.90", allergens:["Vegan"], popular:false, active:true },
    { id:17, emoji:"🥬", name:"Beilagensalat", desc:"Kleiner gemischter Salat als Beilage", cat:"salat", price:"4.90", allergens:["Vegan"], popular:false, active:true },
    { id:18, emoji:"🍟", name:"Pommes Frites", desc:"Mit Bio-Kräutersalz", cat:"snack", price:"4.50", allergens:["Vegan"], popular:false, active:true },
    { id:19, emoji:"🍟", name:"Pommes Trüffel", desc:"Trüffelsalz & Trüffelmayo", cat:"snack", price:"6.60", allergens:["Laktose"], popular:true, active:true },
    { id:20, emoji:"🌭", name:"Currywurst Herta Heuwer", desc:"Klassische Currywurst mit Baguette", cat:"snack", price:"7.70", allergens:["Gluten"], popular:true, active:true },
    { id:21, emoji:"🌭", name:"Wiener oder Weißwürste", desc:"Paar Würste mit Brezel", cat:"snack", price:"6.90", allergens:["Gluten"], popular:false, active:true },
    { id:22, emoji:"🍔", name:"Bambados Burger", desc:"Hausgemachter Burger", cat:"snack", price:"8.80", allergens:["Gluten","Laktose"], popular:true, active:true },
    { id:23, emoji:"🌯", name:"Ve.gö.ner", desc:"Veganer Döner (vegan möglich)", cat:"snack", price:"9.90", allergens:["Gluten"], popular:false, active:true },
    { id:24, emoji:"🌱", name:"Endori Currywurst", desc:"Vegane Currywurst", cat:"snack", price:"7.90", allergens:["Vegan","Gluten"], popular:false, active:true },
    { id:25, emoji:"🍔", name:"Kulturburger", desc:"Vegetarischer Burger", cat:"snack", price:"9.90", allergens:["Gluten","Laktose"], popular:false, active:true },
    { id:26, emoji:"🥪", name:"Panini & Beilagensalat", desc:"Vegan möglich", cat:"snack", price:"7.70", allergens:["Gluten"], popular:false, active:true },
    { id:27, emoji:"🌯", name:"Falafelwrap", desc:"Frischer Wrap mit Falafel", cat:"snack", price:"9.90", allergens:["Vegan","Gluten"], popular:true, active:true },
    { id:28, emoji:"🧆", name:"Börek", desc:"Mit Spinat und Feta", cat:"snack", price:"6.90", allergens:["Gluten","Laktose"], popular:false, active:true },
    { id:29, emoji:"🍎", name:"Apfelstrudel", desc:"Mit Vanilleeis oder Walnusseis, Sahne", cat:"dessert", price:"7.90", allergens:["Gluten","Laktose","Nüsse"], popular:true, active:true },
    { id:30, emoji:"🍰", name:"Kuchenauswahl", desc:"Täglich wechselnd — fragen Sie nach der heutigen Auswahl", cat:"dessert", price:"4.20", allergens:["Gluten","Laktose"], popular:false, active:true },
    { id:31, emoji:"💧", name:"Wasser & Heißgetränke Flatrate", desc:"Trinkwasser (still/sprudel), Tee und Filterkaffee — einmal bezahlen, so oft nachfüllen wie Sie möchten", cat:"drink", price:"0", allergens:["Vegan"], popular:true, active:true },
    { id:32, emoji:"🌿", name:"Bio-Rhabarberschorle", desc:"0,33l", cat:"drink", price:"3.60", allergens:["Vegan"], popular:false, active:true },
    { id:33, emoji:"🍺", name:"Bio-Lammsbräu Pils alkoholfrei", desc:"0,33l", cat:"drink", price:"4.90", allergens:["Gluten"], popular:false, active:true },
    { id:34, emoji:"🍵", name:"Bio-Minztee", desc:"Mit frischer Gartenminze, 0,4l", cat:"drink", price:"2.50", allergens:["Vegan"], popular:false, active:true },
    { id:35, emoji:"🥛", name:"Andechser Bio-Kefir", desc:"0,5l", cat:"drink", price:"4.90", allergens:["Laktose"], popular:false, active:true },
    { id:36, emoji:"🥂", name:"Jarasole Bio-Frizzante Prosecco", desc:"Italien, 0,2l", cat:"drink", price:"6.80", allergens:["Vegan"], popular:false, active:true },
    { id:37, emoji:"🍺", name:"Bamberger Biere", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier alkoholfrei, Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["Gluten"], popular:true, active:true },
    { id:38, emoji:"🍷", name:"Weine", desc:"Silvaner, Bacchus und Rosé vom Weingut zur Schwane · Blackprint Rotwein vom Winzer Markus Schneider", cat:"drink", price:"0", allergens:[], popular:false, active:true },

    // KAFFEE & HEISSGETRÄNKE
    { id:50, emoji:"☕", name:"Espresso", desc:"Einzeln oder doppelt", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
    { id:51, emoji:"☕", name:"Cappuccino", desc:"Mit Vollmilch oder Hafermilch", cat:"kaffee", price:"3.20", allergens:["Laktose"], popular:true, active:true },
    { id:52, emoji:"☕", name:"Café Latte", desc:"Mit Vollmilch oder Hafermilch", cat:"kaffee", price:"3.80", allergens:["Laktose"], popular:false, active:true },
    { id:53, emoji:"☕", name:"Americano", desc:"Espresso mit heißem Wasser", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
    { id:54, emoji:"🍵", name:"Tee Auswahl", desc:"Verschiedene Sorten — fragen Sie nach der aktuellen Auswahl", cat:"kaffee", price:"2.80", allergens:["Vegan"], popular:false, active:true },
    { id:55, emoji:"🫗", name:"Heiße Schokolade", desc:"Mit Vollmilch oder Hafermilch", cat:"kaffee", price:"3.50", allergens:["Laktose"], popular:false, active:true },
    { id:56, emoji:"💧", name:"Wasser & Filterkaffee Flatrate", desc:"Trinkwasser (still/sprudel) & Filterkaffee — einmal bezahlen, so oft nachfüllen wie Sie möchten", cat:"kaffee", price:"0", allergens:["Vegan"], popular:true, active:true },
  ],
  EN: [
    { id:1,  emoji:"🫘", name:"Chana Masala", desc:"Vegetable curry, chickpeas, potato, tomato, onion, coriander, basmati rice", cat:"haupt", price:"14.80", allergens:["Vegan","Gluten-free"], popular:false, active:true },
    { id:2,  emoji:"🥨", name:"Pretzel Dumpling", desc:"With spinach, parmesan, orange oil, mushroom cream ragout", cat:"haupt", price:"14.90", allergens:["Gluten","Dairy"], popular:false, active:true },
    { id:3,  emoji:"🍝", name:"Pasta Basta Gnocchi", desc:"Sage butter, dried tomato, aubergine, aubergine-pepper cream, rocket, parmesan", cat:"haupt", price:"15.70", allergens:["Gluten","Dairy"], popular:true, active:true },
    { id:4,  emoji:"🎃", name:"Autumn Special", desc:"Caramelised goat's cheese, lamb's lettuce, roasted pumpkin, sweet potato wedges, quince chutney, walnuts, fig-date vinegar", cat:"haupt", price:"16.90", allergens:["Dairy","Nuts"], popular:true, active:true },
    { id:5,  emoji:"🐟", name:"Salmon Nord", desc:"Home-cured salmon, lemon, juniper, Scandinavian stone-oven bread, cucumber, apple, raspberry-onion, wasabi cream", cat:"haupt", price:"17.90", allergens:["Gluten","Fish"], popular:true, active:true },
    { id:6,  emoji:"🦌", name:"Wildthing Köttbullar", desc:"Wild meatballs, mashed potato, lingonberries, roast gravy", cat:"haupt", price:"16.80", allergens:["Gluten","Dairy"], popular:false, active:true },
    { id:7,  emoji:"🦐", name:"Bouillabaisse", desc:"Saffron rouille sauce, cod fillet, rainbow trout, mussels, shrimps, stone-oven baguette", cat:"haupt", price:"14.90", allergens:["Gluten","Fish","Shellfish"], popular:false, active:true },
    { id:8,  emoji:"🌍", name:"Chef's Recommendation", desc:"A dish from our team's home country — changes daily", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
    { id:9,  emoji:"🎃", name:"Pumpkin Ginger Coconut Soup", desc:"Basil-lime espuma, sauna garden watercress", cat:"bio", price:"8.90", allergens:["Vegan","Gluten-free"], popular:false, active:true },
    { id:10, emoji:"🐟", name:"Wild Salmon Quiche", desc:"With spinach, beetroot carpaccio, lamb's lettuce, walnuts, orange-mustard vinaigrette", cat:"bio", price:"17.80", allergens:["Gluten","Fish","Nuts"], popular:true, active:true },
    { id:11, emoji:"🍗", name:"Organic Chicken Strips", desc:"Button mushrooms, potato rösti, seasonal greens, orange-mustard vinaigrette", cat:"bio", price:"24.90", allergens:["Gluten-free","Dairy"], popular:false, active:true },
    { id:12, emoji:"🍋", name:"Limoncello Mascarpone Cream", desc:"Cocoa-almond crumble, lemon gel, forest berry ragout", cat:"bio", price:"7.60", allergens:["Dairy","Nuts"], popular:true, active:true },
    { id:13, emoji:"🌟", name:"Organic 3-Course Menu", desc:"Soup or starter, main course, dessert of your choice — plus 0.1l Jarasole Bio-Frizzante Prosecco", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
    { id:14, emoji:"🥗", name:"Chicken & Potato Salad", desc:"Fresh salad with chicken and potatoes", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
    { id:15, emoji:"🥑", name:"Avocado & Parmesan Salad", desc:"Fresh salad with avocado and parmesan", cat:"salat", price:"16.90", allergens:["Dairy"], popular:true, active:true },
    { id:16, emoji:"🌿", name:"Seasonal Greens", desc:"Seasonal leaf salad, freshly prepared daily", cat:"salat", price:"9.90", allergens:["Vegan"], popular:false, active:true },
    { id:17, emoji:"🥬", name:"Side Salad", desc:"Small mixed salad as a side dish", cat:"salat", price:"4.90", allergens:["Vegan"], popular:false, active:true },
    { id:18, emoji:"🍟", name:"French Fries", desc:"With organic herb salt", cat:"snack", price:"4.50", allergens:["Vegan"], popular:false, active:true },
    { id:19, emoji:"🍟", name:"Truffle Fries", desc:"Truffle salt & truffle mayo", cat:"snack", price:"6.60", allergens:["Dairy"], popular:true, active:true },
    { id:20, emoji:"🌭", name:"Currywurst Herta Heuwer", desc:"Classic currywurst with baguette", cat:"snack", price:"7.70", allergens:["Gluten"], popular:true, active:true },
    { id:21, emoji:"🌭", name:"Wiener or White Sausages", desc:"Pair of sausages with pretzel", cat:"snack", price:"6.90", allergens:["Gluten"], popular:false, active:true },
    { id:22, emoji:"🍔", name:"Bambados Burger", desc:"Homemade burger", cat:"snack", price:"8.80", allergens:["Gluten","Dairy"], popular:true, active:true },
    { id:23, emoji:"🌯", name:"Ve.gö.ner", desc:"Vegan döner (can be vegan)", cat:"snack", price:"9.90", allergens:["Gluten"], popular:false, active:true },
    { id:24, emoji:"🌱", name:"Endori Currywurst", desc:"Vegan currywurst", cat:"snack", price:"7.90", allergens:["Vegan","Gluten"], popular:false, active:true },
    { id:25, emoji:"🍔", name:"Culture Burger", desc:"Vegetarian burger", cat:"snack", price:"9.90", allergens:["Gluten","Dairy"], popular:false, active:true },
    { id:26, emoji:"🥪", name:"Panini & Side Salad", desc:"Can be vegan", cat:"snack", price:"7.70", allergens:["Gluten"], popular:false, active:true },
    { id:27, emoji:"🌯", name:"Falafel Wrap", desc:"Fresh wrap with falafel", cat:"snack", price:"9.90", allergens:["Vegan","Gluten"], popular:true, active:true },
    { id:28, emoji:"🧆", name:"Börek", desc:"With spinach and feta", cat:"snack", price:"6.90", allergens:["Gluten","Dairy"], popular:false, active:true },
    { id:29, emoji:"🍎", name:"Apple Strudel", desc:"With vanilla or walnut ice cream, cream", cat:"dessert", price:"7.90", allergens:["Gluten","Dairy","Nuts"], popular:true, active:true },
    { id:30, emoji:"🍰", name:"Cake Selection", desc:"Changes daily — please ask for today's selection", cat:"dessert", price:"4.20", allergens:["Gluten","Dairy"], popular:false, active:true },
    { id:31, emoji:"💧", name:"Water & Hot Drinks Flatrate", desc:"Still/sparkling water, tea & filter coffee — pay once, refill as often as you like", cat:"drink", price:"0", allergens:["Vegan"], popular:true, active:true },
    { id:32, emoji:"🌿", name:"Organic Rhubarb Spritzer", desc:"0.33l", cat:"drink", price:"3.60", allergens:["Vegan"], popular:false, active:true },
    { id:33, emoji:"🍺", name:"Organic Lammsbräu Pils (alcohol-free)", desc:"0.33l", cat:"drink", price:"4.90", allergens:["Gluten"], popular:false, active:true },
    { id:34, emoji:"🍵", name:"Organic Mint Tea", desc:"With fresh garden mint, 0.4l", cat:"drink", price:"2.50", allergens:["Vegan"], popular:false, active:true },
    { id:35, emoji:"🥛", name:"Andechser Organic Kefir", desc:"0.5l", cat:"drink", price:"4.90", allergens:["Dairy"], popular:false, active:true },
    { id:36, emoji:"🥂", name:"Jarasole Bio-Frizzante Prosecco", desc:"Italy, 0.2l", cat:"drink", price:"6.80", allergens:["Vegan"], popular:false, active:true },
    { id:37, emoji:"🍺", name:"Bamberg Beers", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier (alcohol-free), Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["Gluten"], popular:true, active:true },
    { id:38, emoji:"🍷", name:"Wines", desc:"Silvaner, Bacchus and Rosé from Weingut zur Schwane · Blackprint Red Wine from Markus Schneider", cat:"drink", price:"0", allergens:[], popular:false, active:true },

    // COFFEE & HOT DRINKS
    { id:50, emoji:"☕", name:"Espresso", desc:"Single or double", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
    { id:51, emoji:"☕", name:"Cappuccino", desc:"With whole milk or oat milk", cat:"kaffee", price:"3.20", allergens:["Dairy"], popular:true, active:true },
    { id:52, emoji:"☕", name:"Café Latte", desc:"With whole milk or oat milk", cat:"kaffee", price:"3.80", allergens:["Dairy"], popular:false, active:true },
    { id:53, emoji:"☕", name:"Americano", desc:"Espresso with hot water", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
    { id:54, emoji:"🍵", name:"Tea Selection", desc:"Various types — ask for today's selection", cat:"kaffee", price:"2.80", allergens:["Vegan"], popular:false, active:true },
    { id:55, emoji:"🫗", name:"Hot Chocolate", desc:"With whole milk or oat milk", cat:"kaffee", price:"3.50", allergens:["Dairy"], popular:false, active:true },
    { id:56, emoji:"💧", name:"Water & Filter Coffee Flatrate", desc:"Still/sparkling water & filter coffee — pay once, refill as often as you like", cat:"kaffee", price:"0", allergens:["Vegan"], popular:true, active:true },
  ],
  ES: [
    { id:1,  emoji:"🫘", name:"Chana Masala", desc:"Curry de verduras, garbanzos, patata, tomate, cebolla, cilantro, arroz basmati", cat:"haupt", price:"14.80", allergens:["Vegano","Sin Gluten"], popular:false, active:true },
    { id:2,  emoji:"🥨", name:"Knödel de Pretzel", desc:"Con espinacas, parmesano, aceite de naranja, ragú de setas a la crema", cat:"haupt", price:"14.90", allergens:["Gluten","Lácteos"], popular:false, active:true },
    { id:3,  emoji:"🍝", name:"Pasta Basta Gnocchi", desc:"Mantequilla de salvia, tomate seco, berenjena, crema de berenjena-pimiento, rúcula, parmesano", cat:"haupt", price:"15.70", allergens:["Gluten","Lácteos"], popular:true, active:true },
    { id:4,  emoji:"🎃", name:"Especial de Otoño", desc:"Queso de cabra caramelizado, canónigos, calabaza al horno, boniato, chutney de membrillo, nueces, vinagre de higo-dátil", cat:"haupt", price:"16.90", allergens:["Lácteos","Frutos Secos"], popular:true, active:true },
    { id:5,  emoji:"🐟", name:"Salmón Nord", desc:"Salmón marinado casero, limón, enebro, pan de piedra escandinavo, pepino, manzana, cebolla-frambuesa, crema wasabi", cat:"haupt", price:"17.90", allergens:["Gluten","Pescado"], popular:true, active:true },
    { id:6,  emoji:"🦌", name:"Wildthing Köttbullar", desc:"Albóndigas de caza, puré de patata, arándanos rojos, jugo de asado", cat:"haupt", price:"16.80", allergens:["Gluten","Lácteos"], popular:false, active:true },
    { id:7,  emoji:"🦐", name:"Bouillabaisse", desc:"Salsa rouille de azafrán, filete de bacalao, trucha asalmonada, mejillones, gambas, baguette de piedra", cat:"haupt", price:"14.90", allergens:["Gluten","Pescado","Mariscos"], popular:false, active:true },
    { id:8,  emoji:"🌍", name:"Recomendación del Chef", desc:"Plato típico del país de origen de nuestro equipo — cambia cada día", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
    { id:9,  emoji:"🎃", name:"Sopa de Calabaza, Jengibre y Coco", desc:"Espuma de albahaca-lima, berros del jardín sauna", cat:"bio", price:"8.90", allergens:["Vegano","Sin Gluten"], popular:false, active:true },
    { id:10, emoji:"🐟", name:"Quiche de Salmón Salvaje", desc:"Con espinacas, carpaccio de remolacha, canónigos, nueces, vinagreta de naranja-mostaza", cat:"bio", price:"17.80", allergens:["Gluten","Pescado","Frutos Secos"], popular:true, active:true },
    { id:11, emoji:"🍗", name:"Pollo Ecológico en Tiras", desc:"Champiñones, rösti de patata, verduras de temporada, vinagreta de naranja-mostaza", cat:"bio", price:"24.90", allergens:["Sin Gluten","Lácteos"], popular:false, active:true },
    { id:12, emoji:"🍋", name:"Crema de Limoncello y Mascarpone", desc:"Crumble de cacao y almendra, gel de limón, ragú de frutas del bosque", cat:"bio", price:"7.60", allergens:["Lácteos","Frutos Secos"], popular:true, active:true },
    { id:13, emoji:"🌟", name:"Menú Bio de 3 Pasos", desc:"Sopa o entrante, plato principal, postre a elegir — más 0,1l Jarasole Bio-Frizzante Prosecco", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
    { id:14, emoji:"🥗", name:"Ensalada de Pollo y Patata", desc:"Ensalada fresca con pollo y patatas", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
    { id:15, emoji:"🥑", name:"Ensalada de Aguacate y Parmesano", desc:"Ensalada fresca con aguacate y parmesano", cat:"salat", price:"16.90", allergens:["Lácteos"], popular:true, active:true },
    { id:16, emoji:"🌿", name:"Verduras de Temporada", desc:"Ensalada de hoja de temporada, preparada fresca cada día", cat:"salat", price:"9.90", allergens:["Vegano"], popular:false, active:true },
    { id:17, emoji:"🥬", name:"Ensalada de Acompañamiento", desc:"Pequeña ensalada mixta de guarnición", cat:"salat", price:"4.90", allergens:["Vegano"], popular:false, active:true },
    { id:18, emoji:"🍟", name:"Patatas Fritas", desc:"Con sal de hierbas ecológicas", cat:"snack", price:"4.50", allergens:["Vegano"], popular:false, active:true },
    { id:19, emoji:"🍟", name:"Patatas con Trufa", desc:"Sal de trufa y mayonesa de trufa", cat:"snack", price:"6.60", allergens:["Lácteos"], popular:true, active:true },
    { id:20, emoji:"🌭", name:"Currywurst Herta Heuwer", desc:"Currywurst clásica con baguette", cat:"snack", price:"7.70", allergens:["Gluten"], popular:true, active:true },
    { id:21, emoji:"🌭", name:"Salchichas Wiener o Blancas", desc:"Par de salchichas con pretzel", cat:"snack", price:"6.90", allergens:["Gluten"], popular:false, active:true },
    { id:22, emoji:"🍔", name:"Bambados Burger", desc:"Hamburguesa casera", cat:"snack", price:"8.80", allergens:["Gluten","Lácteos"], popular:true, active:true },
    { id:23, emoji:"🌯", name:"Ve.gö.ner", desc:"Döner vegano (puede ser vegano)", cat:"snack", price:"9.90", allergens:["Gluten"], popular:false, active:true },
    { id:24, emoji:"🌱", name:"Currywurst Endori", desc:"Currywurst vegana", cat:"snack", price:"7.90", allergens:["Vegano","Gluten"], popular:false, active:true },
    { id:25, emoji:"🍔", name:"Kulturburger", desc:"Hamburguesa vegetariana", cat:"snack", price:"9.90", allergens:["Gluten","Lácteos"], popular:false, active:true },
    { id:26, emoji:"🥪", name:"Panini & Ensalada", desc:"Puede ser vegano", cat:"snack", price:"7.70", allergens:["Gluten"], popular:false, active:true },
    { id:27, emoji:"🌯", name:"Wrap de Falafel", desc:"Wrap fresco con falafel", cat:"snack", price:"9.90", allergens:["Vegano","Gluten"], popular:true, active:true },
    { id:28, emoji:"🧆", name:"Börek", desc:"Con espinacas y feta", cat:"snack", price:"6.90", allergens:["Gluten","Lácteos"], popular:false, active:true },
    { id:29, emoji:"🍎", name:"Strudel de Manzana", desc:"Con helado de vainilla o nuez, nata", cat:"dessert", price:"7.90", allergens:["Gluten","Lácteos","Frutos Secos"], popular:true, active:true },
    { id:30, emoji:"🍰", name:"Selección de Tartas", desc:"Cambia cada día — pregunte por la selección de hoy", cat:"dessert", price:"4.20", allergens:["Gluten","Lácteos"], popular:false, active:true },
    { id:31, emoji:"💧", name:"Agua & Bebidas Calientes Tarifa Plana", desc:"Agua (sin gas/con gas), té y café de filtro — pague una vez, recargue las veces que quiera", cat:"drink", price:"0", allergens:["Vegano"], popular:true, active:true },
    { id:32, emoji:"🌿", name:"Refresco de Ruibarbo Bio", desc:"0,33l", cat:"drink", price:"3.60", allergens:["Vegano"], popular:false, active:true },
    { id:33, emoji:"🍺", name:"Lammsbräu Pils Bio (sin alcohol)", desc:"0,33l", cat:"drink", price:"4.90", allergens:["Gluten"], popular:false, active:true },
    { id:34, emoji:"🍵", name:"Té de Menta Bio", desc:"Con menta fresca del jardín, 0,4l", cat:"drink", price:"2.50", allergens:["Vegano"], popular:false, active:true },
    { id:35, emoji:"🥛", name:"Kéfir Bio Andechser", desc:"0,5l", cat:"drink", price:"4.90", allergens:["Lácteos"], popular:false, active:true },
    { id:36, emoji:"🥂", name:"Prosecco Jarasole Bio-Frizzante", desc:"Italia, 0,2l", cat:"drink", price:"6.80", allergens:["Vegano"], popular:false, active:true },
    { id:37, emoji:"🍺", name:"Cervezas de Bamberg", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier (sin alcohol), Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["Gluten"], popular:true, active:true },
    { id:38, emoji:"🍷", name:"Vinos", desc:"Silvaner, Bacchus y Rosé del Weingut zur Schwane · Vino tinto Blackprint del viticultor Markus Schneider", cat:"drink", price:"0", allergens:[], popular:false, active:true },

    // CAFÉ Y BEBIDAS CALIENTES
    { id:50, emoji:"☕", name:"Espresso", desc:"Solo o doble", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
    { id:51, emoji:"☕", name:"Cappuccino", desc:"Con leche entera o leche de avena", cat:"kaffee", price:"3.20", allergens:["Lácteos"], popular:true, active:true },
    { id:52, emoji:"☕", name:"Café Latte", desc:"Con leche entera o leche de avena", cat:"kaffee", price:"3.80", allergens:["Lácteos"], popular:false, active:true },
    { id:53, emoji:"☕", name:"Americano", desc:"Espresso con agua caliente", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
    { id:54, emoji:"🍵", name:"Selección de Tés", desc:"Varios tipos — pregunte por la selección de hoy", cat:"kaffee", price:"2.80", allergens:["Vegano"], popular:false, active:true },
    { id:55, emoji:"🫗", name:"Chocolate Caliente", desc:"Con leche entera o leche de avena", cat:"kaffee", price:"3.50", allergens:["Lácteos"], popular:false, active:true },
    { id:56, emoji:"💧", name:"Agua & Café Filtro Tarifa Plana", desc:"Agua (sin gas/con gas) & café filtro — pague una vez, recargue cuantas veces quiera", cat:"kaffee", price:"0", allergens:["Vegano"], popular:true, active:true },
  ],
};

// TR, FR, AR menus reuse DE structure with same items
// ─── TURKISH MENU ─────────────────────────────────────────────────────────────
MENU_ITEMS["TR"] = [
  // ANA YEMEKLER - Vejetaryen
  { id:1,  emoji:"🫘", name:"Chana Masala", desc:"Sebze köri, nohut, patates, domates, soğan, kişniş, basmati pirinç", cat:"haupt", price:"14.80", allergens:["Vegan","Glütensiz"], popular:false, active:true },
  { id:2,  emoji:"🥨", name:"Pretzel Köftesi", desc:"Ispanak, parmesan, portakal yağı, mantar kremalı ragù ile", cat:"haupt", price:"14.90", allergens:["Glüten","Laktoz"], popular:false, active:true },
  { id:3,  emoji:"🍝", name:"Pasta Basta Gnocchi", desc:"Adaçayı tereyağı, kurutulmuş domates, patlıcan, patlıcan-biber kreması, roka, parmesan", cat:"haupt", price:"15.70", allergens:["Glüten","Laktoz"], popular:true, active:true },
  { id:4,  emoji:"🎃", name:"Sonbahar Özel", desc:"Karamelize keçi peyniri, kuzu marulu, fırın balkabağı, tatlı patates dilimleri, ayva çatney, ceviz, incir-hurma sirkesi", cat:"haupt", price:"16.90", allergens:["Laktoz","Kuruyemiş"], popular:true, active:true },
  // ANA YEMEKLER - Et & Balık
  { id:5,  emoji:"🐟", name:"Kuzey Somonuı", desc:"Ev yapımı marine somon, limon, ardıç, İskandinav taş fırın ekmeği, salatalık, elma, ahududu-soğan, wasabi kreması", cat:"haupt", price:"17.90", allergens:["Glüten","Balık"], popular:true, active:true },
  { id:6,  emoji:"🦌", name:"Wildthing Köttbullar", desc:"Av eti köftesi, patates püresi, kızılcık, kızartma sosu", cat:"haupt", price:"16.80", allergens:["Glüten","Laktoz"], popular:false, active:true },
  { id:7,  emoji:"🦐", name:"Bouillabaisse", desc:"Safran rouille sosu, morina filetosu, alabalık, midye, karides, taş fırın baget", cat:"haupt", price:"14.90", allergens:["Glüten","Balık","Deniz Ürünleri"], popular:false, active:true },
  { id:8,  emoji:"🌍", name:"Şefin Önerisi", desc:"Çalışanlarımızın memleketinden günlük değişen yemek", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
  // BIO KART
  { id:9,  emoji:"🎃", name:"Balkabağı-Zencefil-Hindistancevizi Çorbası", desc:"Fesleğen-limon espuma, sauna bahçesi su teresi", cat:"bio", price:"8.90", allergens:["Vegan","Glütensiz"], popular:false, active:true },
  { id:10, emoji:"🐟", name:"Yabani Somon Quiche", desc:"Ispanak, pancar carpaccio, kuzu marulu, ceviz, portakal-hardal vinaigrette ile", cat:"bio", price:"17.80", allergens:["Glüten","Balık","Kuruyemiş"], popular:true, active:true },
  { id:11, emoji:"🍗", name:"Organik Tavuk Jülyen", desc:"Mantar, patates rösti, mevsim yeşillikleri, portakal-hardal vinaigrette", cat:"bio", price:"24.90", allergens:["Glütensiz","Laktoz"], popular:false, active:true },
  { id:12, emoji:"🍋", name:"Limoncello-Mascarpone Kreması", desc:"Kakao-badem crumble, limon jeli, orman meyveleri ragù", cat:"bio", price:"7.60", allergens:["Laktoz","Kuruyemiş"], popular:true, active:true },
  { id:13, emoji:"🌟", name:"Organik 3 Kat Menü", desc:"Çorba veya başlangıç, ana yemek, tatlı seçimi — 0,1l Jarasole Bio-Frizzante Prosecco dahil", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
  // SALATALAR
  { id:14, emoji:"🥗", name:"Tavuk & Patates Salatası", desc:"Tavuk ve patates ile taze salata", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
  { id:15, emoji:"🥑", name:"Avokado & Parmesan Salatası", desc:"Avokado ve parmesan ile taze salata", cat:"salat", price:"16.90", allergens:["Laktoz"], popular:true, active:true },
  { id:16, emoji:"🌿", name:"Mevsim Yeşillikleri", desc:"Mevsimlik yaprak salata, her gün taze hazırlanır", cat:"salat", price:"9.90", allergens:["Vegan"], popular:false, active:true },
  { id:17, emoji:"🥬", name:"Yan Salata", desc:"Küçük karışık salata — garnitür olarak", cat:"salat", price:"4.90", allergens:["Vegan"], popular:false, active:true },
  // ATIŞTIIRMALIKLAR
  { id:18, emoji:"🍟", name:"Patates Kızartması", desc:"Organik otlu tuzla", cat:"snack", price:"4.50", allergens:["Vegan"], popular:false, active:true },
  { id:19, emoji:"🍟", name:"Trüf Mantarlı Patates", desc:"Trüf tuzu & trüf mayonezi", cat:"snack", price:"6.60", allergens:["Laktoz"], popular:true, active:true },
  { id:20, emoji:"🌭", name:"Currywurst Herta Heuwer", desc:"Klasik currywurst, baget ekmeği ile", cat:"snack", price:"7.70", allergens:["Glüten"], popular:true, active:true },
  { id:21, emoji:"🌭", name:"Wiener veya Weißwürste", desc:"İkili sosis, pretzel ile", cat:"snack", price:"6.90", allergens:["Glüten"], popular:false, active:true },
  { id:22, emoji:"🍔", name:"Bambados Burger", desc:"Ev yapımı burger", cat:"snack", price:"8.80", allergens:["Glüten","Laktoz"], popular:true, active:true },
  { id:23, emoji:"🌯", name:"Ve.gö.ner", desc:"Vegan döner (vegan olabilir)", cat:"snack", price:"9.90", allergens:["Glüten"], popular:false, active:true },
  { id:24, emoji:"🌱", name:"Endori Currywurst", desc:"Vegan currywurst", cat:"snack", price:"7.90", allergens:["Vegan","Glüten"], popular:false, active:true },
  { id:25, emoji:"🍔", name:"Kültür Burger", desc:"Vejetaryen burger", cat:"snack", price:"9.90", allergens:["Glüten","Laktoz"], popular:false, active:true },
  { id:26, emoji:"🥪", name:"Panini & Yan Salata", desc:"Vegan olabilir", cat:"snack", price:"7.70", allergens:["Glüten"], popular:false, active:true },
  { id:27, emoji:"🌯", name:"Falafel Dürüm", desc:"Falafel ile taze dürüm", cat:"snack", price:"9.90", allergens:["Vegan","Glüten"], popular:true, active:true },
  { id:28, emoji:"🧆", name:"Börek", desc:"Ispanak ve beyaz peynir ile", cat:"snack", price:"6.90", allergens:["Glüten","Laktoz"], popular:false, active:true },
  // TATLILAR
  { id:29, emoji:"🍎", name:"Elmalı Strudel", desc:"Vanilyalı veya cevizli dondurma ile, krema", cat:"dessert", price:"7.90", allergens:["Glüten","Laktoz","Kuruyemiş"], popular:true, active:true },
  { id:30, emoji:"🍰", name:"Günlük Pasta Seçimi", desc:"Her gün değişir — bugünkü seçim için sorunuz", cat:"dessert", price:"4.20", allergens:["Glüten","Laktoz"], popular:false, active:true },
  // İÇECEKLER
  { id:31, emoji:"💧", name:"Su & Sıcak İçecek Sınırsız", desc:"İçme suyu (sade/köpüklü), çay ve filtre kahve — bir kez öde, istediğin kadar doldur", cat:"drink", price:"0", allergens:["Vegan"], popular:true, active:true },
  { id:32, emoji:"🌿", name:"Organik Ravent Şurubu", desc:"0,33l", cat:"drink", price:"3.60", allergens:["Vegan"], popular:false, active:true },
  { id:33, emoji:"🍺", name:"Organik Lammsbräu Pils (alkolsüz)", desc:"0,33l", cat:"drink", price:"4.90", allergens:["Glüten"], popular:false, active:true },
  { id:34, emoji:"🍵", name:"Organik Nane Çayı", desc:"Taze bahçe nanesi ile, 0,4l", cat:"drink", price:"2.50", allergens:["Vegan"], popular:false, active:true },
  { id:35, emoji:"🥛", name:"Andechser Organik Kefir", desc:"0,5l", cat:"drink", price:"4.90", allergens:["Laktoz"], popular:false, active:true },
  { id:36, emoji:"🥂", name:"Jarasole Bio-Frizzante Prosecco", desc:"İtalya, 0,2l", cat:"drink", price:"6.80", allergens:["Vegan"], popular:false, active:true },
  { id:37, emoji:"🍺", name:"Bamberg Biralları", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier (alkolsüz), Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["Glüten"], popular:true, active:true },
  { id:38, emoji:"🍷", name:"Şaraplar", desc:"Silvaner, Bacchus ve Rosé (Weingut zur Schwane) · Blackprint Kırmızı Şarap (Markus Schneider)", cat:"drink", price:"0", allergens:[], popular:false, active:true },
  // KAHVE & SICAK İÇECEKLER
  { id:50, emoji:"☕", name:"Espresso", desc:"Tek veya çift", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
  { id:51, emoji:"☕", name:"Cappuccino", desc:"Tam yağlı veya yulaf sütü ile", cat:"kaffee", price:"3.20", allergens:["Laktoz"], popular:true, active:true },
  { id:52, emoji:"☕", name:"Café Latte", desc:"Tam yağlı veya yulaf sütü ile", cat:"kaffee", price:"3.80", allergens:["Laktoz"], popular:false, active:true },
  { id:53, emoji:"☕", name:"Americano", desc:"Espresso ve sıcak su ile", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
  { id:54, emoji:"🍵", name:"Çay Seçimi", desc:"Çeşitli tatlar — bugünkü seçim için sorunuz", cat:"kaffee", price:"2.80", allergens:["Vegan"], popular:false, active:true },
  { id:55, emoji:"🫗", name:"Sıcak Çikolata", desc:"Tam yağlı veya yulaf sütü ile", cat:"kaffee", price:"3.50", allergens:["Laktoz"], popular:false, active:true },
  { id:56, emoji:"💧", name:"Su & Filtre Kahve Sınırsız", desc:"Su (sade/köpüklü) & filtre kahve — bir kez öde, istediğin kadar doldur", cat:"kaffee", price:"0", allergens:["Vegan"], popular:true, active:true },
];

// ─── FRENCH MENU ───────────────────────────────────────────────────────────────
MENU_ITEMS["FR"] = [
  { id:1,  emoji:"🫘", name:"Chana Masala", desc:"Curry de légumes, pois chiches, pomme de terre, tomate, oignon, coriandre, riz basmati", cat:"haupt", price:"14.80", allergens:["Vegan","Sans Gluten"], popular:false, active:true },
  { id:2,  emoji:"🥨", name:"Knödel de Bretzel", desc:"Épinards, parmesan, huile d'orange, ragù de champignons à la crème", cat:"haupt", price:"14.90", allergens:["Gluten","Lactose"], popular:false, active:true },
  { id:3,  emoji:"🍝", name:"Pasta Basta Gnocchi", desc:"Beurre de sauge, tomate séchée, aubergine, crème aubergine-poivron, roquette, parmesan", cat:"haupt", price:"15.70", allergens:["Gluten","Lactose"], popular:true, active:true },
  { id:4,  emoji:"🎃", name:"Spécial Automne", desc:"Fromage de chèvre caramélisé, mâche, potiron au four, patate douce, chutney de coing, noix, vinaigre figue-datte", cat:"haupt", price:"16.90", allergens:["Lactose","Noix"], popular:true, active:true },
  { id:5,  emoji:"🐟", name:"Saumon Nord", desc:"Saumon mariné maison, citron, genièvre, pain scandinave, concombre, pomme, oignon-framboise, crème wasabi", cat:"haupt", price:"17.90", allergens:["Gluten","Poisson"], popular:true, active:true },
  { id:6,  emoji:"🦌", name:"Wildthing Köttbullar", desc:"Boulettes de gibier, purée de pommes de terre, airelles, jus de rôti", cat:"haupt", price:"16.80", allergens:["Gluten","Lactose"], popular:false, active:true },
  { id:7,  emoji:"🦐", name:"Bouillabaisse", desc:"Sauce rouille au safran, filet de cabillaud, truite, moules, crevettes, baguette au four", cat:"haupt", price:"14.90", allergens:["Gluten","Poisson","Fruits de mer"], popular:false, active:true },
  { id:8,  emoji:"🌍", name:"Suggestion du Chef", desc:"Plat typique du pays d'origine de nos employés — change chaque jour", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
  { id:9,  emoji:"🎃", name:"Soupe Potiron-Gingembre-Coco", desc:"Espuma basilic-citron vert, cresson du jardin sauna", cat:"bio", price:"8.90", allergens:["Vegan","Sans Gluten"], popular:false, active:true },
  { id:10, emoji:"🐟", name:"Quiche au Saumon Sauvage", desc:"Épinards, carpaccio de betterave, mâche, noix, vinaigrette orange-moutarde", cat:"bio", price:"17.80", allergens:["Gluten","Poisson","Noix"], popular:true, active:true },
  { id:11, emoji:"🍗", name:"Émincé de Poulet Bio", desc:"Champignons, rösti de pommes de terre, légumes de saison, vinaigrette orange-moutarde", cat:"bio", price:"24.90", allergens:["Sans Gluten","Lactose"], popular:false, active:true },
  { id:12, emoji:"🍋", name:"Crème Limoncello-Mascarpone", desc:"Crumble cacao-amande, gel citron, ragù de fruits des bois", cat:"bio", price:"7.60", allergens:["Lactose","Noix"], popular:true, active:true },
  { id:13, emoji:"🌟", name:"Menu Bio 3 Plats", desc:"Soupe ou entrée, plat principal, dessert au choix — plus 0,1l Jarasole Bio-Frizzante Prosecco", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
  { id:14, emoji:"🥗", name:"Salade Poulet & Pommes de Terre", desc:"Salade fraîche avec poulet et pommes de terre", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
  { id:15, emoji:"🥑", name:"Salade Avocat & Parmesan", desc:"Salade fraîche avec avocat et parmesan", cat:"salat", price:"16.90", allergens:["Lactose"], popular:true, active:true },
  { id:16, emoji:"🌿", name:"Légumes Verts de Saison", desc:"Salade de feuilles de saison, préparée fraîche chaque jour", cat:"salat", price:"9.90", allergens:["Vegan"], popular:false, active:true },
  { id:17, emoji:"🥬", name:"Salade d'Accompagnement", desc:"Petite salade mixte en accompagnement", cat:"salat", price:"4.90", allergens:["Vegan"], popular:false, active:true },
  { id:18, emoji:"🍟", name:"Frites", desc:"Au sel d'herbes bio", cat:"snack", price:"4.50", allergens:["Vegan"], popular:false, active:true },
  { id:19, emoji:"🍟", name:"Frites à la Truffe", desc:"Sel de truffe & mayonnaise à la truffe", cat:"snack", price:"6.60", allergens:["Lactose"], popular:true, active:true },
  { id:20, emoji:"🌭", name:"Currywurst Herta Heuwer", desc:"Currywurst classique avec baguette", cat:"snack", price:"7.70", allergens:["Gluten"], popular:true, active:true },
  { id:21, emoji:"🌭", name:"Saucisses Wiener ou Blanches", desc:"Paire de saucisses avec bretzel", cat:"snack", price:"6.90", allergens:["Gluten"], popular:false, active:true },
  { id:22, emoji:"🍔", name:"Bambados Burger", desc:"Burger maison", cat:"snack", price:"8.80", allergens:["Gluten","Lactose"], popular:true, active:true },
  { id:23, emoji:"🌯", name:"Ve.gö.ner", desc:"Döner vegan (peut être vegan)", cat:"snack", price:"9.90", allergens:["Gluten"], popular:false, active:true },
  { id:24, emoji:"🌱", name:"Currywurst Endori", desc:"Currywurst vegan", cat:"snack", price:"7.90", allergens:["Vegan","Gluten"], popular:false, active:true },
  { id:25, emoji:"🍔", name:"Kulturburger", desc:"Burger végétarien", cat:"snack", price:"9.90", allergens:["Gluten","Lactose"], popular:false, active:true },
  { id:26, emoji:"🥪", name:"Panini & Salade", desc:"Peut être vegan", cat:"snack", price:"7.70", allergens:["Gluten"], popular:false, active:true },
  { id:27, emoji:"🌯", name:"Wrap Falafel", desc:"Wrap frais aux falafels", cat:"snack", price:"9.90", allergens:["Vegan","Gluten"], popular:true, active:true },
  { id:28, emoji:"🧆", name:"Börek", desc:"Aux épinards et feta", cat:"snack", price:"6.90", allergens:["Gluten","Lactose"], popular:false, active:true },
  { id:29, emoji:"🍎", name:"Strudel aux Pommes", desc:"Glace vanille ou noix, crème", cat:"dessert", price:"7.90", allergens:["Gluten","Lactose","Noix"], popular:true, active:true },
  { id:30, emoji:"🍰", name:"Sélection de Gâteaux", desc:"Change chaque jour — demandez la sélection du jour", cat:"dessert", price:"4.20", allergens:["Gluten","Lactose"], popular:false, active:true },
  { id:31, emoji:"💧", name:"Eau & Boissons Chaudes Forfait", desc:"Eau (plate/pétillante), thé & café filtre — payez une fois, resservez à volonté", cat:"drink", price:"0", allergens:["Vegan"], popular:true, active:true },
  { id:32, emoji:"🌿", name:"Limonade Bio à la Rhubarbe", desc:"0,33l", cat:"drink", price:"3.60", allergens:["Vegan"], popular:false, active:true },
  { id:33, emoji:"🍺", name:"Lammsbräu Pils Bio (sans alcool)", desc:"0,33l", cat:"drink", price:"4.90", allergens:["Gluten"], popular:false, active:true },
  { id:34, emoji:"🍵", name:"Thé à la Menthe Bio", desc:"À la menthe fraîche du jardin, 0,4l", cat:"drink", price:"2.50", allergens:["Vegan"], popular:false, active:true },
  { id:35, emoji:"🥛", name:"Kéfir Bio Andechser", desc:"0,5l", cat:"drink", price:"4.90", allergens:["Lactose"], popular:false, active:true },
  { id:36, emoji:"🥂", name:"Prosecco Jarasole Bio-Frizzante", desc:"Italie, 0,2l", cat:"drink", price:"6.80", allergens:["Vegan"], popular:false, active:true },
  { id:37, emoji:"🍺", name:"Bières de Bamberg", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier (sans alcool), Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["Gluten"], popular:true, active:true },
  { id:38, emoji:"🍷", name:"Vins", desc:"Silvaner, Bacchus et Rosé (Weingut zur Schwane) · Blackprint rouge (Markus Schneider)", cat:"drink", price:"0", allergens:[], popular:false, active:true },
  { id:50, emoji:"☕", name:"Espresso", desc:"Simple ou double", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
  { id:51, emoji:"☕", name:"Cappuccino", desc:"Lait entier ou lait d'avoine", cat:"kaffee", price:"3.20", allergens:["Lactose"], popular:true, active:true },
  { id:52, emoji:"☕", name:"Café Latte", desc:"Lait entier ou lait d'avoine", cat:"kaffee", price:"3.80", allergens:["Lactose"], popular:false, active:true },
  { id:53, emoji:"☕", name:"Américano", desc:"Espresso et eau chaude", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
  { id:54, emoji:"🍵", name:"Sélection de Thés", desc:"Diverses variétés — demandez la sélection du jour", cat:"kaffee", price:"2.80", allergens:["Vegan"], popular:false, active:true },
  { id:55, emoji:"🫗", name:"Chocolat Chaud", desc:"Lait entier ou lait d'avoine", cat:"kaffee", price:"3.50", allergens:["Lactose"], popular:false, active:true },
  { id:56, emoji:"💧", name:"Eau & Café Filtre Forfait", desc:"Eau (plate/pétillante) & café filtre — payez une fois, resservez à volonté", cat:"kaffee", price:"0", allergens:["Vegan"], popular:true, active:true },
];

// ─── ARABIC MENU ───────────────────────────────────────────────────────────────
MENU_ITEMS["AR"] = [
  { id:1,  emoji:"🫘", name:"شانا ماسالا", desc:"كاري خضار، حمص، بطاطس، طماطم، بصل، كزبرة، أرز بسمتي", cat:"haupt", price:"14.80", allergens:["نباتي","خالٍ من الغلوتين"], popular:false, active:true },
  { id:2,  emoji:"🥨", name:"كنيدل البريتزل", desc:"سبانخ، بارميزان، زيت برتقال، راغو كريمي بالفطر", cat:"haupt", price:"14.90", allergens:["غلوتين","لاكتوز"], popular:false, active:true },
  { id:3,  emoji:"🍝", name:"باستا باستا غنوكي", desc:"زبدة مريمية، طماطم مجففة، باذنجان، كريمة باذنجان-فلفل، جرجير، بارميزان", cat:"haupt", price:"15.70", allergens:["غلوتين","لاكتوز"], popular:true, active:true },
  { id:4,  emoji:"🎃", name:"خاص الخريف", desc:"جبن ماعز مكرمل، خس حملي، يقطين محمص، بطاطا حلوة، صلصة السفرجل، جوز، خل التين والتمر", cat:"haupt", price:"16.90", allergens:["لاكتوز","مكسرات"], popular:true, active:true },
  { id:5,  emoji:"🐟", name:"سالمون الشمال", desc:"سالمون مخلل منزلي، ليمون، عرعر، خبز حجري إسكندنافي، خيار، تفاح، بصل-توت العليق، كريمة واسابي", cat:"haupt", price:"17.90", allergens:["غلوتين","سمك"], popular:true, active:true },
  { id:6,  emoji:"🦌", name:"كفتة الصيد البري", desc:"كفتة لحم الصيد، هريسة البطاطس، توت العليق الأحمر، مرق الشواء", cat:"haupt", price:"16.80", allergens:["غلوتين","لاكتوز"], popular:false, active:true },
  { id:7,  emoji:"🦐", name:"بوياباس", desc:"صلصة رويي بالزعفران، فيليه سمك القد، سمك التراوت، بلح البحر، جمبري، باغيت حجري", cat:"haupt", price:"14.90", allergens:["غلوتين","سمك","مأكولات بحرية"], popular:false, active:true },
  { id:8,  emoji:"🌍", name:"توصية الشيف", desc:"طبق يومي متغير من بلد موظفينا الأصلي", cat:"haupt", price:"0", allergens:[], popular:false, active:true },
  { id:9,  emoji:"🎃", name:"شوربة اليقطين والزنجبيل وجوز الهند", desc:"إسبوما الريحان والليمون، جرجير حديقة الساونا", cat:"bio", price:"8.90", allergens:["نباتي","خالٍ من الغلوتين"], popular:false, active:true },
  { id:10, emoji:"🐟", name:"كيش سالمون بري", desc:"سبانخ، كاربتشيو شمندر، خس حملي، جوز، فينيغريت البرتقال والخردل", cat:"bio", price:"17.80", allergens:["غلوتين","سمك","مكسرات"], popular:true, active:true },
  { id:11, emoji:"🍗", name:"دجاج عضوي جوليان", desc:"فطر، بطاطس روستي، خضروات موسمية، فينيغريت البرتقال والخردل", cat:"bio", price:"24.90", allergens:["خالٍ من الغلوتين","لاكتوز"], popular:false, active:true },
  { id:12, emoji:"🍋", name:"كريمة ليمونشيلو ماسكاربوني", desc:"كرامبل الكاكاو واللوز، هلام الليمون، راغو توت الغابة", cat:"bio", price:"7.60", allergens:["لاكتوز","مكسرات"], popular:true, active:true },
  { id:13, emoji:"🌟", name:"قائمة عضوية 3 أطباق", desc:"شوربة أو مقبلات، طبق رئيسي، حلوى اختيارية — مع 0,1ل بروسيكو عضوي", cat:"bio", price:"34.90", allergens:[], popular:true, active:true },
  { id:14, emoji:"🥗", name:"سلطة الدجاج والبطاطس", desc:"سلطة طازجة مع دجاج وبطاطس", cat:"salat", price:"16.90", allergens:[], popular:false, active:true },
  { id:15, emoji:"🥑", name:"سلطة الأفوكادو والبارميزان", desc:"سلطة طازجة مع أفوكادو وبارميزان", cat:"salat", price:"16.90", allergens:["لاكتوز"], popular:true, active:true },
  { id:16, emoji:"🌿", name:"خضروات موسمية", desc:"سلطة ورقية موسمية، محضرة طازجة يومياً", cat:"salat", price:"9.90", allergens:["نباتي"], popular:false, active:true },
  { id:17, emoji:"🥬", name:"سلطة جانبية", desc:"سلطة مشكلة صغيرة كطبق جانبي", cat:"salat", price:"4.90", allergens:["نباتي"], popular:false, active:true },
  { id:18, emoji:"🍟", name:"بطاطس مقلية", desc:"بملح الأعشاب العضوي", cat:"snack", price:"4.50", allergens:["نباتي"], popular:false, active:true },
  { id:19, emoji:"🍟", name:"بطاطس بالكمأة", desc:"ملح الكمأة ومايونيز الكمأة", cat:"snack", price:"6.60", allergens:["لاكتوز"], popular:true, active:true },
  { id:20, emoji:"🌭", name:"كاري ورست هيرتا هاور", desc:"كاري ورست كلاسيكي مع باغيت", cat:"snack", price:"7.70", allergens:["غلوتين"], popular:true, active:true },
  { id:21, emoji:"🌭", name:"نقانق فيينا أو بيضاء", desc:"زوج من النقانق مع بريتزل", cat:"snack", price:"6.90", allergens:["غلوتين"], popular:false, active:true },
  { id:22, emoji:"🍔", name:"برغر بامبادوس", desc:"برغر منزلي الصنع", cat:"snack", price:"8.80", allergens:["غلوتين","لاكتوز"], popular:true, active:true },
  { id:23, emoji:"🌯", name:"في.يو.نير", desc:"دونر نباتي (يمكن أن يكون نباتياً)", cat:"snack", price:"9.90", allergens:["غلوتين"], popular:false, active:true },
  { id:24, emoji:"🌱", name:"كاري ورست إيندوري", desc:"كاري ورست نباتي", cat:"snack", price:"7.90", allergens:["نباتي","غلوتين"], popular:false, active:true },
  { id:25, emoji:"🍔", name:"كولتور برغر", desc:"برغر نباتي", cat:"snack", price:"9.90", allergens:["غلوتين","لاكتوز"], popular:false, active:true },
  { id:26, emoji:"🥪", name:"باني ني وسلطة جانبية", desc:"يمكن أن يكون نباتياً", cat:"snack", price:"7.70", allergens:["غلوتين"], popular:false, active:true },
  { id:27, emoji:"🌯", name:"لفافة الفلافل", desc:"لفافة طازجة مع فلافل", cat:"snack", price:"9.90", allergens:["نباتي","غلوتين"], popular:true, active:true },
  { id:28, emoji:"🧆", name:"بوريك", desc:"بالسبانخ والجبن الأبيض", cat:"snack", price:"6.90", allergens:["غلوتين","لاكتوز"], popular:false, active:true },
  { id:29, emoji:"🍎", name:"شترودل التفاح", desc:"مع آيس كريم الفانيليا أو الجوز، كريمة", cat:"dessert", price:"7.90", allergens:["غلوتين","لاكتوز","مكسرات"], popular:true, active:true },
  { id:30, emoji:"🍰", name:"تشكيلة الكيك اليومية", desc:"تتغير يومياً — اسأل عن الاختيار اليوم", cat:"dessert", price:"4.20", allergens:["غلوتين","لاكتوز"], popular:false, active:true },
  { id:31, emoji:"💧", name:"مشروبات غير محدودة", desc:"ماء (عادي/فوار)، شاي وقهوة مفلترة — ادفع مرة واحدة وأعد الملء كما تشاء", cat:"drink", price:"0", allergens:["نباتي"], popular:true, active:true },
  { id:32, emoji:"🌿", name:"شراب الراوند العضوي", desc:"0,33ل", cat:"drink", price:"3.60", allergens:["نباتي"], popular:false, active:true },
  { id:33, emoji:"🍺", name:"بيرة لامسبراو بيلز عضوية (بدون كحول)", desc:"0,33ل", cat:"drink", price:"4.90", allergens:["غلوتين"], popular:false, active:true },
  { id:34, emoji:"🍵", name:"شاي النعناع العضوي", desc:"بنعناع طازج من الحديقة، 0,4ل", cat:"drink", price:"2.50", allergens:["نباتي"], popular:false, active:true },
  { id:35, emoji:"🥛", name:"كفير أندخسر العضوي", desc:"0,5ل", cat:"drink", price:"4.90", allergens:["لاكتوز"], popular:false, active:true },
  { id:36, emoji:"🥂", name:"بروسيكو جاراسول العضوي", desc:"إيطاليا، 0,2ل", cat:"drink", price:"6.80", allergens:["نباتي"], popular:false, active:true },
  { id:37, emoji:"🍺", name:"بيرات بامبرغ", desc:"Sonne Hell, Mahrs U, Rittmayer Kellerbier, Huppendorfer Vollbier, Keesmann Herrenpils, Kundmüller Weyerer Lager, Püls-Bräu Weißbier (بدون كحول), Gutmann Hefeweizen", cat:"drink", price:"0", allergens:["غلوتين"], popular:true, active:true },
  { id:38, emoji:"🍷", name:"النبيذ", desc:"سيلفانر وباخوس وروزيه (Weingut zur Schwane) · نبيذ أحمر بلاكبرينت (ماركوس شنايدر)", cat:"drink", price:"0", allergens:[], popular:false, active:true },
  { id:50, emoji:"☕", name:"إسبريسو", desc:"مفرد أو مزدوج", cat:"kaffee", price:"2.20", allergens:[], popular:false, active:true },
  { id:51, emoji:"☕", name:"كابتشينو", desc:"مع حليب كامل الدسم أو حليب الشوفان", cat:"kaffee", price:"3.20", allergens:["لاكتوز"], popular:true, active:true },
  { id:52, emoji:"☕", name:"كافيه لاتيه", desc:"مع حليب كامل الدسم أو حليب الشوفان", cat:"kaffee", price:"3.80", allergens:["لاكتوز"], popular:false, active:true },
  { id:53, emoji:"☕", name:"أمريكانو", desc:"إسبريسو مع ماء ساخن", cat:"kaffee", price:"2.80", allergens:[], popular:false, active:true },
  { id:54, emoji:"🍵", name:"تشكيلة الشاي", desc:"أنواع متعددة — اسأل عن الاختيار اليوم", cat:"kaffee", price:"2.80", allergens:["نباتي"], popular:false, active:true },
  { id:55, emoji:"🫗", name:"شوكولاتة ساخنة", desc:"مع حليب كامل الدسم أو حليب الشوفان", cat:"kaffee", price:"3.50", allergens:["لاكتوز"], popular:false, active:true },
  { id:56, emoji:"💧", name:"ماء وقهوة مفلترة غير محدودة", desc:"ماء (عادي/فوار) وقهوة مفلترة — ادفع مرة واحدة وأعد الملء كما تشاء", cat:"kaffee", price:"0", allergens:["نباتي"], popular:true, active:true },
];

const CAT_META = {
  haupt:   { DE:"Hauptgerichte",   EN:"Main Dishes",    ES:"Platos Principales", TR:"Ana Yemekler",    FR:"Plats Principaux",   AR:"الأطباق الرئيسية" },
  bio:     { DE:"🌿 Bio-Karte",    EN:"🌿 Organic Menu",ES:"🌿 Menú Ecológico",  TR:"🌿 Bio Menü",     FR:"🌿 Menu Bio",         AR:"🌿 القائمة العضوية" },
  salat:   { DE:"Salate",          EN:"Salads",          ES:"Ensaladas",          TR:"Salatalar",       FR:"Salades",            AR:"السلطات" },
  snack:   { DE:"Snacks",          EN:"Snacks",          ES:"Snacks",             TR:"Atıştırmalıklar", FR:"Snacks",             AR:"وجبات خفيفة" },
  dessert: { DE:"Desserts",        EN:"Desserts",        ES:"Postres",            TR:"Tatlılar",        FR:"Desserts",           AR:"الحلويات" },
  drink:   { DE:"Getränke",        EN:"Drinks",          ES:"Bebidas",            TR:"İçecekler",       FR:"Boissons",           AR:"المشروبات" },
  kaffee:  { DE:"Kaffee & Heißgetränke", EN:"Coffee & Hot Drinks", ES:"Café y Bebidas Calientes", TR:"Kahve & Sıcak İçecekler", FR:"Café & Boissons Chaudes", AR:"القهوة والمشروبات الساخنة" },
};

const catBg = { haupt:"#FAEEDA", bio:"#E1F5EE", salat:"#EAF3DE", snack:"#EEEDFE", dessert:"#FBEAF0", drink:"#E6F1FB", kaffee:"#FDF4E7" };

const fmt = (price, t) => {
  const p = parseFloat(price);
  if (!p) return t.onRequest;
  return p.toFixed(2).replace(".", ",") + " €";
};

// ─── CUSTOMER MENU ────────────────────────────────────────────────────────────
function CustomerMenu({ lang, items }) {
  const [activeCat, setActiveCat] = useState("all");
  const t = T[lang];
  const activeItems = items.filter(i => i.active);
  const cats = ["all", ...Object.keys(CAT_META)];
  const filtered = activeCat === "all" ? activeItems : activeItems.filter(i => i.cat === activeCat);
  const grouped = {};
  filtered.forEach(item => { if (!grouped[item.cat]) grouped[item.cat] = []; grouped[item.cat].push(item); });

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#f6f3ee", minHeight:"100vh", direction: lang==="AR" ? "rtl" : "ltr" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap'); .cpill{transition:all .2s;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;} .mcard{transition:transform .15s,box-shadow .15s;} .mcard:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.06);}`}</style>

      {/* Hero */}
      <div style={{ background:"linear-gradient(160deg,#1a3a2a 0%,#0d2018 100%)", padding:"28px 24px 22px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:"radial-gradient(circle at 85% 50%,rgba(83,170,130,.12) 0%,transparent 65%)" }} />
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
            <img src={LOGO_BASE64} alt="Der. Franke Logo" style={{ width:"72%", maxWidth:260, objectFit:"contain" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(83,170,130,.15)", border:"0.5px solid rgba(83,170,130,.3)", borderRadius:20, padding:"4px 14px", fontSize:10, color:"#7dcfaa", letterSpacing:1.5, textTransform:"uppercase" }}>✦ {t.tagline}</div>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
            {t.tags.map(tag => <span key={tag} style={{ background:"rgba(83,170,130,.1)", border:"0.5px solid rgba(83,170,130,.25)", borderRadius:20, padding:"4px 10px", fontSize:10, color:"rgba(255,255,255,.55)" }}>{tag}</span>)}
          </div>
        </div>
      </div>

      {/* Flatrate banner */}
      <div style={{ background:"#1a3a2a", padding:"9px 20px", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:16 }}>💧</span>
        <span style={{ fontSize:11, color:"rgba(255,255,255,.65)", lineHeight:1.4 }}>
          <strong style={{ color:"#7dcfaa" }}>{t.flatrateTitle}:</strong> {t.flatrateText}
        </span>
      </div>

      {/* Category nav - 2 rows */}
      <div style={{ padding:"10px 14px", background:"#f6f3ee", borderBottom:"0.5px solid #e4dfd5", position:"sticky", top:0, zIndex:5 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {cats.map(cat => (
            <button key={cat} className="cpill" onClick={() => setActiveCat(cat)}
              style={{ padding:"5px 11px", borderRadius:20, fontSize:11, fontWeight:500, background:activeCat===cat?"#1a3a2a":"transparent", color:activeCat===cat?"#fff":"#6b6560", border:`0.5px solid ${activeCat===cat?"#1a3a2a":"#ccc8be"}` }}>
              {cat==="all" ? t.all : CAT_META[cat][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div style={{ padding:"6px 0 40px" }}>
        {Object.keys(CAT_META).filter(cat => grouped[cat]?.length).map(cat => (
          <div key={cat}>
            <div style={{ padding:"16px 20px 8px", fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:500, color:"#1a1a1a" }}>{CAT_META[cat][lang]}</div>
            <div style={{ padding:"0 14px", display:"flex", flexDirection:"column", gap:8 }}>
              {grouped[cat].map(item => (
                <div key={item.id} className="mcard" style={{ background:"#fff", borderRadius:14, padding:"13px 15px", display:"flex", gap:12, border:"0.5px solid #ece7de" }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:catBg[item.cat]||"#f4f0e8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{item.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    {item.popular && <div style={{ fontSize:9, fontWeight:600, color:"#1a3a2a", background:"#e1f5ee", border:"0.5px solid #7dcfaa", borderRadius:6, padding:"2px 7px", display:"inline-block", marginBottom:4, letterSpacing:.3 }}>★ {t.popular}</div>}
                    <div style={{ fontSize:14, fontWeight:500, color:"#1a1a1a", marginBottom:3 }}>{item.name}</div>
                    <div style={{ fontSize:11, color:"#9b9189", fontWeight:300, lineHeight:1.5, marginBottom:7 }}>{item.desc}</div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:5 }}>
                      <span style={{ fontSize:15, fontWeight:600, color:"#1a3a2a" }}>{fmt(item.price, t)}</span>
                      <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                        {item.allergens.map(a => <span key={a} style={{ fontSize:9, padding:"2px 7px", borderRadius:8, fontWeight:500, background:"#f0f0f0", color:"#555" }}>{a}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height:0.5, background:"#e4dfd5", margin:"12px 20px 0" }} />
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign:"center", padding:48, color:"#9b9189", fontSize:14 }}>{t.noItems}</div>}
      </div>
      {/* Info Section */}
      <div style={{ margin:"0 14px 8px", borderRadius:16, overflow:"hidden", border:"0.5px solid #e4dfd5" }}>
        {/* Header */}
        <div style={{ background:"#1a3a2a", padding:"14px 18px" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:500, color:"#fff" }}>{t.infoTitle}</div>
        </div>
        {/* Address & Phone */}
        <div style={{ background:"#fff", display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"0.5px solid #f0ece4" }}>
          <div style={{ padding:"14px 16px", borderRight:"0.5px solid #f0ece4" }}>
            <div style={{ fontSize:9, color:"#7dcfaa", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>📍 {t.address}</div>
            <div style={{ fontSize:13, color:"#1a1a1a", lineHeight:1.6 }}>Pödeldorfer Str. 174<br/>96050 Bamberg</div>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <div style={{ fontSize:9, color:"#7dcfaa", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>📞 {t.phone}</div>
            <a href="tel:+499517755555" style={{ fontSize:13, color:"#1a3a2a", fontWeight:500, textDecoration:"none" }}>0951 775555</a>
          </div>
        </div>
        {/* Opening hours */}
        <div style={{ background:"#fff", padding:"14px 16px" }}>
          <div style={{ fontSize:9, color:"#7dcfaa", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>🕐 {t.hours}</div>
          {t.days.map((day, i) => (
            <div key={day} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom: i < 6 ? "0.5px solid #f4f0e8" : "none" }}>
              <span style={{ fontSize:13, color: t.dayClosed[i] ? "#bbb" : "#1a1a1a" }}>{day}</span>
              <span style={{ fontSize:12, fontWeight:600, color: t.dayClosed[i] ? "#f87171" : "#1a3a2a", background: t.dayClosed[i] ? "#fff5f5" : "#e1f5ee", padding:"2px 10px", borderRadius:20 }}>{t.dayHours[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign:"center", padding:"10px 0 22px", fontSize:10, color:"#bbb6ac", letterSpacing:.5 }}>{t.poweredBy}</div>
    </div>
  );
}

// ─── MANAGER DASHBOARD ────────────────────────────────────────────────────────
function ManagerDashboard({ lang, items, setItems }) {
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [toastTimer, setToastTimer] = useState(null);
  const [form, setForm] = useState({});
  const nextId = useRef(200);
  const t = T[lang];

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer) clearTimeout(toastTimer);
    setToastTimer(setTimeout(() => setToast(""), 2500));
  };

  const openAdd = () => {
    setForm({ emoji:"🍽️", cat:"haupt", name:"", desc:"", price:"", allergens:"", popular:false, active:true });
    setModal("add");
  };

  const openEdit = (item) => {
    setForm({ ...item, allergens: item.allergens.join(", ") });
    setModal(item);
  };

  const saveForm = () => {
    if (!form.name.trim()) return;
    const allergens = form.allergens ? form.allergens.split(",").map(a => a.trim()).filter(Boolean) : [];
    if (modal === "add") {
      setItems(prev => [...prev, { ...form, allergens, id: nextId.current++ }]);
      showToast(`"${form.name}" ${t.toastAdded}`);
    } else {
      setItems(prev => prev.map(i => i.id === modal.id ? { ...form, allergens, id: modal.id } : i));
      showToast(`"${form.name}" ${t.toastUpdated}`);
    }
    setModal(null);
  };

  const deleteItem = (item) => {
    setItems(prev => prev.filter(i => i.id !== item.id));
    showToast(`"${item.name}" ${t.toastDeleted}`);
  };

  const toggleActive = (id) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      showToast(i.active ? t.toastHidden : t.toastActive);
      return { ...i, active: !i.active };
    }));
  };

  const active = items.filter(i => i.active).length;
  const now = new Date();
  const timeStr = now.getHours() + ":" + String(now.getMinutes()).padStart(2,"0");

  return (
    <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh", background:"#f5f5f5", position:"relative", direction: lang==="AR" ? "rtl" : "ltr" }}>
      <style>{`.di{width:100%;padding:8px 10px;font-size:13px;border:0.5px solid #ccc;border-radius:8px;background:white;color:#1a1a1a;font-family:inherit;box-sizing:border-box;} .di:focus{outline:none;border-color:#1a3a2a;} .rb{width:30px;height:30px;border-radius:8px;border:0.5px solid #e0e0e0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;} .rb:hover{background:#f0f0f0;} .rb.d:hover{background:#fff0f0;color:#c0392b;border-color:#f5c0c0;} .tt{width:34px;height:20px;border-radius:10px;position:relative;cursor:pointer;border:none;transition:background .2s;flex-shrink:0;} .th{position:absolute;width:14px;height:14px;border-radius:50%;background:white;top:3px;transition:left .2s;} .ab{flex:1;padding:10px;border-radius:8px;border:0.5px solid #d0d0d0;background:transparent;color:#1a1a1a;font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;font-family:inherit;transition:background .15s;} .ab:hover{background:#efefef;}`}</style>

      {/* Topbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", background:"#1a3a2a", color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src={LOGO_BASE64} alt="Logo" style={{ width:36, height:36, objectFit:"contain", borderRadius:8, background:"rgba(255,255,255,.1)", padding:3 }} />
          <div>
            <div style={{ fontSize:14, fontWeight:500 }}>Der. Franke</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>{t.dashSub}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(83,170,130,.2)", border:"0.5px solid rgba(83,170,130,.4)", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:500, color:"#7dcfaa" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#7dcfaa" }} />{t.live}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))", gap:10, padding:"14px 20px" }}>
        {[
          { label:t.scans, val:"47", sub:t.scansSub },
          { label:t.activeItems, val:active, sub:`${t.of} ${items.length} ${t.total}` },
          { label:t.lastUpdate, val:timeStr, sub:t.lastUpdateSub },
          { label:t.dwell, val:"1:42", sub:t.dwellSub },
        ].map(m => (
          <div key={m.label} style={{ background:"white", border:"0.5px solid #e8e8e8", borderRadius:10, padding:"11px 13px" }}>
            <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>{m.label}</div>
            <div style={{ fontSize:20, fontWeight:500 }}>{m.val}</div>
            <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* List header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 20px 10px" }}>
        <span style={{ fontSize:12, fontWeight:500, color:"#888", letterSpacing:.3 }}>{t.manage}</span>
        <button onClick={openAdd} style={{ display:"flex", alignItems:"center", gap:6, background:"#1a3a2a", color:"#fff", border:"none", borderRadius:8, padding:"8px 14px", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>{t.addBtn}</button>
      </div>

      {/* Items */}
      <div style={{ padding:"0 20px 16px" }}>
        {Object.keys(CAT_META).map(cat => {
          const catItems = items.filter(i => i.cat === cat);
          if (!catItems.length) return null;
          return (
            <div key={cat} style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"#1a3a2a", letterSpacing:.5, padding:"6px 0 4px", textTransform:"uppercase" }}>{CAT_META[cat][lang]}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                {catItems.map(item => (
                  <div key={item.id} style={{ display:"flex", alignItems:"center", gap:9, background:"white", border:"0.5px solid #e8e8e8", borderRadius:10, padding:"9px 11px", opacity:item.active?1:.45 }}>
                    <div style={{ width:32, height:32, borderRadius:7, background:catBg[item.cat]||"#f5f5f5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{item.emoji}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                      <div style={{ fontSize:11, color:"#888", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.desc}</div>
                    </div>
                    <div style={{ fontSize:13, fontWeight:500, minWidth:60, textAlign:"right", flexShrink:0, color:"#1a3a2a" }}>{fmt(item.price, t)}</div>
                    <div style={{ display:"flex", gap:3, flexShrink:0 }}>
                      <button className="rb" onClick={() => openEdit(item)}>✏️</button>
                      <button className="rb d" onClick={() => deleteItem(item)}>🗑</button>
                    </div>
                    <button className="tt" onClick={() => toggleActive(item.id)} style={{ background:item.active?"#1a3a2a":"#ccc" }}>
                      <div className="th" style={{ left:item.active?17:3 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div style={{ display:"flex", gap:8, padding:"4px 20px 24px" }}>
        <button className="ab" onClick={() => showToast(t.toastQr)}>{t.qrBtn}</button>
        <button className="ab" onClick={() => showToast(t.toastPreview)}>{t.previewBtn}</button>
        <button className="ab" onClick={() => showToast(t.toastPublish)} style={{ border:"0.5px solid #1a3a2a", color:"#1a3a2a", fontWeight:600 }}>{t.publishBtn}</button>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.45)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:50 }}>
          <div style={{ background:"white", borderRadius:14, padding:22, width:"100%", maxWidth:400, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:15, fontWeight:500 }}>{modal==="add"?t.newItem:t.editItem}</span>
              <button onClick={() => setModal(null)} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#888" }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:11, color:"#888", fontWeight:500, marginBottom:4 }}>{t.emoji}</div>
                <input className="di" value={form.emoji||""} onChange={e => setForm(f => ({...f,emoji:e.target.value}))} style={{ textAlign:"center", fontSize:20, padding:4 }} maxLength={2} />
              </div>
              <div>
                <div style={{ fontSize:11, color:"#888", fontWeight:500, marginBottom:4 }}>{t.category}</div>
                <select className="di" value={form.cat||"haupt"} onChange={e => setForm(f => ({...f,cat:e.target.value}))}>
                  {Object.entries(CAT_META).map(([k,v]) => <option key={k} value={k}>{v[lang] || v["DE"]}</option>)}
                </select>
              </div>
            </div>
            {[
              { label:t.itemName, key:"name", ph:"z.B. Tagessuppe" },
              { label:t.itemDesc, key:"desc", ph:"Zutaten…" },
              { label:t.itemPrice, key:"price", ph:"14.80" },
              { label:t.allergens, key:"allergens", ph:"Gluten, Laktose…" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, color:"#888", fontWeight:500, marginBottom:4 }}>{f.label}</div>
                <input className="di" value={form[f.key]||""} onChange={e => setForm(prev => ({...prev,[f.key]:e.target.value}))} placeholder={f.ph} />
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <input type="checkbox" id="pop" checked={!!form.popular} onChange={e => setForm(f => ({...f,popular:e.target.checked}))} />
              <label htmlFor="pop" style={{ fontSize:13, cursor:"pointer" }}>{t.popularCheck}</label>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setModal(null)} style={{ padding:"9px 16px", borderRadius:8, border:"0.5px solid #ccc", background:"transparent", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>{t.cancel}</button>
              <button onClick={saveForm} style={{ flex:1, padding:9, borderRadius:8, background:"#1a3a2a", color:"#fff", border:"none", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>{t.save}</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#1a3a2a", color:"#fff", padding:"9px 20px", borderRadius:20, fontSize:13, whiteSpace:"nowrap", zIndex:100, boxShadow:"0 4px 16px rgba(0,0,0,.2)" }}>{toast}</div>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("menu");
  const [lang, setLang] = useState("DE");
  const [items, setItems] = useState(MENU_ITEMS["DE"]);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const MANAGER_PIN = "1234";
  const t = T[lang];

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setItems(MENU_ITEMS[newLang] || MENU_ITEMS["DE"]);
  };

  const handlePin = (e) => {
    e.preventDefault();
    if (pin === MANAGER_PIN) { setPinUnlocked(true); setView("dashboard"); setPinError(false); }
    else { setPinError(true); setPin(""); }
  };

  return (
    <div style={{ maxWidth:480, margin:"0 auto", position:"relative" }}>
      {/* Top bar */}
      <div style={{ display:"flex", background:"#1a3a2a", position:"sticky", top:0, zIndex:20 }}>
        <button onClick={() => setView("menu")} style={{ flex:1, padding:"11px 0", fontSize:12, fontWeight:500, border:"none", cursor:"pointer", fontFamily:"inherit", background:view==="menu"?"#fff":"transparent", color:view==="menu"?"#1a3a2a":"rgba(255,255,255,.5)", transition:"all .2s" }}>
          {t.menuTab}
        </button>
        {/* Language switcher */}
        <div style={{ display:"flex", alignItems:"center", gap:2, padding:"0 8px" }}>
          {["DE","EN","ES","TR","FR","AR"].map(l => (
            <button key={l} onClick={() => handleLangChange(l)} style={{ fontSize:10, fontWeight:600, padding:"3px 6px", border:`0.5px solid ${lang===l?"rgba(255,255,255,.6)":"rgba(255,255,255,.2)"}`, borderRadius:6, background:"transparent", color:lang===l?"#fff":"rgba(255,255,255,.4)", cursor:"pointer", fontFamily:"inherit", transition:"all .2s" }}>{l}</button>
          ))}
        </div>
        <button onClick={() => { if (!pinUnlocked) setView("pin"); else setView("dashboard"); }} style={{ flex:1, padding:"11px 0", fontSize:12, fontWeight:500, border:"none", cursor:"pointer", fontFamily:"inherit", background:(view==="dashboard"||view==="pin")?"#fff":"transparent", color:(view==="dashboard"||view==="pin")?"#1a3a2a":"rgba(255,255,255,.5)", transition:"all .2s" }}>
          {t.managerTab}
        </button>
      </div>

      {/* PIN screen */}
      {view==="pin" && (
        <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, background:"#f6f3ee" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🔒</div>
          <div style={{ fontSize:18, fontWeight:500, marginBottom:6 }}>{t.pinTitle}</div>
          <div style={{ fontSize:13, color:"#888", marginBottom:28, textAlign:"center" }}>{t.pinSub}</div>
          <form onSubmit={handlePin} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, width:"100%", maxWidth:220 }}>
            <input type="password" maxLength={4} value={pin} onChange={e => { setPin(e.target.value); setPinError(false); }} placeholder="● ● ● ●"
              style={{ width:"100%", padding:"12px 16px", fontSize:20, textAlign:"center", letterSpacing:8, border:`1.5px solid ${pinError?"#e74c3c":"#ddd"}`, borderRadius:10, background:"#fff", fontFamily:"inherit", outline:"none" }} autoFocus />
            {pinError && <div style={{ fontSize:12, color:"#e74c3c" }}>{t.pinError}</div>}
            <button type="submit" style={{ width:"100%", padding:"11px 0", background:"#1a3a2a", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>{t.pinBtn}</button>
          </form>
          <div style={{ marginTop:20, fontSize:11, color:"#bbb" }}>{t.pinDemo}</div>
        </div>
      )}

      {view==="menu" && <CustomerMenu lang={lang} items={items} />}
      {view==="dashboard" && pinUnlocked && <ManagerDashboard lang={lang} items={items} setItems={setItems} />}
    </div>
  );
}
