import { Product } from "../src/types";

export const SEED_PRODUCTS: Product[] = [
  // ==================== HOME & LIVING (10) ====================
  {
    id: "p_hl1",
    name: "Kashmir Organic Merino Throw",
    description: "Undyed pure organic merino wool blanket, handwoven with heavy tassels by mountain mountain weavers.",
    details: "100% Kashmir Merino Wool. Dimension: 150cm x 200cm. Warm cream-white. Chemical-free wash. Soft fringed borders.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 15,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hl1_1", userId: "u2", userName: "Shashank Nuthalapati", rating: 5, comment: "Incredibly cozy and soft, completely authentic feel.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hl2",
    name: "Handmade Teakwood Chai Glass Set",
    description: "Heavy-bottomed traditional cutting glass set housed in durable, seasoned oiled teakwood coasters.",
    details: "Seasoned Burma Teakwood, 4 premium safety glass tumblers (150ml each). Water & heat resistant wax finish.",
    price: 1249,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 22,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hl2_1", userId: "u3", userName: "Aditi Rao", rating: 4, comment: "Beautiful coaster design. The glasses have a very authentic heritage feeling.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hl3",
    name: "Jaipur Hand-Block Printed Quilt",
    description: "Sumptuous cotton mulmul quilt filled with hand-carded cotton, featuring classic floral motifs by Sanganer block printers.",
    details: "Material: 100% Cotton Mulmul shell, pure cotton batting. Double size (220cm x 270cm). Gentle handwash recommended.",
    price: 5800,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 12,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hl3_1", userId: "u4", userName: "Neha Sen", rating: 5, comment: "Lightweight yet surprisingly warm. The indigo hand-printing is pristine.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hl4",
    name: "Organic Jute Hand-Braid Rug",
    description: "Reversible golden jute area mat meticulously braided by local village artisans using natural robust hemp fibres.",
    details: "100% Bleach-free Jute. Diameter: 120cm round. Naturally non-slip, rustic texture, perfect for bedside or entryways.",
    price: 3400,
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 18,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hl5",
    name: "Burnished Pure Brass Serving Flatware",
    description: "Heirloom-grade heavy brass spoons and forks complete with a subtle rustic textured hammer finish.",
    details: "Solid Brass metal composition. Set of 4 (2 soup spoons, 2 primary forks). Safe Lead-free metal alloy.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1543510473-ac2c35329a28?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 25,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hl6",
    name: "Himalayan Hemp Coarse Table Runner",
    description: "Earthy, linen-like organic table overlay carrying subtle slate-grey striped hand-weave detailing.",
    details: "80% Wild Himalayan Hemp, 20% Organic Cotton. Size: 180cm x 35cm. Durable construction, softens beautifully with age.",
    price: 950,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 30,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hl7",
    name: "Jaipur Blue Pottery Coaster Suite",
    description: "Vibrant glazed blue quartz stoneware coasters detailed with hand-painted Persian rosette patterns.",
    details: "Crafted from Quartz powder, raw glass powder, and gum clay. Semi-fragile high-heat glaze. Set of 6 with cork backing.",
    price: 799,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 40,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hl7_1", userId: "u5", userName: "Vikram Malhotra", rating: 5, comment: "An absolute visual joy. These look premium on my marble coffee table.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hl8",
    name: "Seasoned Neem Salad Server Spoons",
    description: "Sleek, antibacterial salad service forks shaped from premium natural neem logs.",
    details: "100% Solid Indian Neem wood. Length: 25cm. Finished with food-grade cold-pressed linseed oils.",
    price: 650,
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 19,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hl9",
    name: "Bengal Handloomed Cotton Hammock",
    description: "Tough braided cotton cordage suspension swing with support rails in raw ash wood.",
    details: "Spun organic dual-layer cotton canvas. Load capacity: 150kg. Includes steel mounting hooks.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 8,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hl10",
    name: "Terracotta Natural Water Carafe",
    description: "Porous red clay flask designed to naturally cool drinking water through surface evaporation processes.",
    details: "Traditional porous clay. Vol: 1.5 Litres. Includes matching clay stopper and coaster plate.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1527451558223-997577555890?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    stock: 14,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },

  // ==================== WELLNESS (10) ====================
  {
    id: "p_wl1",
    name: "Monsoon Rain Therapeutic Mist",
    description: "An evocative space and linen aerosol carrying the scent of parched earth after rain (petrichor) and premium vetiver.",
    details: "Organic sugarcane distillate, vetiver root oil, sandalwood extract, purified spring water. Volume: 100ml. Amber glass spray vial.",
    price: 1150,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 35,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_wl1_1", userId: "u2", userName: "Shashank Nuthalapati", rating: 5, comment: "Smells exactly like high-quality wet summer soils. Incredible.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_wl2",
    name: "Kodaikanal Moss Soy Candle",
    description: "Hand-poured wellness candle featuring a dual wood wick scented with wet cypress and pine needles.",
    details: "100% natural, pollutant-free soy wax. Dual rustic wooden wick. Burning performance: 48 Hrs. Vol: 220ml.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1602872030279-3738cf38a8f1?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 24,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl3",
    name: "Pure Copper Ayurvedic Water Flask",
    description: "Hammered solid copper water bottle crafted to naturally alkalize water overnight.",
    details: "99.9% Pure Food-Grade Copper. Leakproof silicon washer. Vol: 950ml. Fine hand-lacquered exterior gloss.",
    price: 1699,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 28,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_wl3_1", userId: "u6", userName: "Rohit Verma", rating: 5, comment: "Superb copper quality. Sturdy and gives water a very pleasant metallic clean taste.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_wl4",
    name: "Cold-Pressed Sweet Almond Herbal Oil",
    description: "Nourishing, unbleached almond oil infused with traditional calming lavender extracts.",
    details: "Prunus Dulcis oil, cold-processed. No mineral oils, Parabens, or synthetic perfumes. Safe for skin and hair. Vol: 200ml.",
    price: 850,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 32,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl5",
    name: "Organic Holy Basil Tulsi Tincture",
    description: "Pure adaptogenic liquid drops synthesized from triple-macerated green Rama Tulsi leaves.",
    details: "Extract of Ocimum Sanctum. 100% USDA Certified Organic. Dilute 5-10 drops in water daily. Vol: 50ml glass dropper.",
    price: 650,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 50,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl6",
    name: "Authentic Kansa Wand Face Massager",
    description: "Traditional Ayurvedic facial toning wand made with a wooden handle and a dome of sacred bronze.",
    details: "Hand-turned Sheesham wood handle, pure Kansa alloy dome (78% copper, 22% tin). Balances skin pH naturally.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 15,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_wl6_1", userId: "u12", userName: "Meera Nair", rating: 5, comment: "Superb ritual wand, draws out impurities instantly! Best addition to my routine.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_wl7",
    name: "Rose Quartz Smooth Facial Roller",
    description: "Double-sided premium facial roller designed to soothe inflammation and encourage lymphatic drainage.",
    details: "100% Madagascar Rose Quartz, solid brass gold-plated noise-free brackets. Large and small stones for facial contours.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 20,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl8",
    name: "Organic Vetiver Root Back Scrubber",
    description: "A aromatic, natural mesh washcloth woven from earthy vetiver roots for gentle dermis exfoliation.",
    details: "100% Wild Grass Vetiver roots (Khus). Earthy dry scent activated when dampened. Hanging string loop included.",
    price: 450,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 40,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl9",
    name: "Ayurvedic Pink Bath Salts with Rose petals",
    description: "A luxurious detoxicant salt soak blended with pure Epsom salts, pink rock salt, and dried roseheads.",
    details: "Ingredients: Himalayan saline crystals, magnesium sulphate, pure damask rose essential oil. Volume: 400g glass jar.",
    price: 799,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 25,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_wl10",
    name: "Ladakh Hand-Beaten Singing Bowl",
    description: "Authentic, heavy-alloy meditation bowl crafted through multiple rounds of thermal hand-forging.",
    details: "Seven-metal bell alloy including copper and silver. Diameter: 12cm. Includes wooden striker rod and silk velvet cushion.",
    price: 3800,
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 10,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_wl10_1", userId: "u7", userName: "Anjali Gupta", rating: 5, comment: "Deep, soothing resonant frequencies that last for several minutes. Pure peace.", createdAt: new Date().toISOString() }
    ]
  },

  // ==================== TEA & SPICE (10) ====================
  {
    id: "p_ts1",
    name: "Wild Lavender Nilgiri White Tea",
    description: "First-flush silver needle bud tea leaves, shade-cured with mountain-grown organic lavender blossoms.",
    details: "Silver-needle green/white buds, organic blue lavender petals. Whole-bract loose leaf. Low-caffeine. Net weight: 75g canister.",
    price: 950,
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 35,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts2",
    name: "Saffron Cardamom Single Estate Assam",
    description: "High-grade loose black tea leaves combined with broken green cardamom pods and Kashmiri saffron slivers.",
    details: "Estate Premium Assam CTC and SFTGFOP. Robust, malty profile, natural spices. Can be brewed with milk. Net wt: 200g.",
    price: 650,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 30,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts3",
    name: "Artisanal Kashmiri Saffron Kahwa",
    description: "Fragrant green tea recipe featuring crushed whole almonds, cinnamon bark, cardamom, and luxurious saffron threads.",
    details: "Premix dry loose ingredients. Just add raw honey or sugar to hot steeps. Low tannin, highly antioxidant. Net wt: 120g.",
    price: 899,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 25,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_ts3_1", userId: "u5", userName: "Vikram Malhotra", rating: 5, comment: "Spectacular aroma. The richness of raw saffron is evident in the golden color.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_ts4",
    name: "Organic Alleppey Green Cardamom Pods",
    description: "Unbleached, sun-cured giant green cardamoms carrying exceptionally high essential oil yields.",
    details: "Grade standard: 8mm bold green seeds. Hand-harvested in Kerala. No synthetic pesticides. Weight: 100g.",
    price: 450,
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 40,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts5",
    name: "Single-Origin Tellicherry Black Pepper",
    description: "Vine-ripened bold peppercorns featuring intense woody warmth paired with clean citric back-notes.",
    details: "TGSEB (Tellicherry Garbled Special Extra Bold). Premium culinary grade. Great for hand grinders. Weight: 150g.",
    price: 380,
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 45,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts6",
    name: "Darjeeling Champagne Rare Oolong",
    description: "Finely oxidized spring oolong tea with fruity muscatel characteristics and clean golden color.",
    details: "Hand-rolled leaves, Single Estate. Grade: Second flush premium. Steeping recommendation: 85°C for 3 mins. Net: 80g.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 20,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts7",
    name: "Coorg Roasted Peaberry Coffee Beans",
    description: "Whole-bean peaberry arabica and canephora coffee shade-grown under pepper vines in Karnataka.",
    details: "Roast degree: Medium-Dark. Intensely rich, chocolatey finish, low acidity. Shipped in valved Kraft bags. Net wt: 250g.",
    price: 750,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 22,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts8",
    name: "Organic Lakadong High-Curcumin Turmeric",
    description: "Rare golden root powder containing an extraordinary 7.5% curcumin yield, sourced from Meghalaya.",
    details: "100% pure Lakadong turmeric. Chemical-free, unadulterated. High aroma and immune-boosting properties. Weight: 200g.",
    price: 299,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 60,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts9",
    name: "Wayanad Sweet Star Anise and Bayleaf Set",
    description: "Earthy, aromatic whole spice duo of sweet star anise pods and double-cured cinnamon bayleaves.",
    details: "Includes 50g whole Star Anise and 30g premium Bayleaves. Dried naturally in clean shade sheds in Kerala.",
    price: 349,
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 35,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_ts10",
    name: "Pampa Valley Royal Saffron Thread (Grade I)",
    description: "Finest handpicked Kashmiri red saffron stigmas (Lacha grade) with high color and aroma standards.",
    details: "Crop year: Late 2025. Laboratory tested for pure crocin content. Shipped in an airtight miniature glass and brass jar. Net: 1 gram.",
    price: 650,
    image: "https://images.unsplash.com/photo-1620980481545-92749f75ec19?auto=format&fit=crop&q=80&w=600",
    category: "Tea & Spice",
    stock: 15,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_ts10_1", userId: "u8", userName: "Priyanka Roy", rating: 5, comment: "Incredibly red threads! It blooms into a beautiful warm sunset color in my tea.", createdAt: new Date().toISOString() }
    ]
  },

  // ==================== DECOR (10) ====================
  {
    id: "p_dc1",
    name: "Jaipur Ochre Stoneware Clay Vase",
    description: "Coarsely textured clay vase, thrown by hand on traditional kickwheels using mineral-rich yellow silt clays.",
    details: "Hand-thrown sand clay. Deep ochre matte exterior, food-safe high-firing inner glaze. Size: 22cm x 12cm.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 14,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc2",
    name: "Jaipur Terracotta Incense Tray",
    description: "Architectural, modern linear incense dish hand-molded in heavy reddish terracotta with a sand-blasted finish.",
    details: "Molded natural red clay. Fits sticks, cones, and rope incense. Includes a geometric multi-hole brass incense stand. Length: 14cm.",
    price: 899,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 25,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc3",
    name: "Low-Profile Brass Diya Lamps",
    description: "Three minimalist liquid wax brass lamps styled for clean tablescapes and meditation corners.",
    details: "Set of 3 modular lamps (small, medium, large). Pure hand-spun brass, satin finish. Suitable for castor or sesame oils.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 12,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc4",
    name: "Banarasi Silk Brocade Cushion Shell",
    description: "Intricately woven silk accent cover detailed with pure silver zari work floral creepers.",
    details: "Front: 100% Pure Banarasi Silk Brocade, Back: heavy-weight cotton sailcloth. Concealed YKK zipper. Size: 40cm x 40cm.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 20,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc5",
    name: "Dhokra Lost-Wax Tribal Sculpture",
    description: "Authentic heavy brass tribal figurine handcrafted using ancient lost-wax metal casing practices.",
    details: "Crafted by Bastar artisans out of bell-metal brass alloy via raw beeswax moulds. Highly unique piece. Height: 18cm.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 6,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_dc5_1", userId: "u10", userName: "Pooja Hegde", rating: 5, comment: "Stunning level of detail. It tells a true tribal heritage story.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_dc6",
    name: "Hammered Brass Tealight Lantern Trio",
    description: "Cozy geometric glass and hand-beaten sheet metal hanging lanterns for dim, ambient lighting.",
    details: "Iron sheeting with burnished gold brass electroplate finish. Set of 3 small lanterns. Heat resistant clear glasses.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 18,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc7",
    name: "Kashmir Lacquered Papier-Mache Bowl",
    description: "Durable handmade papier-mache centerpiece bowl decorated with gold floral work.",
    details: "Eco-friendly hard recycled paper pulp. Sealed with multiple coats of food-safe natural clear lacquer. Diam: 20cm.",
    price: 950,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 15,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc8",
    name: "Carved Rosewood Zen Ashbox Trio",
    description: "Detailed hand-carved leaf patterned incense storage box with storage slide-drawer.",
    details: "100% seasoned Indian Rosewood (Sheesham). Beautiful wood grains with brass flower inlay. Length: 30cm.",
    price: 599,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 30,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc9",
    name: "Warli Handpainted Organic Bamboo Pot",
    description: "Tall decorative bamboo cane vase, painstakingly detailed with Maharashtrian geometric tribal art.",
    details: "Sun-cured solid hollow yellow bamboo cane. Matte black organic pigment backdrop. Dry indoor flora display use only.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 10,
    rating: 4.3,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_dc10",
    name: "Multicolor Glazed Pottery Floral Plate",
    description: "Classic blue glaze ceramics decorative wall plate detailed with vibrant yellow and turquoise botanical elements.",
    details: "Stoneware base. Includes heavy-duty spring steel wall hanger attachment on back. Diameter: 26cm.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
    category: "Decor",
    stock: 14,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },

  // ==================== ELECTRONICS (10) ====================
  {
    id: "p_el1",
    name: "Solid Walnut Acoustic Over-Ear Headphones",
    description: "Exquisite studio monitoring headphones with solid walnut wood enclosures, gold-plated connectors, and hand-stitched vegan leather.",
    details: "Frequency response: 18Hz-22kHz. Custom 50mm dynamic neodymium drivers. Impedance: 32 ohms. Premium detachable raw hemp cable and solid carrying drawer case are included.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 10,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_el1_1", userId: "u2", userName: "Shashank Nuthalapati", rating: 5, comment: "Stunning walnut finish and incredibly warm, deep acoustic resonance. High fidelity sound is superb.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_el2",
    name: "Teakwood Retro Bluetooth Speaker",
    description: "Vintage-styled modern desktop soundbar enclosed in solid seasoned Burma teakwood with a warm golden mesh.",
    details: "Amplification output: 20W dual stereo speakers. Bluetooth 5.1 and Aux input support. Micro-USB rechargeable, battery capacity: 4000mAh (up to 12 hours of deep audio).",
    price: 6800,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 15,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_el2_1", userId: "u4", userName: "Neha Sen", rating: 5, comment: "It fits on my study table flawlessly. The vocal clarity is very natural.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_el3",
    name: "Heritage Brass Wireless Charger",
    description: "A fast charging qi-enabled disc spun out of solid heavy brass and finished with a dark forest leather coaster surface.",
    details: "Max charging speed: 15W Qi-Certified output. Includes an elegant braided Type-C cable. Compatible with iOS and Android devices.",
    price: 3400,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 20,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el4",
    name: "Aura Artisan Mechanical Keyboard",
    description: "Compact mechanical keyboard featuring a heavy sand-molded matte aluminium frame, hot-swappable tactile wooden brown switches, and hand-finished cherry profile wooden keycaps.",
    details: "75% space-saving layout. Wired/Wireless dual mode. Double-shot wooden keycaps. Dynamic ambient warm backlighting.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 8,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_el4_1", userId: "u3", userName: "Aditi Rao", rating: 5, comment: "The typing sensation is absolutely tactile and buttery. An unbelievable work of art.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_el5",
    name: "Terracotta Smart Candle Ambient Lamp",
    description: "Smart mood lantern molded out of organic terracotta clay, fitted with a custom warm-spectrum dimmable LED mesh.",
    details: "Compatible with smartphones via smart-home WiFi App control. Adjustable warm temperature: 1800K-3000K. Touch gesture control base. Height: 20cm.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 12,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el6",
    name: "Hand-Turned Teak Wood USB Drive",
    description: "High-speed USB 3.2 solid-state flash drive housed beautifully in hand-carved, resin-sealed teak wood.",
    details: "Storage Capacity: 128GB. Write speed up to 130MB/s. Magnetic wood cap latching system.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 35,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el7",
    name: "Ergonomic Bamboo Wireless Mouse",
    description: "Premium optical wireless mouse made with natural smooth bamboo casing for sweat-free daily use.",
    details: "DPI resolution: 800-1200-1600 adjustable. Wireless range: 10 meters. AA battery powered. Silent, tactile clicks.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1625316708582-7c38734be31d?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 18,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el8",
    name: "Minimalist Brass Wireless Charging Desk Mat",
    description: "Premium dark wool desk liner carrying a built-in brass fast-charging spot on the corner.",
    details: "Dimensions: 80cm x 30cm. 10W integrated charging coil. Thick felt, raw brass metal inlay plate.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 10,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el9",
    name: "Braided Hemp USB-C Charging Cable",
    description: "Ultra-durable, thick-gauge multi-charging cable wrapped in handformed golden-coloured hemp braiding.",
    details: "Length: 1.8 meters. High-density safety copper core supporting up to 60W power transmission and data synchronization.",
    price: 899,
    image: "https://images.unsplash.com/photo-1555538995-7280bd9436bd?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 50,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_el10",
    name: "Amber Warm Filament Vintage Lantern",
    description: "Rechargeable explorer lantern with dynamic dimming warm vertical LED filament tubes inside a sealed cage.",
    details: "Max brightness: 350 lumens. Heavy iron frame base. Type-C charging port. Battery lasts 8-24 hours depending on dim levels.",
    price: 2900,
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    stock: 14,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_el10_1", userId: "u9", userName: "Arun Nair", rating: 5, comment: "Extremely cozy light emission. Perfect for night reading in my balcony.", createdAt: new Date().toISOString() }
    ]
  },

  // ==================== HEALTH (10) ====================
  {
    id: "p_he1",
    name: "Ashwagandha Premium Organic Root Powder",
    description: "Pure powdered adaptogen roots carrying a standard high concentration of natural calming compounds.",
    details: "100% Organic Withania Somnifera root. Vegan, gluten-free, zero fillers. Take 1 tsp daily in warm milk. Weight: 150g.",
    price: 550,
    image: "https://images.unsplash.com/photo-1615485290443-e1a722488ef0?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 45,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he2",
    name: "Pure Himalayan Forest Shilajit Resin",
    description: "Authentic, sun-dried natural mountain tar containing over 85 trace minerals and high fulvic acid content.",
    details: "Ethically hand-gathered from High-Himalayan cliffs (above 16,000 ft). Purified with rainwater. Shipped with standard brass spoon. Weight: 20g.",
    price: 2490,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 22,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_he2_1", userId: "u5", userName: "Vikram Malhotra", rating: 5, comment: "True energy enhancer. Dissolving a small pea-sized amount in water provides clean physical stamina.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_he3",
    name: "Neem Wood Hand-Carved Scalp Combs",
    description: "Set of two coarse & fine hair combs shaped from seasoned antiseptic neem wood logs.",
    details: "100% natural Neem timber. Dual-spacing detangling teeth. Prevents scalp dandruff and static damage while combing.",
    price: 399,
    image: "https://images.unsplash.com/photo-1590156546746-c22408b63457?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 40,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he4",
    name: "Amla & Brahmi Scalp Revitalizer Oil",
    description: "A nourishing botanical scalp formulation filled with fresh gooseberry and bacopa monnieri extracts.",
    details: "Base: cold-pressed black sesame oil. No synthetic fragrances or Silicones. Helps sleep patterns. Volume: 200ml.",
    price: 790,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 30,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he5",
    name: "Organic Wheatgrass Alkalizing Juice Powder",
    description: "Freshly harvested, freeze-dried organic green wheatgrass blade concentrate.",
    details: "Non-GMO certified green shoot concentrate. Extremely rich in natural chlorophyll, amino acids and vitamins. Weight: 100g.",
    price: 450,
    image: "https://images.unsplash.com/photo-1610970881699-44a55b4cfd87?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 35,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he6",
    name: "Triphala Organic Cleansing Infusion",
    description: "Ancient digestive wellness tablet blend containing dried Amla, Bibhitaki, and Haritaki fruits.",
    details: "Contains 120 pure organic capsules. Clinically proven colon detoxifier and natural metabolic aid.",
    price: 350,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 55,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he7",
    name: "Organic Shatavari Vitalizing Powder",
    description: "Premium wellness adaptogen containing ground Asparagus Racemosus roots.",
    details: "100% natural, certified organic. Supports hormonal balance and systemic vitality. Resealable glass bottle: 120g.",
    price: 590,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 25,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he8",
    name: "Organic Moringa Green Nutrient Powder",
    description: "Rich, shade-dried ground drumstick tree leaves (Moringa Oleifera) filled with natural calcium and protein complexes.",
    details: "Rich green, unheated nutrient preservation. Add 1 tbsp daily to breakfast smoothies or grain batters. Weight: 250g.",
    price: 420,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 50,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he9",
    name: "Virgin Cold-Processed Coconut Elixir Oil",
    description: "Pure white kernel coconut oil pressed without heat to retain organic healthy medium-chain fats.",
    details: "USDA Organic. Exceptional moisture for both ingestion and dermal locks. Non-hydrogenated fat. Volume: 500ml jar.",
    price: 650,
    image: "https://images.unsplash.com/photo-1622484211148-71bfd0a0d91b?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 28,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_he10",
    name: "Himalayan Pink Rock Salt Crystal Lamp",
    description: "Heavy raw block of ancient Himalayan salt crystals hollowed out with an internal warm warm yellow bulb.",
    details: "Carved from premium orange-pink therapeutic salt minerals. Weight: 3.5kg. Mounted on a polished rosewood base plate.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    category: "Wellness",
    stock: 12,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_he10_1", userId: "u11", userName: "Karan Johar", rating: 5, comment: "Emit absolute coziness. It cleans the room air and looks very grounding.", createdAt: new Date().toISOString() }
    ]
  },

  // ==================== BOOKS (10) ====================
  {
    id: "p_bk1",
    name: "The Upanishads: Heirloom Translations",
    description: "A gorgeous luxury hardcover edition carrying selected spiritual dialogues of ancient Vedic seekers.",
    details: "Hardbound with raw organic grey linen fabric. Features classical commentary pages and silk marker threads.",
    price: 850,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 15,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_bk1_1", userId: "u2", userName: "Shashank Nuthalapati", rating: 5, comment: "Beautifully bound edition. The English translation preserves the original sonic depth of the Sanskrit mantras.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_bk2",
    name: "Ayurveda: Traditional Science of Self Healing",
    description: "A comprehensive illustrative reference guidebook mapping body constitutions (doshas) and dietary regimens.",
    details: "Paperback, illustrated with anatomical charts. 180 pages. Written by celebrated clinical practitioners.",
    price: 650,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 25,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk3",
    name: "Traditional Indian Textiles and Patterns",
    description: "An extensive visual collection detailing regional weave styles, organic dye formulas, and historical block-prints.",
    details: "Hardcover collection. Over 250 high-definition photographs from historical museums and private libraries.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 10,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk4",
    name: "Sacred Geography of India's Great Rivers",
    description: "An insightful volume reviewing the myth, cultural rituals, and geological evolution of major waterways.",
    details: "Premium paperback. Includes custom drawn topographic maps and artistic ink illustration plates.",
    price: 799,
    image: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 20,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk5",
    name: "The Story of Indian Spices and Colonial Trade",
    description: "A historical narrative exploring the sea routes, ancient routes, and economic impact of Malabar spices.",
    details: "Paperback edition. 320 pages. Impeccably researched text detailing ancient culinary documents.",
    price: 950,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 15,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk6",
    name: "Indian Architecture Through the Centuries",
    description: "A monumental study detailing the assembly formulas of monolithic cave architecture, brick structures, and stone temples.",
    details: "Large coffee-table hardback book with high-resolution photographic plates and detailed architectural layout plans.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 8,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_bk6_1", userId: "u12", userName: "Meera Nair", rating: 5, comment: "Astonishing study. The structural blueprints of Ellora and Dravidian gopurams are magnificent.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_bk7",
    name: "Patanjali Yoga Sutras Explored Guide",
    description: "An incredibly detailed, verse-by-verse breakdown focusing on spiritual breathing and alignment.",
    details: "Softcover edition. Contains bilingual Sanskrit verses with clear English translations and practice guidance.",
    price: 550,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 30,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk8",
    name: "Forest Bathing and Ayurvedic Daily Rhythms",
    description: "A modern, engaging manual guiding readers to align lifestyle habits with natural lunar cycles.",
    details: "Pocket size paperback printed on recycled pulp using plant-based non-toxic inks. 150 pages.",
    price: 450,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 18,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk9",
    name: "Craftsmanship of Blue Jaipur Glazed Pottery",
    description: "A highly specific, gorgeous volume showcasing the raw mineral ingredients and glaze patterns of Rajasthani ceramic studios.",
    details: "Glazed hardcover edition containing 120 historic color profiles and interviews with master potter families.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 12,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bk10",
    name: "Heritage of Indian Handicrafts and Tribals",
    description: "A scholarly study mapping back-strapped loom systems, clay work, and horn carving styles across tribal regions.",
    details: "Hardbound with raw card borders. Over 300 pages of text with color maps of craft cluster regions across India.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    category: "Books",
    stock: 14,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },

  // ==================== BEAUTY & COSMETICS (10) ====================
  {
    id: "p_bc1",
    name: "Royal Saffron Glow Gentle Face Sand Scrub",
    description: "Gentle exfoliating scrub combining steam-distilled Kashmiri saffron filaments and micro-fine red sandalwood particles.",
    details: "100% Organic ingredients. Sulfate and Paraben-free facial scrub base. Gentle for all skin profiles. Weight: 75g glass tub.",
    price: 890,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 25,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc2",
    name: "Traditional Kumkumadi Radiance Face Elixir",
    description: "Precious Ayurvedic skin serum blended with saffron, blue lotus, and high cold-pressed sesame oil.",
    details: "Authentic formulation detailing classic text recipes. Apply 3-4 drops before bedtime. Vol: 30ml fine bottle.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 18,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_bc2_1", userId: "u2", userName: "Shashank Nuthalapati", rating: 5, comment: "Remarkable radiance. My skin tone feels deeply balanced after using this.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_bc3",
    name: "Royal Rose Water Hydrating Steam Mist",
    description: "Pure facial hydrating toner produced via copper-pot hydro-distillation of fresh damask rose petals.",
    details: "Single-ingredient botanical water. Zero preservatives, alcohol-free. Multi-use cooling body and face mist. Vol: 100ml.",
    price: 450,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 35,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc4",
    name: "Red Sandalwood and Turmeric Glow Mask",
    description: "Ground red sandalwood powder blended with antiseptic saffron turmeric root fibers.",
    details: "Pouring dry powder: Mix with raw honey or rosewater for ideal application consistency. Vol: 100g glass jar.",
    price: 690,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 28,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc5",
    name: "Coconut & Hibiscus Botanical Conditioning Cream",
    description: "Nourishing, chemical-free raw hair conditioner loaded with virgin coconut cream and crushed crimson hibiscus leaves.",
    details: "Restores deep moisture, balances frizzy strands. Safe for color treated locks. Volume: 200ml.",
    price: 750,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 22,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc6",
    name: "Bamboo Charcoal Purifying Face Soap",
    description: "Antitoxic wood charcoal soap bars scented with refreshing cold-pressed tea tree essential oils.",
    details: "Deep cleansing facial bar soap. Base: raw coconut and castor oils. Retains natural moisture. Double bar set (150g).",
    price: 299,
    image: "https://images.unsplash.com/photo-1607006342411-92fc23187aeb?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 45,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc7",
    name: "Tea Tree and Neem Gentle Face Cleanser",
    description: "Natural foaming face fluid formulated with natural soap-nut extract, antiseptic neem oil, and tea tree leaves.",
    details: "Non-stripping skin pH formula. Cruelty free, biodegradable wash formulation. Dispenser bottle: 150ml.",
    price: 550,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 32,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc8",
    name: "Mogra Jasmine Herbal Foaming Body Wash",
    description: "Luxurious moisture body wash infused with highly aromatic steam-distilled Indian jasmine flowers.",
    details: "Formulated with sweet almond and coconut oils to protect moisture boundaries. Phthalate free. Volume: 250ml.",
    price: 650,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 28,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_bc8_1", userId: "u6", userName: "Rohit Verma", rating: 5, comment: "Incredibly uplifting flower scent. Highly therapeutic showering experience.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_bc9",
    name: "Almond Oil and Honey Organic Lip Care",
    description: "Softening botanical lip balm blended with organic forest beeswax, sweet almond, and wild honey.",
    details: "Zero synthetic petrolatum, chemical-free pink sheen. Hydrates lips for over 8 hours. Weight: 10g small pot.",
    price: 250,
    image: "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 50,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_bc10",
    name: "Pure Sojat Henna and Indigo Powder Duo",
    description: "Triple-sifted organic green henna powder (Sojat Rajasthani) paired with dark blue dye-producing indigo powder.",
    details: "100% ground botanical leaf blend. Free of metallic salts and chemical additives. Natural hair coloring kit. 100g each.",
    price: 399,
    image: "https://images.unsplash.com/photo-1590156546746-c22408b63457?auto=format&fit=crop&q=80&w=600",
    category: "Beauty & Cosmetics",
    stock: 30,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },

  // ==================== HANDICRAFTS (10) ====================
  {
    id: "p_hc1",
    name: "Sheesham Hand-Carved Dual Latch Box",
    description: "A gorgeous luxury jewelry chest carved out of high-grade dark Rosewood complete with internal velvet lining.",
    details: "Material: Seasoned Dalbergia Sissoo. Beautiful rich grain patterns with solid heavy brass floral latches. Size: 18cm x 12cm.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 15,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hc1_1", userId: "u10", userName: "Pooja Hegde", rating: 5, comment: "Stunning rosewood carving detail. Holds historical design beauty.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hc2",
    name: "Lacquered Papier-Mache Storage Box",
    description: "Traditional Kashmir storage container finished in highly-detailed floral patterns and hand-polished glossy lacquer.",
    details: "100% handmade recycled wood pulp base. Coated in natural egg-shell sealant and clear tree resin lacquer wrapper.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 20,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hc3",
    name: "Bidriware Silver-Inlaid Steel Pen Holder",
    description: "Authentic, majestic metalware vessel inlaid with pure sheet-silver floral scroll patterns, a classic Karnataka court craft.",
    details: "Base: zinc and copper metal alloy blackened with mud from Bidar fort, then hand-etched with pure 999 silver threads.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 8,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hc3_1", userId: "u3", userName: "Aditi Rao", rating: 5, comment: "An heirloom-grade pen stand. The stark black and glowing silver looks ultra premium.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hc4",
    name: "Dhokra Lost-Wax Bell Hanging Art",
    description: "Raw brass decorative hanging bells modeled by tribal metal-smiths of Chattisgarh.",
    details: "Handmade bell and wire mesh components molded out of lost-wax clay. Deep acoustic bell tone.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 14,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hc5",
    name: "Channapatna Eco Wooden Spinning Tops",
    description: "Nostalgic, handtuned wooden spinning items finished with safe lacquer colors made from turmeric and indigo seed shells.",
    details: "Seasoned Ivory wood (Aale Mara). Safe high-friction mirror burnish polish. Fun, safe, and completely organic play materials.",
    price: 450,
    image: "https://images.unsplash.com/photo-1532330380751-91250f9f1d2b?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 35,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hc6",
    name: "Kutch Mirror Hand-Embroidered Tapestry",
    description: "A gorgeous cotton canvas wall panel loaded with geometric colorful Kutch weaves and embedded tiny mirrors.",
    details: "Completely hand-embroidered by local artisan sisterhoods. Fits 60cm x 90cm frames. Authentic mirror-work borders.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 5,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hc6_1", userId: "u12", userName: "Meera Nair", rating: 5, comment: "Magnificent colors and precise mirror stitches. It breathes organic beauty into my living room wall.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hc7",
    name: "Bengal Ikat Weave Canvas Handbag",
    description: "Sleek, double-woven cotton tote handbag printed using ancient tied-thread warp resist dying methods.",
    details: "Handloomed Ikat cotton fabric, vegan leather handles, steel antique finish metal closures. 3 interior slides.",
    price: 799,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 25,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hc8",
    name: "Taj Mahal Agra Floral Stone Coasters",
    description: "Set of four heavy white marble coasters inlaid with carnelian, lapis, and jasper botanical patterns.",
    details: "Meticulous 'Pietra Dura' stone inlay technique practiced by generational descendants of Mughal Taj builders. Set of 4.",
    price: 2400,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 8,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    reviews: [
      { id: "r_hc8_1", userId: "u8", userName: "Priyanka Roy", rating: 5, comment: "Astonishingly smooth marble. The precision of the mini stone petal shapes is spectacular.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "p_hc9",
    name: "Bastar Terracotta Bankura horse Figurine",
    description: "Elegant, tall necked terracotta guardian horse molded by regional pottery families in Bengal clay clusters.",
    details: "Sun-cured, traditionally wood-fired red earthenware clay. Height: 35cm. Highly collectable folk-craft shape.",
    price: 1350,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 12,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: "p_hc10",
    name: "Handloomed Bamboo Cane Slat Baskets",
    description: "Set of two sturdy natural brown split bamboo cane baskets perfect for clean bath storage.",
    details: "100% split seasoned forest bamboo. Treated with safe organic neem shield to prevent insect or water damage.",
    price: 1150,
    image: "https://images.unsplash.com/photo-1590736912386-beac5df178f8?auto=format&fit=crop&q=80&w=600",
    category: "Handicrafts",
    stock: 16,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    reviews: []
  }
];
