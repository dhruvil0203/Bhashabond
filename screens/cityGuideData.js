// Curated dataset of famous foods and famous places for each city.
// Used in the Phrasebook Foods & Travel guides.
// Exactly 10 food items and 10 travel places for each destination.

export const CITY_GUIDE_DATA = {
  Mumbai: {
    foods: [
            {
        name: "Vada Pav",
        localName: "वडा पाव",
        pronunciation: "Vada Pav",
        description: "A spiced potato fritter (vada) sandwiched in a bread roll (pav), served with chutneys. Often called Mumbai's favourite street food.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/500px-Vada_Pav-Indian_street_food.JPG"
            },
            {
        name: "Pav Bhaji",
        localName: "पाव भाजी",
        pronunciation: "Pav Bha-ji",
        description: "A thick spiced vegetable mash served with buttered bread rolls, garnished with onions, lemon, and coriander.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bambayya_Pav_bhaji.jpg/500px-Bambayya_Pav_bhaji.jpg"
            },
            {
        name: "Bhel Puri",
        localName: "भेळ पुरी",
        pronunciation: "Bhel Pu-ri",
        description: "A crunchy chaat made with puffed rice, sev, vegetables, tamarind, and green chutneys — a classic Mumbai beach snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Behael_Puri_%286105489342%29.jpg/500px-Behael_Puri_%286105489342%29.jpg"
            },
            {
        name: "Misal Pav",
        localName: "मिसळ पाव",
        pronunciation: "Mi-sal Pav",
        description: "Sprouted moth beans curry cooked with spicy masala, topped with farsan and served with bread rolls.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kolhapuri_Misal_Pav.jpg/500px-Kolhapuri_Misal_Pav.jpg"
            },
            {
        name: "Bombay Sandwich",
        localName: "बॉम्बे सँडविच",
        pronunciation: "Bombay Sand-wich",
        description: "A triple-decker toasted sandwich layered with chutney, cheese, and vegetables, a staple of Mumbai street corners.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bombay_cheese_sandwich.jpg/500px-Bombay_cheese_sandwich.jpg"
            },
            {
        name: "Keema Pav",
        localName: "कीमा पाव",
        pronunciation: "Kee-ma Pav",
        description: "Minced meat cooked with spices and served with soft buttered pav, a beloved non-vegetarian street dish in Mumbai.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sausage_making-H-1.jpg/500px-Sausage_making-H-1.jpg"
            },
            {
        name: "Modak",
        localName: "मोदक",
        pronunciation: "Mo-dak",
        description: "A steamed sweet dumpling made from rice flour filled with jaggery and coconut, traditionally associated with Ganesh Chaturthi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ukadiche_Modak_%28Rice%29.jpg/500px-Ukadiche_Modak_%28Rice%29.jpg"
            },
            {
        name: "Pani Puri",
        localName: "पाणी पुरी",
        pronunciation: "Pa-ni Pu-ri",
        description: "Hollow crispy spheres filled with spiced potato and dipped in tangy tamarind water, a ubiquitous Mumbai chaat favourite.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/500px-Pani_Puri1.JPG"
            },
            {
        name: "Thalipeeth",
        localName: "थालीपीठ",
        pronunciation: "Tha-li-peeth",
        description: "A savoury multigrain flatbread made with besan, rice flour, and spices, a wholesome Maharashtrian breakfast staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Maharashtrian_Thalipith_-_1.jpg/500px-Maharashtrian_Thalipith_-_1.jpg"
            },
            {
        name: "Puran Poli",
        localName: "पुरण पोळी",
        pronunciation: "Pu-ran Po-li",
        description: "A sweet flatbread stuffed with chana dal and jaggery filling, popular during festivals in Maharashtra.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Puran_Poli.jpg/500px-Puran_Poli.jpg"
            }
        ],
    places: [
            {
        name: "Gateway of India",
        localName: "गेटवे ऑफ इंडिया",
        pronunciation: "Gate-way of In-dia",
        description: "An iconic arch monument built in 1924 on the Apollo Bunder waterfront, overlooking the Arabian Sea.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/500px-Mumbai_03-2016_30_Gateway_of_India.jpg"
            },
            {
        name: "Marine Drive",
        localName: "मरीन ड्राइव्ह",
        pronunciation: "Ma-rine Drive",
        description: "A 3.6 km curved boulevard along the coast, known as the 'Queen's Necklace' when lit up at night.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg/500px-Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg"
            },
            {
        name: "Elephanta Caves",
        localName: "घारापुरीची लेणी",
        pronunciation: "El-e-phanta Caves",
        description: "A UNESCO World Heritage Site featuring rock-cut cave temples dedicated to Lord Shiva, located on an island near Mumbai.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Elephanta_Caves_Trimurti.jpg/500px-Elephanta_Caves_Trimurti.jpg"
            },
            {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        localName: "छत्रपती शिवाजी महाराज टर्मिनस",
        pronunciation: "Chha-tra-pa-ti Shi-va-ji Terminus",
        description: "A UNESCO World Heritage railway station built in 1887, an outstanding example of Victorian Gothic architecture.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chhatrapati_shivaji_terminus%2C_esterno_01.jpg/500px-Chhatrapati_shivaji_terminus%2C_esterno_01.jpg"
            },
            {
        name: "Juhu Beach",
        localName: "जुहू बीच",
        pronunciation: "Ju-hu Beach",
        description: "Mumbai's most popular beach known for its street food stalls, sunset views, and lively atmosphere.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Juhu_beach_%28Arial%29.jpg/500px-Juhu_beach_%28Arial%29.jpg"
            },
            {
        name: "Haji Ali Dargah",
        localName: "हाजी अली दर्गाह",
        pronunciation: "Ha-ji A-li Dar-gah",
        description: "A revered mosque and tomb of Muslim saint Haji Ali Shah Bukhari, situated on an islet in the Arabian Sea.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mumbai_03-2016_12_Haji_Ali_Dargah.jpg/500px-Mumbai_03-2016_12_Haji_Ali_Dargah.jpg"
            },
            {
        name: "Siddhivinayak Temple",
        localName: "सिद्धिविनायक मंदिर",
        pronunciation: "Sid-dhi-vi-nay-ak Temple",
        description: "One of Mumbai's most visited Hindu temples dedicated to Lord Ganesha, attracting thousands of devotees daily.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Shree_Siddhivinayak_Temple_Mumbai.jpg/500px-Shree_Siddhivinayak_Temple_Mumbai.jpg"
            },
            {
        name: "Colaba Causeway",
        localName: "कुलाबा कॉजवे",
        pronunciation: "Co-la-ba Cause-way",
        description: "A vibrant market street famous for antiques, street shopping, cafes, and colonial-era architecture.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Colaba_Causeway_-_panoramio_%282%29.jpg/500px-Colaba_Causeway_-_panoramio_%282%29.jpg"
            },
            {
        name: "Sanjay Gandhi National Park",
        localName: "संजय गांधी राष्ट्रीय उद्यान",
        pronunciation: "San-jay Gan-dhi Na-tion-al Park",
        description: "A sprawling forested national park within Mumbai featuring leopards, Kanheri Caves, and a mini train safari.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/SGNP-Bombay.jpg/500px-SGNP-Bombay.jpg"
            },
            {
        name: "Bandra-Worli Sea Link",
        localName: "वांद्रे-वरळी सागरी सेतू",
        pronunciation: "Ban-dra Wor-li Sea Link",
        description: "A modern cable-stayed bridge spanning 5.6 km across Mahim Bay, dramatically reducing travel time across Mumbai.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bandra%E2%80%93Worli_Sea_Link.jpg/500px-Bandra%E2%80%93Worli_Sea_Link.jpg"
            }
        ]
    },

  Delhi: {
    foods: [
            {
        name: "Chole Bhature",
        localName: "छोले भटूरे",
        pronunciation: "Cho-le Bha-tu-re",
        description: "Spicy chickpea curry served with large, fluffy fried leavened bread — a quintessential Delhi breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/500px-Chole_Bhature_from_Nagpur.JPG"
            },
            {
        name: "Butter Chicken",
        localName: "बटर चिकन",
        pronunciation: "But-ter Chi-cken",
        description: "Tender chicken cooked in a rich, creamy tomato-based sauce, a dish said to have been invented in Delhi's Moti Mahal restaurant.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/500px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg"
            },
            {
        name: "Paratha",
        localName: "पराठा",
        pronunciation: "Pa-ra-tha",
        description: "Flaky whole wheat flatbread stuffed with potatoes, paneer, or vegetables, best enjoyed at Old Delhi's Paranthe Wali Gali.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/500px-Triangle_paratha_%28cropped%29.JPG"
            },
            {
        name: "Nihari",
        localName: "निहारी",
        pronunciation: "Ni-ha-ri",
        description: "A slow-cooked meat stew with aromatic spices, originally a Mughal royal breakfast now iconic in Old Delhi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nalli_Nihari_India.jpg/500px-Nalli_Nihari_India.jpg"
            },
            {
        name: "Dahi Bhalle",
        localName: "दही भल्ले",
        pronunciation: "Da-hi Bhal-le",
        description: "Soft lentil dumplings soaked in yoghurt and topped with chutneys and chaat masala, a popular Delhi street food.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG/500px-Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG"
            },
            {
        name: "Kebab",
        localName: "कबाब",
        pronunciation: "Ke-bab",
        description: "Seekh and galouti kebabs from Old Delhi's Jama Masjid area are legendary — minced meat spiced and grilled to perfection.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lula_kebab_2.jpg/500px-Lula_kebab_2.jpg"
            },
            {
        name: "Aloo Tikki",
        localName: "आलू टिक्की",
        pronunciation: "A-loo Tik-ki",
        description: "Crispy fried spiced potato patties served with chutneys, a staple evening snack from Delhi's street food stalls.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/500px-Aloo_Tikki_served_with_chutneys.jpg"
            },
            {
        name: "Biryani",
        localName: "बिरयानी",
        pronunciation: "Bi-rya-ni",
        description: "Fragrant long-grain rice cooked with marinated meat and whole spices; Delhi's variant has Mughal royal origins.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg"
            },
            {
        name: "Kulfi",
        localName: "कुल्फी",
        pronunciation: "Kul-fi",
        description: "A dense, slow-frozen Indian ice cream made with thickened milk, rose water, and pistachios, served on a stick.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Matka_kulfi.jpg/500px-Matka_kulfi.jpg"
            },
            {
        name: "Jalebi",
        localName: "जलेबी",
        pronunciation: "Ja-le-bi",
        description: "Crispy pretzel-shaped deep-fried batter soaked in sugar syrup, often eaten hot for breakfast or as a dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/500px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg"
            }
        ],
    places: [
            {
        name: "India Gate",
        localName: "इण्डिया गेट",
        pronunciation: "In-dia Gate",
        description: "A war memorial arch dedicated to soldiers of World War I, surrounded by lush lawns and an eternal flame.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/India_Gate_%28All_India_War_Memorial%29.jpg/500px-India_Gate_%28All_India_War_Memorial%29.jpg"
            },
            {
        name: "Red Fort",
        localName: "लाल किला",
        pronunciation: "Lal Ki-la",
        description: "A UNESCO World Heritage Site and massive red sandstone Mughal fort from 1648, from where India's PM addresses the nation on Independence Day.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/500px-Delhi_fort.jpg"
            },
            {
        name: "Qutub Minar",
        localName: "क़ुतुब मीनार",
        pronunciation: "Qu-tub Mi-nar",
        description: "A UNESCO-listed 73-metre tall minaret built in 1193, the tallest brick minaret in the world.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/500px-Qutb_Minar_2022.jpg"
            },
            {
        name: "Humayun's Tomb",
        localName: "हुमायूँ का मकबरा",
        pronunciation: "Hu-ma-yun's Tomb",
        description: "A stunning Mughal garden tomb built in 1570, a UNESCO World Heritage Site that inspired the Taj Mahal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tomb_of_Humayun%2C_Delhi.jpg/500px-Tomb_of_Humayun%2C_Delhi.jpg"
            },
            {
        name: "Lotus Temple",
        localName: "कमल मंदिर",
        pronunciation: "Lo-tus Tem-ple",
        description: "An award-winning Bahá'í House of Worship shaped like a blooming lotus flower, open to people of all religions.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/LotusDelhi.jpg/500px-LotusDelhi.jpg"
            },
            {
        name: "Chandni Chowk",
        localName: "चांदनी चौक",
        pronunciation: "Chan-dni Chowk",
        description: "One of Asia's oldest and busiest markets in Old Delhi, a labyrinth of lanes selling spices, textiles, jewellery, and street food.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gurudwara_Sisganj_Sahib_Chandni_Chowk_19.jpg/500px-Gurudwara_Sisganj_Sahib_Chandni_Chowk_19.jpg"
            },
            {
        name: "Akshardham Temple",
        localName: "अक्षरधाम मंदिर",
        pronunciation: "Ak-shar-dham Tem-ple",
        description: "A magnificent Hindu temple complex with intricately carved stone architecture, exhibitions, and a musical fountain.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Swaminarayan_Akshardham%2C_Delhi.jpg/500px-Swaminarayan_Akshardham%2C_Delhi.jpg"
            },
            {
        name: "Jama Masjid",
        localName: "जामा मस्जिद",
        pronunciation: "Ja-ma Mas-jid",
        description: "India's largest mosque, built by Mughal Emperor Shah Jahan in 1656, accommodating up to 25,000 worshippers.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jama_Masjid_-_In_the_Noon.jpg/500px-Jama_Masjid_-_In_the_Noon.jpg"
            },
            {
        name: "Connaught Place",
        localName: "कनॉट प्लेस",
        pronunciation: "Con-naught Place",
        description: "Delhi's grand circular Georgian-style commercial hub lined with shops, restaurants, and colonial colonnaded buildings.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Skyline_at_Rajiv_Chowk.JPG/500px-Skyline_at_Rajiv_Chowk.JPG"
            },
            {
        name: "Lodi Garden",
        localName: "लोदी गार्डन",
        pronunciation: "Lo-di Gar-den",
        description: "A serene 90-acre park dotted with 15th-century Lodi dynasty tombs, popular for morning walks and picnics.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Lodhi_Gardens_on_a_sunny_day.jpg/500px-Lodhi_Gardens_on_a_sunny_day.jpg"
            }
        ]
    },

  Bengaluru: {
    foods: [
            {
        name: "Masala Dosa",
        localName: "ಮಸಾಲೆ ದೋಸೆ",
        pronunciation: "Ma-sa-le Do-se",
        description: "A thin crispy rice and lentil crepe stuffed with spiced mashed potato, served with sambar and chutneys.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rameshwaram_Cafe_Dosa.jpg/500px-Rameshwaram_Cafe_Dosa.jpg"
            },
            {
        name: "Idli Vada",
        localName: "ಇಡ್ಲಿ ವಡೆ",
        pronunciation: "Id-li Va-de",
        description: "Steamed rice cakes and crispy lentil doughnuts served with coconut chutney and sambar, a classic South Indian breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/500px-Idli_Sambar.JPG"
            },
            {
        name: "Ragi Mudde",
        localName: "ರಾಗಿ ಮುದ್ದೆ",
        pronunciation: "Ra-gi Mud-de",
        description: "Dense finger millet balls typically eaten with saaru (rasam) or curry, a nutritious traditional Kannadiga staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/RAGI_MUDDE.JPG/500px-RAGI_MUDDE.JPG"
            },
            {
        name: "Bisi Bele Bath",
        localName: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
        pronunciation: "Bi-si Be-le Bath",
        description: "A hot Karnataka porridge of rice, lentils, and tamarind cooked with a special spice powder and topped with ghee.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bisi_Bele_Bath_%28Bisibelebath%29.JPG/500px-Bisi_Bele_Bath_%28Bisibelebath%29.JPG"
            },
            {
        name: "Akki Rotti",
        localName: "ಅಕ್ಕಿ ರೊಟ್ಟಿ",
        pronunciation: "Ak-ki Rot-ti",
        description: "A flatbread made from rice flour mixed with herbs, onions, and coconut — a beloved Kannadiga breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/%E0%B2%85%E0%B2%95%E0%B3%8D%E0%B2%95%E0%B2%BF_%E0%B2%B0%E0%B3%8A%E0%B2%9F%E0%B3%8D%E0%B2%9F%E0%B2%BF_.jpg/500px-%E0%B2%85%E0%B2%95%E0%B3%8D%E0%B2%95%E0%B2%BF_%E0%B2%B0%E0%B3%8A%E0%B2%9F%E0%B3%8D%E0%B2%9F%E0%B2%BF_.jpg"
            },
            {
        name: "Neer Dosa",
        localName: "ನೀರ್ ದೋಸೆ",
        pronunciation: "Neer Do-se",
        description: "Delicate paper-thin crepes made from a watery rice batter, soft and mild, served with coconut chutney or chicken curry.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Neer-dosa.jpg/500px-Neer-dosa.jpg"
            },
            {
        name: "Kesari Bath",
        localName: "ಕೇಸರಿ ಬಾತ್",
        pronunciation: "Ke-sa-ri Bath",
        description: "A sweet semolina pudding made with ghee, saffron, cashews, and raisins, a popular Bengaluru breakfast dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Rava_Kesari_hone_made.jpg/500px-Rava_Kesari_hone_made.jpg"
            },
            {
        name: "Udupi Sambar",
        localName: "ಉಡುಪಿ ಸಾಂಬಾರ್",
        pronunciation: "U-du-pi Sam-bar",
        description: "A tangy and mildly spiced lentil and vegetable stew unique to Udupi-style restaurants abundant in Bengaluru.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Sambar_Vadai_-_Vel_South_Indian_Kitchen_%2B_Bar_2023-07-09.jpg/500px-Sambar_Vadai_-_Vel_South_Indian_Kitchen_%2B_Bar_2023-07-09.jpg"
            },
            {
        name: "Mangalore Buns",
        localName: "ಮಂಗಳೂರು ಬನ್ಸ್",
        pronunciation: "Man-ga-lore Buns",
        description: "Slightly sweet deep-fried puris made from mashed banana and refined flour, a coastal Karnataka breakfast specialty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Buns%2C_a_breakfast_delicacy_of_Mangalore_and_Coastal_Karnataka_at_Goa.jpg/500px-Buns%2C_a_breakfast_delicacy_of_Mangalore_and_Coastal_Karnataka_at_Goa.jpg"
            },
            {
        name: "Mysore Pak",
        localName: "ಮೈಸೂರು ಪಾಕ್",
        pronunciation: "My-so-re Pak",
        description: "A rich fudge-like sweet made from generous amounts of ghee, sugar, and gram flour, originating from the Mysore royal kitchen.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mysore_pak.jpg/500px-Mysore_pak.jpg"
            }
        ],
    places: [
            {
        name: "Lalbagh Botanical Garden",
        localName: "ಲಾಲ್ಬಾಗ್ ಉದ್ಯಾನ",
        pronunciation: "Lal-bagh Bo-tani-cal Garden",
        description: "A 240-acre botanical garden founded in the 18th century, home to rare plants, a 3000-million-year-old rock, and a famous glasshouse.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg/500px-Glasshouse_and_fountain_at_lalbagh.jpg"
            },
            {
        name: "Bangalore Palace",
        localName: "ಬೆಂಗಳೂರು ಅರಮನೆ",
        pronunciation: "Ban-ga-lore Pal-ace",
        description: "A magnificent Tudor-style palace built in 1887 modelled after Windsor Castle, adorned with ornate wood carvings.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bangalore_Mysore_Maharaja_Palace.jpg/500px-Bangalore_Mysore_Maharaja_Palace.jpg"
            },
            {
        name: "Cubbon Park",
        localName: "ಕಬ್ಬನ್ ಉದ್ಯಾನ",
        pronunciation: "Cub-bon Park",
        description: "A sprawling 300-acre green lung in the heart of Bengaluru, housing government buildings and heritage statues.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Cubbon_Park_W.jpg/500px-Cubbon_Park_W.jpg"
            },
            {
        name: "Tipu Sultan's Summer Palace",
        localName: "ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಅರಮನೆ",
        pronunciation: "Ti-pu Sul-tan's Summer Pal-ace",
        description: "An exquisite 18th-century Indo-Islamic wooden palace with intricate columns and frescoes, built for the Mysore sultan.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tippu_Sultan%27s_Summer_palace.jpg/500px-Tippu_Sultan%27s_Summer_palace.jpg"
            },
            {
        name: "ISKCON Temple Bengaluru",
        localName: "ಇಸ್ಕಾನ್ ದೇವಾಲಯ",
        pronunciation: "IS-KON Tem-ple",
        description: "One of the world's largest ISKCON temples, an architecturally grand Hare Krishna temple on Hare Krishna Hill.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/ISKCON_Banglaore_Temple.jpg/500px-ISKCON_Banglaore_Temple.jpg"
            },
            {
        name: "Vidhana Soudha",
        localName: "ವಿಧಾನ ಸೌಧ",
        pronunciation: "Vi-dha-na Sou-dha",
        description: "Bengaluru's imposing seat of state legislature, a landmark Dravidian-style granite building from 1956.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Vidhana_Soudha_2012.jpg/500px-Vidhana_Soudha_2012.jpg"
            },
            {
        name: "Bannerghatta National Park",
        localName: "ಬನ್ನೇರುಘಟ್ಟ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ",
        pronunciation: "Ban-ner-ghat-ta Na-tion-al Park",
        description: "A forest reserve on Bengaluru's outskirts offering safari rides to see tigers, lions, bears, and elephants.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lurking_tiger.jpg/500px-Lurking_tiger.jpg"
            },
            {
        name: "UB City Mall",
        localName: "ಯುಬಿ ಸಿಟಿ",
        pronunciation: "U B City",
        description: "A luxury mall and commercial hub in central Bengaluru known for upscale retail, fine dining, and art exhibitions.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/UBtowers.jpg/500px-UBtowers.jpg"
            },
            {
        name: "Bull Temple",
        localName: "ಡೊಡ್ಡ ಗಣಪತಿ ಬಸವನ ಗುಡಿ",
        pronunciation: "Nandi Bull Tem-ple",
        description: "A 16th-century Dravidian temple housing a massive monolithic Nandi bull statue, one of Bengaluru's oldest temples.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dodda_Ganeshana_Gudi_Hindu_temple%2C_Basavanagudi%2C_Karnataka%2C_India.jpg/500px-Dodda_Ganeshana_Gudi_Hindu_temple%2C_Basavanagudi%2C_Karnataka%2C_India.jpg"
            },
            {
        name: "Nandi Hills",
        localName: "ನಂದಿ ಬೆಟ್ಟ",
        pronunciation: "Nan-di Hills",
        description: "An ancient hill fortress 60 km from Bengaluru, offering breathtaking sunrise views, trekking trails, and a Tipu Sultan summer retreat.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sunrise_at_Nandi_Hills.jpg/500px-Sunrise_at_Nandi_Hills.jpg"
            }
        ]
    },

  Chennai: {
    foods: [
            {
        name: "Idli Sambar",
        localName: "இட்லி சாம்பார்",
        pronunciation: "Id-li Sam-bar",
        description: "Soft steamed rice cakes served with a flavourful lentil and vegetable broth — the quintessential Chennai breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/500px-Idli_Sambar.JPG"
            },
            {
        name: "Chettinad Chicken Curry",
        localName: "செட்டிநாடு கோழி குழம்பு",
        pronunciation: "Chet-ti-nad Ko-zhi Ku-zham-bu",
        description: "A fiery, aromatic chicken curry using kalpasi and marathi mokku spices unique to the Chettinad region of Tamil Nadu.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ChickenChettinad.JPG/500px-ChickenChettinad.JPG"
            },
            {
        name: "Pongal",
        localName: "பொங்கல்",
        pronunciation: "Pon-gal",
        description: "A comforting savoury porridge of rice and moong dal tempered with cumin, pepper, and ghee, a beloved breakfast in Tamil Nadu.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ven_pongal_with_sambar_and_chutney.jpg/500px-Ven_pongal_with_sambar_and_chutney.jpg"
            },
            {
        name: "Dosa",
        localName: "தோசை",
        pronunciation: "Tho-sai",
        description: "A thin, golden, crispy fermented rice and lentil crepe served with sambar and multiple chutneys, a Tamil Nadu staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg/500px-Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg"
            },
            {
        name: "Filter Coffee",
        localName: "ஃபில்டர் காபி",
        pronunciation: "Fil-ter Ka-pi",
        description: "Strong decoction coffee blended with frothy hot milk and served in a traditional brass tumbler and davara.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Filter_kaapi.JPG/500px-Filter_kaapi.JPG"
            },
            {
        name: "Kothu Parotta",
        localName: "கொத்து பரோட்டா",
        pronunciation: "Ko-thu Pa-rot-ta",
        description: "Shredded layered flatbread tossed on a griddle with eggs, meat or vegetables, and spices — a popular street food.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/500px-Chicken_Kottu.jpg"
            },
            {
        name: "Murukku",
        localName: "முறுக்கு",
        pronunciation: "Mu-ruk-ku",
        description: "Crunchy deep-fried spiral snacks made from rice and urad dal flour, a signature Tamil savory available everywhere.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/A_Traditional_Tamil_Snack_Murukku.jpg/500px-A_Traditional_Tamil_Snack_Murukku.jpg"
            },
            {
        name: "Sambar Rice",
        localName: "சாம்பார் சாதம்",
        pronunciation: "Sam-bar Sa-dham",
        description: "Comforting rice mixed generously with tangy sambar and a dollop of ghee, a homestyle Tamil Nadu meal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pumpkin_sambar.JPG/500px-Pumpkin_sambar.JPG"
            },
            {
        name: "Payasam",
        localName: "பாயசம்",
        pronunciation: "Pa-ya-sam",
        description: "A creamy sweet pudding made from rice or vermicelli simmered in milk with sugar and cardamom, served on festive occasions.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/500px-Kheer.jpg"
            },
            {
        name: "Sundal",
        localName: "சுண்டல்",
        pronunciation: "Sun-dal",
        description: "Boiled legumes tempered with mustard, curry leaves, red chilli, and coconut — a healthy and popular temple prasad snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Solanum_torvum_at_Kampung_Bukit_Jagong_20230629_173035.jpg/500px-Solanum_torvum_at_Kampung_Bukit_Jagong_20230629_173035.jpg"
            }
        ],
    places: [
            {
        name: "Marina Beach",
        localName: "மெரினா கடற்கரை",
        pronunciation: "Ma-ri-na Beach",
        description: "The world's second longest urban beach at 13 km, lined with statues, food stalls, and evening promenaders.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chennai_-_bird%27s-eye_view.jpg/500px-Chennai_-_bird%27s-eye_view.jpg"
            },
            {
        name: "Kapaleeshwarar Temple",
        localName: "கபாலீஸ்வரர் கோவில்",
        pronunciation: "Ka-pa-leesh-va-rar Tem-ple",
        description: "A magnificent Dravidian-style Hindu temple in Mylapore dedicated to Lord Shiva, with a towering sculpted gopuram.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Kapaleeswarar1.jpg/500px-Kapaleeswarar1.jpg"
            },
            {
        name: "Fort St. George",
        localName: "புனித ஜார்ஜ் கோட்டை",
        pronunciation: "Fort St. George",
        description: "India's first English fortress, built in 1644, now housing the Tamil Nadu State Legislature and a museum of colonial artefacts.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Fort_St._George%2C_Chennai_2.jpg/500px-Fort_St._George%2C_Chennai_2.jpg"
            },
            {
        name: "Government Museum Chennai",
        localName: "அரசு அருங்காட்சியகம்",
        pronunciation: "Gov-ern-ment Mu-se-um",
        description: "One of India's oldest museums, housing rich collections of South Indian bronzes, Amaravati sculptures, and natural history exhibits.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Madras_museum_theatre_in_October_2007.jpg/500px-Madras_museum_theatre_in_October_2007.jpg"
            },
            {
        name: "Valluvar Kottam",
        localName: "வள்ளுவர் கோட்டம்",
        pronunciation: "Val-lu-var Kot-tam",
        description: "A grand stone chariot monument dedicated to Tamil poet-philosopher Thiruvalluvar, inscribed with all 1330 Kural couplets.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Valluvar_Kottam_Edit1.JPG/500px-Valluvar_Kottam_Edit1.JPG"
            },
            {
        name: "Arignar Anna Zoological Park",
        localName: "அண்ணா உயிரியல் பூங்கா",
        pronunciation: "Van-da-lur Zoo",
        description: "India's largest zoological park spread over 1,265 acres in Vandalur, home to over 170 animal species.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Arignar_Anna_Zoological_park_27.jpg/500px-Arignar_Anna_Zoological_park_27.jpg"
            },
            {
        name: "Santhome Cathedral",
        localName: "சான்தோம் கோயில்",
        pronunciation: "San-thome Ca-the-dral",
        description: "A 16th-century Portuguese Catholic basilica built over the tomb of St. Thomas the Apostle, one of the world's few apostolic shrines.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Santhome_Basilica.jpg/500px-Santhome_Basilica.jpg"
            },
            {
        name: "MGR Film City",
        localName: "எம்ஜிஆர் திரைப்பட நகர்",
        pronunciation: "MGR Film City",
        description: "A film production complex and studio park that offers insight into Tamil cinema production, with sets and interactive exhibits.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ravindhar_cinematographer.jpg/500px-Ravindhar_cinematographer.jpg"
            },
            {
        name: "Elliot's Beach",
        localName: "எல்லியட்ஸ் கடற்கரை",
        pronunciation: "El-li-ots Beach",
        description: "A quieter and cleaner beach in Besant Nagar, dotted with food stalls, the Ashtalakshmi Temple, and Karl Schmidt Memorial.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Elliots_Beach_at_Besant_Nagar%2C_Chennai.JPG/500px-Elliots_Beach_at_Besant_Nagar%2C_Chennai.JPG"
            },
            {
        name: "Mahabalipuram",
        localName: "மாமல்லபுரம்",
        pronunciation: "Ma-ha-ba-li-pu-ram",
        description: "A UNESCO World Heritage town near Chennai famous for 7th-8th century rock-cut Pallava temples, rathas, and the Shore Temple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg/500px-A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg"
            }
        ]
    },

  Kolkata: {
    foods: [
            {
        name: "Rosogolla",
        localName: "রসগোল্লা",
        pronunciation: "Ro-so-gol-la",
        description: "Soft, spongy cottage cheese balls soaked in light sugar syrup — Kolkata's most beloved GI-tagged sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/500px-Rasgulla.jpg"
            },
            {
        name: "Kathi Roll",
        localName: "কাঠি রোল",
        pronunciation: "Ka-thi Roll",
        description: "Paratha wrapped around spiced kebab or egg filling with onion and chutney — invented in Kolkata's Nizam's restaurant.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Kolkata_Rolls.jpg/500px-Kolkata_Rolls.jpg"
            },
            {
        name: "Macher Jhol",
        localName: "মাছের ঝোল",
        pronunciation: "Ma-cher Jhol",
        description: "A light, mustard-spiced fish curry with potato and tomatoes — the cornerstone of a typical Bengali lunch.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bata_macher_jhol-MB03.jpg/500px-Bata_macher_jhol-MB03.jpg"
            },
            {
        name: "Puchka",
        localName: "পুচকা",
        pronunciation: "Puch-ka",
        description: "Kolkata's version of pani puri, with spicier tamarind water and a filling of mashed potato with green chilies and chaat masala.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/500px-Pani_Puri1.JPG"
            },
            {
        name: "Mishti Doi",
        localName: "মিষ্টি দই",
        pronunciation: "Mish-ti Doi",
        description: "Sweetened fermented yoghurt set in earthenware pots, giving it a distinctive caramel flavour unique to Bengal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Mishti_Doi.jpg/500px-Mishti_Doi.jpg"
            },
            {
        name: "Kosha Mangsho",
        localName: "কষা মাংসো",
        pronunciation: "Ko-sha Mang-sho",
        description: "Slow-cooked, deeply caramelised mutton curry with thick, rich masala — a slow-cooked Bengali Sunday favourite.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bengali_Mutton_Curry.JPG/500px-Bengali_Mutton_Curry.JPG"
            },
            {
        name: "Aloo Posto",
        localName: "আলু পোস্তো",
        pronunciation: "A-lu Pos-to",
        description: "Potato cubes cooked in a paste of poppy seeds and mustard oil — a simple, flavourful Bengali vegetarian dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aloo_Posto.jpg/500px-Aloo_Posto.jpg"
            },
            {
        name: "Luchi",
        localName: "লুচি",
        pronunciation: "Lu-chi",
        description: "Small, puffed deep-fried bread made from refined flour, typically served with dal or alur dom (spiced potatoes).",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Puri_-_Digha_-_East_Midnapore_-_2015-05-03_9778.JPG/500px-Puri_-_Digha_-_East_Midnapore_-_2015-05-03_9778.JPG"
            },
            {
        name: "Cholar Dal",
        localName: "ছোলার ডাল",
        pronunciation: "Cho-lar Dal",
        description: "Bengali-style chana dal cooked with coconut, raisins, and ghee — aromatic and mildly sweet, perfect with luchi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bengali_dialects.png/500px-Bengali_dialects.png"
            },
            {
        name: "Sandesh",
        localName: "সন্দেশ",
        pronunciation: "San-desh",
        description: "A delicate Bengali confection made from freshly curdled milk (chhena) kneaded with sugar, often moulded into decorative shapes.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Sandesh_3.jpg/500px-Sandesh_3.jpg"
            }
        ],
    places: [
            {
        name: "Victoria Memorial",
        localName: "ভিক্টোরিয়া মেমোরিয়াল",
        pronunciation: "Vic-to-ria Me-mo-rial",
        description: "A magnificent white Makrana marble monument built in 1921 in memory of Queen Victoria, housing a museum of colonial art.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/500px-Victoria_Memorial_situated_in_Kolkata.jpg"
            },
            {
        name: "Howrah Bridge",
        localName: "হাওড়া সেতু",
        pronunciation: "How-rah Bridge",
        description: "An iconic cantilever bridge over the Hooghly River, one of the world's busiest bridges carrying over 100,000 vehicles daily.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Howrah_bridge_at_night.jpg/500px-Howrah_bridge_at_night.jpg"
            },
            {
        name: "Dakshineswar Kali Temple",
        localName: "দক্ষিণেশ্বর কালী মন্দির",
        pronunciation: "Dak-shin-esh-war Ka-li Tem-ple",
        description: "A revered 19th-century Hindu temple on the Hooghly River dedicated to Goddess Kali, once the place of worship of Ramakrishna Paramahamsa.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/500px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG"
            },
            {
        name: "Belur Math",
        localName: "বেলুড় মঠ",
        pronunciation: "Be-lur Math",
        description: "The headquarters of Ramakrishna Math and Mission on the Hooghly River, blending Hindu, Islamic, and Christian architectural elements.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Belur_Math%2C_Howrah.jpg/500px-Belur_Math%2C_Howrah.jpg"
            },
            {
        name: "Indian Museum",
        localName: "ইন্ডিয়ান মিউজিয়াম",
        pronunciation: "In-dian Mu-se-um",
        description: "The oldest and largest museum in India, founded in 1814, with rare antiques, armour, fossils, Mughal paintings, and mummies.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg/500px-Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg"
            },
            {
        name: "Marble Palace",
        localName: "মার্বেল প্যালেস",
        pronunciation: "Mar-ble Pal-ace",
        description: "A 19th-century neoclassical mansion with European marble statues, Venetian chandeliers, and a private zoo inside its grounds.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Marble_Palace_Kolkata.jpg/500px-Marble_Palace_Kolkata.jpg"
            },
            {
        name: "Kolkata Botanical Garden",
        localName: "আচার্য জগদীশ চন্দ্র বসু উদ্ভিদ উদ্যান",
        pronunciation: "Bo-tan-ical Gar-den",
        description: "Home to the Great Banyan Tree, a single tree with over 3,500 aerial roots spread across 14,500 square metres.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kolkata_botanical_garden_pathway.jpg/500px-Kolkata_botanical_garden_pathway.jpg"
            },
            {
        name: "New Market",
        localName: "নিউ মার্কেট",
        pronunciation: "New Market",
        description: "A historic colonial-era market from 1874 with over 2,000 shops selling spices, clothing, street food, and everything in between.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/New_Market%2C_Kolkata%2C_2011.jpg/500px-New_Market%2C_Kolkata%2C_2011.jpg"
            },
            {
        name: "Park Street",
        localName: "পার্ক স্ট্রিট",
        pronunciation: "Park Street",
        description: "Kolkata's most vibrant dining and entertainment avenue, known for its restaurants, jazz clubs, and Christmas celebrations.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Parkstreet.png/500px-Parkstreet.png"
            },
            {
        name: "Sundarbans",
        localName: "সুন্দরবন",
        pronunciation: "Sun-dar-bans",
        description: "A UNESCO World Heritage mangrove delta near Kolkata, home to the Bengal tiger, estuarine crocodiles, and Irrawaddy dolphins.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Save_the_sundarbans_20.jpg/500px-Save_the_sundarbans_20.jpg"
            }
        ]
    },

  Hyderabad: {
    foods: [
            {
        name: "Hyderabadi Biryani",
        localName: "హైదరాబాది బిర్యానీ",
        pronunciation: "Hy-de-ra-ba-di Bir-ya-ni",
        description: "Aromatic long-grain basmati rice layered and slow-cooked (dum) with marinated meat and whole spices in the Nizami tradition.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/500px-Hyderabadi_Chicken_Biryani.jpg"
            },
            {
        name: "Haleem",
        localName: "హాలీమ్",
        pronunciation: "Ha-leem",
        description: "A slow-cooked, slow-stirred stew of wheat, barley, lentils, and minced meat, a Hyderabadi Ramzan delicacy with GI tag.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pakistani_Haleem_served_with_garnish.jpg/500px-Pakistani_Haleem_served_with_garnish.jpg"
            },
            {
        name: "Mirchi Ka Salan",
        localName: "మిర్చి కా సాలన్",
        pronunciation: "Mir-chi Ka Sa-lan",
        description: "Long green chillies cooked in a rich peanut, sesame, and tamarind curry — the classic accompaniment to Hyderabadi biryani.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hyderabadi_Hari_Mirchi_Ka_Salan.JPG/500px-Hyderabadi_Hari_Mirchi_Ka_Salan.JPG"
            },
            {
        name: "Qubani Ka Meetha",
        localName: "ఖుబాని కా మీఠా",
        pronunciation: "Qu-ba-ni Ka Mee-tha",
        description: "A traditional Hyderabadi dessert of stewed dried apricots served with fresh cream or custard, a Nizami wedding staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Khobani_Ka_Meetha.JPG/500px-Khobani_Ka_Meetha.JPG"
            },
            {
        name: "Lukhmi",
        localName: "లుఖ్మీ",
        pronunciation: "Lukh-mi",
        description: "A flaky square-shaped fried pastry stuffed with spiced minced meat — Hyderabad's distinctive savoury snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hyderabadi_lukhmi.JPG/500px-Hyderabadi_lukhmi.JPG"
            },
            {
        name: "Double Ka Meetha",
        localName: "డబుల్ కా మీఠా",
        pronunciation: "Dou-ble Ka Mee-tha",
        description: "A rich bread pudding dessert with fried bread, milk, saffron, and dry fruits, a Hyderabadi take on shahi tukda.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Double_ka_meetha_with_a_big_spoon.jpg/500px-Double_ka_meetha_with_a_big_spoon.jpg"
            },
            {
        name: "Osmania Biscuits",
        localName: "ఉస్మానియా బిస్కెట్లు",
        pronunciation: "Os-ma-nia Bis-cuits",
        description: "Buttery, slightly sweet milk biscuits named after the last Nizam of Hyderabad, best enjoyed with Irani chai.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Subhan_osmania_biscuits.jpg/500px-Subhan_osmania_biscuits.jpg"
            },
            {
        name: "Irani Chai",
        localName: "ఇరానీ చాయ్",
        pronunciation: "I-ra-ni Chai",
        description: "Milky tea slow-brewed separately with condensed milk and served in traditional Irani cafés, a Hyderabadi cultural institution.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Yazdani_Bakery_in_Fort.jpg/500px-Yazdani_Bakery_in_Fort.jpg"
            },
            {
        name: "Pesarattu",
        localName: "పెసరట్టు",
        pronunciation: "Pe-sa-rat-tu",
        description: "Green moong dal crepes topped with ginger and onion, unique to Andhra–Telangana cuisine and served with ginger chutney.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Pesarattu.jpg/500px-Pesarattu.jpg"
            },
            {
        name: "Sheer Korma",
        localName: "షీర్ ఖుర్మా",
        pronunciation: "Sheer Kor-ma",
        description: "A rich vermicelli pudding in thickened milk with dates, dry fruits, and saffron — the quintessential Eid festival dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sheer_Khurma.jpg/500px-Sheer_Khurma.jpg"
            }
        ],
    places: [
            {
        name: "Charminar",
        localName: "చార్మినార్",
        pronunciation: "Char-mi-nar",
        description: "A 16th-century mosque and monument with four ornate minarets, the iconic symbol of Hyderabad built by Muhammad Quli Qutb Shah.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/500px-Charminar_Hyderabad_1.jpg"
            },
            {
        name: "Golconda Fort",
        localName: "గోల్కొండ కోట",
        pronunciation: "Gol-con-da Fort",
        description: "A majestic medieval fort and former capital of the Qutb Shahi kingdom, famous for its acoustics, palaces, and the Koh-i-Noor diamond's origin.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/500px-Golconda_Fort_005.jpg"
            },
            {
        name: "Hussain Sagar Lake",
        localName: "హుస్సేన్ సాగర్ సరస్సు",
        pronunciation: "Hus-sain Sa-gar Lake",
        description: "A heart-shaped artificial lake built in 1563, featuring a 16-metre monolithic Buddha statue on its rocky island.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hussain_sagar_sunset.jpg/500px-Hussain_sagar_sunset.jpg"
            },
            {
        name: "Salar Jung Museum",
        localName: "సాలార్ జంగ్ మ్యూజియం",
        pronunciation: "Sa-lar Jung Mu-se-um",
        description: "One of India's largest museums, housing the priceless art collection of Salar Jung III — from jade daggers to Mughal manuscripts.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg/500px-Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg"
            },
            {
        name: "Ramoji Film City",
        localName: "రామోజీ ఫిల్మ్ సిటీ",
        pronunciation: "Ra-mo-ji Film City",
        description: "The world's largest integrated film studio complex, a sprawling theme park offering film sets, rides, and live entertainment.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ramoji_Film_City.jpg/500px-Ramoji_Film_City.jpg"
            },
            {
        name: "Mecca Masjid",
        localName: "మక్కా మసీదు",
        pronunciation: "Mec-ca Mas-jid",
        description: "One of India's oldest and largest mosques, built using soil brought from Mecca, accommodating up to 10,000 worshippers.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Mecca_Masjid_Hyderabad.JPG/500px-Mecca_Masjid_Hyderabad.JPG"
            },
            {
        name: "Qutb Shahi Tombs",
        localName: "కుతుబ్ షాహీ సమాధులు",
        pronunciation: "Qutb Sha-hi Tombs",
        description: "A necropolis of seven grand domed granite tombs of the Qutb Shahi sultans, a UNESCO-tentative heritage site.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Qutb_Shahi_Tomb_5.jpg/500px-Qutb_Shahi_Tomb_5.jpg"
            },
            {
        name: "Laad Bazaar",
        localName: "లాడ్ బజారు",
        pronunciation: "Laad Ba-zar",
        description: "A colourful 400-year-old market near Charminar famous for bangles, pearls, lac jewellery, and traditional Hyderabadi attire.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Laad_Bazaar.jpg/500px-Laad_Bazaar.jpg"
            },
            {
        name: "Birla Mandir",
        localName: "బిర్లా మందిర్",
        pronunciation: "Bir-la Man-dir",
        description: "A striking white marble Vaishnava temple built on a 280-foot rocky hill, offering panoramic views of Hyderabad city.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Laxminarayan_Temple_in_New_Delhi_03-2016.jpg/500px-Laxminarayan_Temple_in_New_Delhi_03-2016.jpg"
            },
            {
        name: "Nehru Zoological Park",
        localName: "నెహ్రూ జంతుప్రదర్శనశాల",
        pronunciation: "Neh-ru Zoo-log-ical Park",
        description: "One of India's largest zoos with over 1,500 species including white tigers, lions, rhinos, and a prehistoric animal park.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Hyderabad_zoo.jpg/500px-Hyderabad_zoo.jpg"
            }
        ]
    },

  Ahmedabad: {
    foods: [
            {
        name: "Dhokla",
        localName: "ઢોકળા",
        pronunciation: "Dho-kla",
        description: "Soft, spongy steamed cakes made from fermented chickpea batter, tempered with mustard seeds and served with green chutney.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Dhokla_on_Gujrart.jpg/500px-Dhokla_on_Gujrart.jpg"
            },
            {
        name: "Thepla",
        localName: "થેપલા",
        pronunciation: "Thep-la",
        description: "Thin flatbreads made from wheat flour and methi (fenugreek) leaves, spiced and pan-fried — a Gujarati travel staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Thepla_main.jpg/500px-Thepla_main.jpg"
            },
            {
        name: "Khandvi",
        localName: "ખાંડવી",
        pronunciation: "Khand-vi",
        description: "Delicate, thin rolls of cooked chickpea and buttermilk batter, tempered with sesame and coconut — a beloved Gujarati snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Khandvi_%2810497367994%29.jpg/500px-Khandvi_%2810497367994%29.jpg"
            },
            {
        name: "Fafda",
        localName: "ફાફડા",
        pronunciation: "Faf-da",
        description: "Crunchy deep-fried gram flour strips typically eaten on Dussehra with jalebi and papaya chutney in Gujarat.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gujarati_naashta%28snacks%29.jpg/500px-Gujarati_naashta%28snacks%29.jpg"
            },
            {
        name: "Undhiyu",
        localName: "ઊંધિયુ",
        pronunciation: "Und-hi-yu",
        description: "A rich, slow-cooked medley of winter vegetables and muthia (herb dumplings), a seasonal Gujarati delicacy.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Undhiyu.jpg/500px-Undhiyu.jpg"
            },
            {
        name: "Gujarati Thali",
        localName: "ગુજરાતી થાળી",
        pronunciation: "Gu-ja-ra-ti Tha-li",
        description: "A complete meal with dal, kadhi, multiple sabzis, rotli, rice, papad, pickles, and a sweet — served unlimited at many Ahmedabad restaurants.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gujrati_Thali.jpg/500px-Gujrati_Thali.jpg"
            },
            {
        name: "Mohanthal",
        localName: "મોહનથાળ",
        pronunciation: "Mo-han-thal",
        description: "A dense, aromatic gram flour fudge loaded with ghee and cardamom, a classic Gujarati festival sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mohanthal1.jpg/500px-Mohanthal1.jpg"
            },
            {
        name: "Sev Tameta Nu Shaak",
        localName: "સેવ ટામેટા નુ શાક",
        pronunciation: "Sev Ta-me-ta Nu Shaak",
        description: "A tangy tomato curry topped with crunchy sev, a simple and quick Gujarati dish served with roti.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gujrati_Thali.jpg/500px-Gujrati_Thali.jpg"
            },
            {
        name: "Surti Locho",
        localName: "સુરતી લોચો",
        pronunciation: "Sur-ti Lo-cho",
        description: "A steamed, soft and spongy snack made from chana dal batter, topped with ghee, sev, and onion — originated in Surat.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Locho_-_Gujarati_Snack_-_Surat.jpg/500px-Locho_-_Gujarati_Snack_-_Surat.jpg"
            },
            {
        name: "Adadiya Pak",
        localName: "અડદિયા પાક",
        pronunciation: "A-da-di-ya Pak",
        description: "A winter sweet made from black urad dal, ghee, and sugar with warming spices like ginger and cardamom.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gujrati_Thali.jpg/500px-Gujrati_Thali.jpg"
            }
        ],
    places: [
            {
        name: "Sabarmati Ashram",
        localName: "સાબરમતી આશ્રમ",
        pronunciation: "Sa-bar-ma-ti Ash-ram",
        description: "Mahatma Gandhi's iconic residence on the banks of the Sabarmati River, the base for his Dandi March and India's freedom struggle.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/500px-GANDHI_ASHRAM_03.jpg"
            },
            {
        name: "Adalaj Stepwell",
        localName: "અડાલજ ની વાવ",
        pronunciation: "A-da-laj Step-well",
        description: "A magnificent 15th-century Gujarati-Islamic stepwell with intricate carvings on five storeys of galleries, pillars, and platforms.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Adalaj_ki_Vav_Gujarat_240A1370_72.jpg/500px-Adalaj_ki_Vav_Gujarat_240A1370_72.jpg"
            },
            {
        name: "Sidi Saiyyed Mosque",
        localName: "સિદ્દી સૈયદ ની જાળી",
        pronunciation: "Si-di Sai-yed Mosque",
        description: "A stunning 16th-century mosque famous for its exquisite stone jali screens depicting an intertwined tree of life.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg/500px-Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg"
            },
            {
        name: "Kankaria Lake",
        localName: "કાંકરિયા તળાવ",
        pronunciation: "Kan-ka-ria Lake",
        description: "A 15th-century lakefront with a zoo, toy train, hot air balloons, and entertainment zones — Ahmedabad's most visited attraction.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Kankaria_Carnival_2_Ahmedabad.JPG/500px-Kankaria_Carnival_2_Ahmedabad.JPG"
            },
            {
        name: "Calico Museum of Textiles",
        localName: "કૅલિકો ટેક્સ્ટાઇલ મ્યુઝિયમ",
        pronunciation: "Cal-i-co Mu-se-um",
        description: "One of the world's finest textile museums showcasing rare Mughal fabrics, temple hangings, and royal Indian textiles.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Calico_Museum_of_Textiles%2C_Ahmedabad%2C_1952.jpg/500px-Calico_Museum_of_Textiles%2C_Ahmedabad%2C_1952.jpg"
            },
            {
        name: "Law Garden Night Market",
        localName: "લૉ ગાર્ડન માર્કેટ",
        pronunciation: "Law Gar-den Night Mar-ket",
        description: "A lively evening market known for traditional Gujarati embroidered clothing, handicrafts, and street food stalls.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Law_Garden%2C_Ahmedabad_-_India_%284050720558%29.jpg/500px-Law_Garden%2C_Ahmedabad_-_India_%284050720558%29.jpg"
            },
            {
        name: "ISKCON Ahmedabad",
        localName: "ઇસ્કોન મંદિર",
        pronunciation: "IS-KON Tem-ple",
        description: "A grand Hare Krishna temple with marble architecture, interactive Krishna exhibitions, and a popular prasadam restaurant.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Iskon_Temple%2C_Vrindawan.jpg/500px-Iskon_Temple%2C_Vrindawan.jpg"
            },
            {
        name: "Jama Masjid Ahmedabad",
        localName: "જામા મસ્જિદ",
        pronunciation: "Ja-ma Mas-jid",
        description: "A stunning 15th-century mosque with 260 columns and 15 domes, built by Sultan Ahmad Shah — a UNESCO World Heritage structure.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jama_Masjid%2C_Ahmedabad_01.jpg/500px-Jama_Masjid%2C_Ahmedabad_01.jpg"
            },
            {
        name: "Gujarat Science City",
        localName: "ગુજરાત સાયન્સ સિટી",
        pronunciation: "Gu-ja-rat Sci-ence Ci-ty",
        description: "Asia's largest science centre featuring IMAX 3D, robotics shows, aquatics gallery, nature park, and amphitheatre.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gujarat_science_city5.jpg/500px-Gujarat_science_city5.jpg"
            },
            {
        name: "Bhadra Fort",
        localName: "ભદ્ર કિલ્લો",
        pronunciation: "Bha-dra Fort",
        description: "A 15th-century fort built by Ahmedabad's founder, housing the Bhadra Kali Temple and commanding the historic old city.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bhadra_Fort_in_Ahmedabad%2C_Gujarat%2C_India_-_1872.jpg/500px-Bhadra_Fort_in_Ahmedabad%2C_Gujarat%2C_India_-_1872.jpg"
            }
        ]
    },

  Pune: {
    foods: [
            {
        name: "Misal Pav",
        localName: "मिसळ पाव",
        pronunciation: "Mi-sal Pav",
        description: "Spicy sprouted curry topped with farsan, onion, and lemon, served with bread rolls — Pune's favourite breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kolhapuri_Misal_Pav.jpg/500px-Kolhapuri_Misal_Pav.jpg"
            },
            {
        name: "Sabudana Khichdi",
        localName: "साबुदाणा खिचडी",
        pronunciation: "Sa-bu-da-na Khi-chdi",
        description: "Tapioca pearls tossed with peanuts, cumin, and potatoes — a popular fasting food and breakfast in Maharashtra.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Sabudana_Khichdi_with_Sweet_curd.JPG/500px-Sabudana_Khichdi_with_Sweet_curd.JPG"
            },
            {
        name: "Varhadi Mutton",
        localName: "वऱ्हाडी मटण",
        pronunciation: "Var-ha-di Mut-ton",
        description: "A fiery, coconut-based mutton curry from Vidarbha region, known for its bold dried red chilli flavour.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Malvan_dish.jpg/500px-Malvan_dish.jpg"
            },
            {
        name: "Mastani",
        localName: "मस्तानी",
        pronunciation: "Mas-ta-ni",
        description: "Pune's iconic thick milkshake topped generously with a whole scoop of ice cream, dry fruits, and tutti-frutti.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mango_Mastani_and_Mango_Ice-Cream.jpg/500px-Mango_Mastani_and_Mango_Ice-Cream.jpg"
            },
            {
        name: "Thalipeeth",
        localName: "थालीपीठ",
        pronunciation: "Tha-li-peeth",
        description: "A savoury multigrain pancake made from a blend of different flours, spiced with cumin, chilli, and onion.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Maharashtrian_Thalipith_-_1.jpg/500px-Maharashtrian_Thalipith_-_1.jpg"
            },
            {
        name: "Poha",
        localName: "पोहे",
        pronunciation: "Po-he",
        description: "Flattened rice tossed with mustard seeds, curry leaves, turmeric, onion, and peanuts — a light Maharashtrian breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Poha.jpg/500px-Poha.jpg"
            },
            {
        name: "Kothimbir Vadi",
        localName: "कोथिंबीर वडी",
        pronunciation: "Ko-thim-bir Va-di",
        description: "Crispy fritters made from coriander leaves, chickpea flour, and sesame — a loved Maharashtrian tea-time snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kothimbir_vadi.JPG/500px-Kothimbir_vadi.JPG"
            },
            {
        name: "Shrikhand",
        localName: "श्रीखंड",
        pronunciation: "Shri-khand",
        description: "Thick strained yoghurt sweetened with sugar and flavoured with saffron and cardamom, a classic Maharashtrian dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Shrikhand_london_kastoori.jpg/500px-Shrikhand_london_kastoori.jpg"
            },
            {
        name: "Puneri Dal",
        localName: "पुणेरी डाळ",
        pronunciation: "Pu-ne-ri Dal",
        description: "Toor dal cooked with kokum, peanuts, and jaggery — a distinctively tangy-sweet dal unique to Pune households.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/3_types_of_lentil.png/500px-3_types_of_lentil.png"
            },
            {
        name: "Modak",
        localName: "मोदक",
        pronunciation: "Mo-dak",
        description: "Steamed coconut and jaggery-filled dumplings in a rice flour shell — the sacred sweet of Pune's beloved Ganpati festival.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ukadiche_Modak_%28Rice%29.jpg/500px-Ukadiche_Modak_%28Rice%29.jpg"
            }
        ],
    places: [
            {
        name: "Shaniwar Wada",
        localName: "शनिवार वाडा",
        pronunciation: "Sha-ni-war Wa-da",
        description: "A majestic 18th-century fortification and palace of the Peshwa rulers, famous for its grand entrance gate and haunted legends.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Front_view_of_Shaniwar_Wada_illuminated.jpg/500px-Front_view_of_Shaniwar_Wada_illuminated.jpg"
            },
            {
        name: "Aga Khan Palace",
        localName: "आगा खान पॅलेस",
        pronunciation: "A-ga Khan Pal-ace",
        description: "A historic 19th-century palace where Mahatma Gandhi and Kasturba were imprisoned during the Quit India Movement.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/500px-Pune_Palace.jpg"
            },
            {
        name: "Osho Ashram",
        localName: "ओशो आश्रम",
        pronunciation: "O-sho Ash-ram",
        description: "The famous Osho International Meditation Resort in Koregaon Park, a lush campus offering meditation, yoga, and therapy.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2008_01_Osho_Park%2C_Pune%2C_India.jpg/500px-2008_01_Osho_Park%2C_Pune%2C_India.jpg"
            },
            {
        name: "Sinhagad Fort",
        localName: "सिंहगड किल्ला",
        pronunciation: "Sin-ha-gad Fort",
        description: "An ancient hilltop fort 35 km from Pune, site of the legendary 1670 battle of Tanaji Malusare, offering panoramic views.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sinhagad.jpg/500px-Sinhagad.jpg"
            },
            {
        name: "Dagdusheth Ganpati Temple",
        localName: "दगडूशेठ हलवाई गणपती",
        pronunciation: "Dag-du-sheth Gan-pa-ti Tem-ple",
        description: "One of Pune's most revered Ganesh temples with a golden crown on the idol, visited daily by thousands of devotees.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG/500px-Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG"
            },
            {
        name: "Pataleshwar Cave Temple",
        localName: "पाताळेश्वर लेणी",
        pronunciation: "Pa-ta-lesh-war Cave",
        description: "An 8th-century Rashtrakuta rock-cut Shiva cave temple in the heart of Pune, surrounded by a small park.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pataleshwar_cave_temple.JPG/500px-Pataleshwar_cave_temple.JPG"
            },
            {
        name: "Rajiv Gandhi Zoological Park",
        localName: "राजीव गांधी प्राणिसंग्रहालय",
        pronunciation: "Ka-traj Zoo",
        description: "Katraj Zoo with a snake park, reptile house, and native wildlife species — a popular family attraction in Pune.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Rajiv_Gandhi_zoo_entrance.png/500px-Rajiv_Gandhi_zoo_entrance.png"
            },
            {
        name: "Pune Okayama Friendship Garden",
        localName: "पुणे फुलबाग",
        pronunciation: "Pu-ne Ja-pan-ese Gar-den",
        description: "A serene Japanese-style garden created to commemorate Pune's friendship with Okayama, Japan, featuring koi ponds and pagodas.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Pu_La_Deshpande_garden_5.JPG/500px-Pu_La_Deshpande_garden_5.JPG"
            },
            {
        name: "Lonavala",
        localName: "लोणावळा",
        pronunciation: "Lo-na-va-la",
        description: "A popular hill station near Pune known for misty valleys, waterfalls, Bhushi Dam, and the famous chikki sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mumbai_Pune_Expressway2.jpg/500px-Mumbai_Pune_Expressway2.jpg"
            },
            {
        name: "Vishrambaug Wada",
        localName: "विश्रामबाग वाडा",
        pronunciation: "Vish-ram-baug Wa-da",
        description: "A magnificent early 19th-century Peshwa mansion with intricate wooden carvings, now housing a post office and retail shops.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Vishram_Baug_Wada.jpg/500px-Vishram_Baug_Wada.jpg"
            }
        ]
    },

  Jaipur: {
    foods: [
            {
        name: "Dal Baati Churma",
        localName: "दाल बाटी चूरमा",
        pronunciation: "Dal Ba-ti Chur-ma",
        description: "Hard wheat balls (baati) baked over coals, served with spiced lentil dal and sweet crushed churma — Rajasthan's signature dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajasthani_Dal_Bati_Churma_-_Gurugram_-_Haryana_-_03.jpg/500px-Rajasthani_Dal_Bati_Churma_-_Gurugram_-_Haryana_-_03.jpg"
            },
            {
        name: "Ghevar",
        localName: "घेवर",
        pronunciation: "Ghe-var",
        description: "A Rajasthani disc-shaped sweet made from refined flour and syrup with a honeycomb texture, topped with rabri — a festive Teej specialty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ghevar_with_Malai_Topping.jpg/500px-Ghevar_with_Malai_Topping.jpg"
            },
            {
        name: "Pyaz Kachori",
        localName: "प्याज कचोरी",
        pronunciation: "Pyaz Ka-cho-ri",
        description: "Flaky deep-fried pastry stuffed with spiced onion filling, Jaipur's beloved street breakfast served with tamarind chutney.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rajasthani_Raj_Kachori.jpg/500px-Rajasthani_Raj_Kachori.jpg"
            },
            {
        name: "Laal Maas",
        localName: "लाल माँस",
        pronunciation: "Laal Maas",
        description: "A fiery Rajasthani mutton curry made with Mathania red chillies and no tomatoes, a bold and intense dish from royal kitchens.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Laal-Maans.jpg/500px-Laal-Maans.jpg"
            },
            {
        name: "Mirchi Bada",
        localName: "मिर्ची बड़ा",
        pronunciation: "Mir-chi Ba-da",
        description: "Large green chillies stuffed with spiced potato, dipped in chickpea batter, and deep-fried — a Jodhpur snack popular in Jaipur too.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mirchi_Bada_from_Jodhpur_1.jpg/500px-Mirchi_Bada_from_Jodhpur_1.jpg"
            },
            {
        name: "Mawa Kachori",
        localName: "मावा कचोरी",
        pronunciation: "Ma-wa Ka-cho-ri",
        description: "A sweet deep-fried pastry filled with reduced milk (mawa) and dry fruits, soaked in sugar syrup — a Jaipur dessert specialty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rajasthani_Raj_Kachori.jpg/500px-Rajasthani_Raj_Kachori.jpg"
            },
            {
        name: "Ker Sangri",
        localName: "केर सांगरी",
        pronunciation: "Ker San-gri",
        description: "A Rajasthani vegetable dish made from desert berries (ker) and beans (sangri), cooked with dried spices and oil.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/The_delicious_Rajasthani_food.png/500px-The_delicious_Rajasthani_food.png"
            },
            {
        name: "Rabri",
        localName: "रबड़ी",
        pronunciation: "Ra-bri",
        description: "Thick, condensed sweetened milk with layers of malai, flavoured with saffron and cardamom — a Jaipur dessert street staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Homemade_Rabri.jpg/500px-Homemade_Rabri.jpg"
            },
            {
        name: "Gatte Ki Sabzi",
        localName: "गट्टे की सब्ज़ी",
        pronunciation: "Gat-te Ki Sab-zi",
        description: "Chickpea flour dumplings cooked in a tangy yoghurt-based curry with Rajasthani spices — a classic vegetarian meal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/The_delicious_Rajasthani_food.png/500px-The_delicious_Rajasthani_food.png"
            },
            {
        name: "Rajasthani Thali",
        localName: "राजस्थानी थाली",
        pronunciation: "Ra-jas-tha-ni Tha-li",
        description: "A grand vegetarian spread of dal, gatte, ker sangri, baati, churma, papad, pickles, and sweets served on a brass platter.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/The_delicious_Rajasthani_food.png/500px-The_delicious_Rajasthani_food.png"
            }
        ],
    places: [
            {
        name: "Amber Fort",
        localName: "आमेर का किला",
        pronunciation: "Am-ber Fort",
        description: "A majestic 16th-century hilltop fort-palace combining Hindu and Mughal architecture, overlooking Maota Lake near Jaipur.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/500px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg"
            },
            {
        name: "Hawa Mahal",
        localName: "हवा महल",
        pronunciation: "Ha-wa Ma-hal",
        description: "The iconic five-storey 'Palace of Winds' with 953 small windows, built in 1799 for royal ladies to observe street festivities.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
            },
            {
        name: "City Palace",
        localName: "सिटी पैलेस",
        pronunciation: "Ci-ty Pal-ace",
        description: "A grand complex of courtyards, gardens, and buildings blending Rajput and Mughal architecture, partly still a royal residence.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Chandra_Mahal%2C_City_Palace%2C_Jaipur%2C_20191218_0951_9043.jpg/500px-Chandra_Mahal%2C_City_Palace%2C_Jaipur%2C_20191218_0951_9043.jpg"
            },
            {
        name: "Jantar Mantar",
        localName: "जंतर मंतर",
        pronunciation: "Jan-tar Man-tar",
        description: "A UNESCO World Heritage observatory built in 1724 with 19 astronomical instruments, including the world's largest stone sundial.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jantar_Mantar_at_Jaipur.jpg/500px-Jantar_Mantar_at_Jaipur.jpg"
            },
            {
        name: "Nahargarh Fort",
        localName: "नाहरगढ़ किला",
        pronunciation: "Na-har-garh Fort",
        description: "A 18th-century hilltop fort with stunning views of Jaipur city, famous for its labyrinthine royal suites and sunset panoramas.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Nahargarh_13.jpg/500px-Nahargarh_13.jpg"
            },
            {
        name: "Jal Mahal",
        localName: "जल महल",
        pronunciation: "Jal Ma-hal",
        description: "A beautifully restored 18th-century palace sitting in the middle of Man Sagar Lake, appearing to float on water.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg/500px-Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg"
            },
            {
        name: "Birla Mandir Jaipur",
        localName: "बिड़ला मंदिर",
        pronunciation: "Bir-la Man-dir",
        description: "A pristine white marble Lakshmi Narayan temple built in 1988 at the foot of Moti Doongri hill, beautifully lit at night.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Birla_Mandir_Jaipur_%282022-07%29.jpg/500px-Birla_Mandir_Jaipur_%282022-07%29.jpg"
            },
            {
        name: "Johri Bazaar",
        localName: "जोहरी बाज़ार",
        pronunciation: "Joh-ri Ba-zar",
        description: "Jaipur's famous jewellery market where skilled artisans sell traditional Kundan, Meenakari, and gemstone jewellery.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Johari_Bazaar%2C_Jaipur.jpg/500px-Johari_Bazaar%2C_Jaipur.jpg"
            },
            {
        name: "Rambagh Palace",
        localName: "रामबाग पैलेस",
        pronunciation: "Ram-bagh Pal-ace",
        description: "A 19th-century former royal hunting lodge turned luxury heritage hotel, surrounded by lush Mughal gardens.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rambagh_Palace_hotel_Jaipur_lobby_courtyard.jpg/500px-Rambagh_Palace_hotel_Jaipur_lobby_courtyard.jpg"
            },
            {
        name: "Albert Hall Museum",
        localName: "अलबर्ट हॉल संग्रहालय",
        pronunciation: "Al-bert Hall Mu-se-um",
        description: "Rajasthan's oldest museum in a spectacular Indo-Saracenic building housing Egyptian mummies, carpets, crystal works, and coins.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Albert_Hall_%28_Jaipur_%29.jpg/500px-Albert_Hall_%28_Jaipur_%29.jpg"
            }
        ]
    },

  Lucknow: {
    foods: [
            {
        name: "Galouti Kebab",
        localName: "गलौटी कबाब",
        pronunciation: "Ga-lau-ti Ke-bab",
        description: "Melt-in-the-mouth minced mutton patties with 160 spices, originally created for a toothless Nawab — Lucknow's culinary crown jewel.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tunday_Kebabs.jpg/500px-Tunday_Kebabs.jpg"
            },
            {
        name: "Tunday Kebab",
        localName: "टुंडे कबाब",
        pronunciation: "Tun-de Ke-bab",
        description: "Famous fried buffalo meat kebabs from the legendary Tunday Kababi restaurant, a Lucknow institution since 1905.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tunday_Kebabs.jpg/500px-Tunday_Kebabs.jpg"
            },
            {
        name: "Lucknowi Biryani",
        localName: "लखनवी बिरयानी",
        pronunciation: "Lak-na-wi Bir-ya-ni",
        description: "A fragrant dum biryani with fried onion and subtle spicing — lighter and more aromatic than Hyderabadi biryani.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg"
            },
            {
        name: "Sheermal",
        localName: "शीरमाल",
        pronunciation: "Sheer-mal",
        description: "A saffron-flavoured sweet flatbread baked in a tandoor, traditionally eaten with kebabs or nihari.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sheermal_bread_made_in_Iran.jpg/500px-Sheermal_bread_made_in_Iran.jpg"
            },
            {
        name: "Kulfi Faluda",
        localName: "कुल्फी फालूदा",
        pronunciation: "Kul-fi Fa-lu-da",
        description: "Dense saffron-pistachio ice cream served over rose-flavoured faluda vermicelli and basil seeds — a Nawabi dessert institution.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Faluda.JPG/500px-Faluda.JPG"
            },
            {
        name: "Basket Chaat",
        localName: "बास्केट चाट",
        pronunciation: "Bas-ket Chaat",
        description: "A crispy fried flour basket filled with tikkis, chhole, curd, and chutneys — a unique Lucknow chaat creation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/500px-Dahi_puri%2C_Doi_phuchka.jpg"
            },
            {
        name: "Makkhan Malai",
        localName: "मक्खन मलाई",
        pronunciation: "Mak-khan Ma-lai",
        description: "An ethereal winter sweet of whipped morning dew, milk foam, and saffron, served only in the cold months in Lucknow.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Malaiyo_Pehalwaan_lassi_in_front_of_ravidas_gate_LANKA._Varanasi_Uttar_Pradesh.jpg/500px-Malaiyo_Pehalwaan_lassi_in_front_of_ravidas_gate_LANKA._Varanasi_Uttar_Pradesh.jpg"
            },
            {
        name: "Nihari",
        localName: "नहारी",
        pronunciation: "Ni-ha-ri",
        description: "Slow-cooked beef or mutton shank stew cooked overnight with wheat flour and aromatic spices — a traditional Lucknow morning dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nalli_Nihari_India.jpg/500px-Nalli_Nihari_India.jpg"
            },
            {
        name: "Roomali Roti",
        localName: "रूमाली रोटी",
        pronunciation: "Roo-ma-li Ro-ti",
        description: "A paper-thin, large, soft flatbread folded like a handkerchief, perfect with kebabs and curries in Lucknow's eateries.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Tandoori_roti_I_-_initial_contact_%28354969180%29.jpg/500px-Tandoori_roti_I_-_initial_contact_%28354969180%29.jpg"
            },
            {
        name: "Zarda",
        localName: "ज़र्दा",
        pronunciation: "Zar-da",
        description: "Sweetened yellow saffron rice cooked with sugar, dry fruits, and rose water — a Nawabi festive dessert rice.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Coloured_Zarda_Chawal.JPG/500px-Coloured_Zarda_Chawal.JPG"
            }
        ],
    places: [
            {
        name: "Bara Imambara",
        localName: "बड़ा इमामबाड़ा",
        pronunciation: "Ba-ra I-mam-ba-ra",
        description: "A massive 18th-century Shia Muslim shrine with a famous Bhool Bhulaiya (labyrinth), one of the largest vaulted halls in the world.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bara_Imambara_Lucknow.jpg/500px-Bara_Imambara_Lucknow.jpg"
            },
            {
        name: "Chota Imambara",
        localName: "छोटा इमामबाड़ा",
        pronunciation: "Cho-ta I-mam-ba-ra",
        description: "A 19th-century imambara with a beautiful mosque adorned with chandeliers and Belgian mirrors, known as the Palace of Lights.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chhota_imambara_Lucknow.jpg/500px-Chhota_imambara_Lucknow.jpg"
            },
            {
        name: "Rumi Darwaza",
        localName: "रूमी दरवाज़ा",
        pronunciation: "Ru-mi Dar-wa-za",
        description: "An imposing 18th-century gateway 60 feet tall, built in Awadhi architectural style — the emblematic gate of Lucknow.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rumi_Darwaza_-_DSC2797-01.jpg/500px-Rumi_Darwaza_-_DSC2797-01.jpg"
            },
            {
        name: "Hazratganj",
        localName: "हज़रतगंज",
        pronunciation: "Haz-rat-ganj",
        description: "Lucknow's historic shopping boulevard with colonial-era buildings, bookshops, cafes, and a vibrant promenading culture.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hazratganj_Lucknow.jpg/500px-Hazratganj_Lucknow.jpg"
            },
            {
        name: "Lucknow Zoo",
        localName: "नवाब वाजिद अली शाह जूलॉजिकल गार्डन",
        pronunciation: "Luc-know Zoo",
        description: "One of India's oldest zoos established in 1921, home to rare albino species, elephants, and a popular toy train.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Birds_at_Nawab_Wajid_Ali_Shah_Prani_Udyan.jpg/500px-Birds_at_Nawab_Wajid_Ali_Shah_Prani_Udyan.jpg"
            },
            {
        name: "Residency",
        localName: "रेज़ीडेंसी",
        pronunciation: "Res-i-den-cy",
        description: "A complex of ruined buildings that witnessed the famous Siege of Lucknow during the 1857 uprising, now a protected monument.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Office_-_The_Residency_-_Lucknow_-_India.jpg/500px-Office_-_The_Residency_-_Lucknow_-_India.jpg"
            },
            {
        name: "Janeshwar Mishra Park",
        localName: "जनेश्वर मिश्र पार्क",
        pronunciation: "Ja-nesh-war Mis-ra Park",
        description: "One of Asia's largest parks at 376 acres, featuring a lake, cycling tracks, and an eco-friendly design in Lucknow.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Janeshwar_Mishra_Park.jpg/500px-Janeshwar_Mishra_Park.jpg"
            },
            {
        name: "Ambedkar Memorial Park",
        localName: "डॉ. भीमराव अम्बेडकर स्मारक",
        pronunciation: "Am-bed-kar Me-mo-rial Park",
        description: "A vast memorial park with an elephant-motif design honouring Dr. B.R. Ambedkar, featuring red sandstone monuments and tall pillars.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Night_View_of_the_Ambedkar_Memorial_at_Lucknow.jpg/500px-Night_View_of_the_Ambedkar_Memorial_at_Lucknow.jpg"
            },
            {
        name: "Dilkusha Kothi",
        localName: "दिलकुशा कोठी",
        pronunciation: "Dil-ku-sha Ko-thi",
        description: "A ruined 18th-century baroque-style hunting lodge surrounded by gardens, heavily damaged during the 1857 uprising.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Dilkusha6.jpg/500px-Dilkusha6.jpg"
            },
            {
        name: "State Museum Lucknow",
        localName: "राज्य संग्रहालय",
        pronunciation: "State Mu-se-um",
        description: "A fine museum housing Kushana-era sculptures, Mughal miniatures, bronzes, coins, and natural history exhibits.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/State_Museum_Lucknow.png/500px-State_Museum_Lucknow.png"
            }
        ]
    },

  Kochi: {
    foods: [
            {
        name: "Kerala Fish Curry",
        localName: "മീൻ കറി",
        pronunciation: "Meen Kar-ri",
        description: "Tangy fish curry cooked in raw coconut oil with kodampuli (Malabar tamarind) and coconut milk — a staple of every Kerala home.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meen_curry_2.JPG/500px-Meen_curry_2.JPG"
            },
            {
        name: "Appam with Stew",
        localName: "അപ്പം ഇഷ്ടൂ",
        pronunciation: "Ap-pam Is-tu",
        description: "Lacy fermented rice hoppers with a crispy edge and soft centre, paired with mild coconut milk vegetable or chicken stew.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg/500px-Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg"
            },
            {
        name: "Puttu and Kadala Curry",
        localName: "പുട്ടും കടലയും",
        pronunciation: "Put-tu Ka-da-la",
        description: "Steamed cylindrical rice flour cakes served with spicy black chickpea curry — a quintessential Kerala breakfast combination.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Puttu_%28Rice_Flour_steamed_cake%29.jpg/500px-Puttu_%28Rice_Flour_steamed_cake%29.jpg"
            },
            {
        name: "Karimeen Pollichathu",
        localName: "കരിമീൻ പൊള്ളിച്ചത്",
        pronunciation: "Ka-ri-meen Pol-li-cha-thu",
        description: "Pearl spot fish marinated in spices and wrapped in a banana leaf to be pan-roasted — a delicacy of the Kuttanad backwaters.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Karimeen_Pollichathu.jpg/500px-Karimeen_Pollichathu.jpg"
            },
            {
        name: "Kerala Sadya",
        localName: "കേരള സദ്യ",
        pronunciation: "Sa-dya",
        description: "A grand vegetarian feast of 24+ dishes served on a banana leaf for festivals like Onam, including avial, kootu, payasam, and more.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Sadhya_DSW.jpg/500px-Sadhya_DSW.jpg"
            },
            {
        name: "Prawn Moilee",
        localName: "ചെമ്മീൻ മോളി",
        pronunciation: "Chem-meen Mo-li",
        description: "A delicate, golden coconut milk-based prawn curry with green chillies and turmeric, a signature Kochi seafood dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Prawn_Curry.JPG/500px-Prawn_Curry.JPG"
            },
            {
        name: "Banana Chips",
        localName: "പഴം പൊടി",
        pronunciation: "Nendran Chip-pa",
        description: "Crispy, salted wafer-thin chips made from Kerala's native Nendran banana fried in coconut oil, a universal Kerala snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Chips_de_bananes_de_S%C3%A3o_Tom%C3%A9-et-Pr%C3%ADncipe.jpg/500px-Chips_de_bananes_de_S%C3%A3o_Tom%C3%A9-et-Pr%C3%ADncipe.jpg"
            },
            {
        name: "Ela Ada",
        localName: "ഇല അട",
        pronunciation: "E-la A-da",
        description: "Steamed rice parcels filled with coconut-jaggery mixture, wrapped in a banana leaf — a traditional Kerala snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ada_or_Ela_Ada.jpg/500px-Ada_or_Ela_Ada.jpg"
            },
            {
        name: "Malabar Biryani",
        localName: "മലബാർ ബിരിയാണി",
        pronunciation: "Ma-la-bar Bir-ya-ni",
        description: "A fragrant rice dish using Jeerakasala rice with meat, fried onions, and spices — distinct from other Indian biryanis.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg"
            },
            {
        name: "Palada Payasam",
        localName: "പാലട പായസം",
        pronunciation: "Pa-la-da Pa-ya-sam",
        description: "A rich, creamy rice ada pudding in reduced milk with sugar — a GI-tagged Kerala dessert and Onam Sadya essential.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/500px-Kheer.jpg"
            }
        ],
    places: [
            {
        name: "Fort Kochi Beach",
        localName: "ഫോർട്ട് കൊച്ചി ബീച്ച്",
        pronunciation: "Fort Ko-chi Beach",
        description: "A historic seaside promenade lined with colonial buildings, Chinese fishing nets, and a vibrant café and art scene.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kochi%2C_Fishing_nets_at_sunset%2C_Kerala%2C_India.jpg/500px-Kochi%2C_Fishing_nets_at_sunset%2C_Kerala%2C_India.jpg"
            },
            {
        name: "Chinese Fishing Nets",
        localName: "ചൈനീസ് വലകൾ",
        pronunciation: "Chi-nese Fish-ing Nets",
        description: "Giant cantilevered fishing nets fixed to the shore, introduced by traders from China — a iconic Kochi waterfront landmark.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg/500px-Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg"
            },
            {
        name: "Mattancherry Palace",
        localName: "മട്ടാഞ്ചേരി കൊട്ടാരം",
        pronunciation: "Mat-tan-che-ri Pal-ace",
        description: "A 16th-century Portuguese-built palace known for stunning Kerala murals depicting Ramayana scenes, later renovated by the Dutch.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mattancherry_Palace_DSC_0899.JPG/500px-Mattancherry_Palace_DSC_0899.JPG"
            },
            {
        name: "Jewish Synagogue Paradesi",
        localName: "ജൂത സിനഗോഗ്",
        pronunciation: "Pa-ra-desi Syn-agogue",
        description: "The oldest active synagogue in the Commonwealth, built in 1568 in Jew Town, adorned with blue Chinese hand-painted tiles.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Jewish_synagouge_kochi_india.jpg/500px-Jewish_synagouge_kochi_india.jpg"
            },
            {
        name: "Backwater Cruise",
        localName: "ബോട്ടുയാത്ര",
        pronunciation: "Back-wa-ter Cruise",
        description: "Houseboat cruises through Kerala's tranquil canal network passing paddy fields, coir villages, and coconut groves.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/500px-House_Boat_DSW.jpg"
            },
            {
        name: "Hill Palace Museum",
        localName: "ഹിൽ പാലസ് മ്യൂസിയം",
        pronunciation: "Hill Pal-ace Mu-se-um",
        description: "The largest archaeological museum in Kerala, housed in a 49-building complex and former royal residence of the Cochin royal family.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Hill_Palace_Cochin_%2824176740822%29.jpg/500px-Hill_Palace_Cochin_%2824176740822%29.jpg"
            },
            {
        name: "St. Francis Church",
        localName: "സെന്റ് ഫ്രാൻസിസ് ദേവാലയം",
        pronunciation: "St. Fran-cis Church",
        description: "India's oldest European church built in 1503, where Vasco da Gama was originally buried before his remains were moved to Portugal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/St_Francis_Church_Fort_Kochi_DSC_1048.JPG/500px-St_Francis_Church_Fort_Kochi_DSC_1048.JPG"
            },
            {
        name: "Cherai Beach",
        localName: "ചേരായ് ബീച്ച്",
        pronunciation: "Che-rai Beach",
        description: "A serene 15 km beach on Vypeen Island where the Arabian Sea meets the backwaters, known for dolphins and golden sands.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sunrise_at_Cherai_Beach.jpg/500px-Sunrise_at_Cherai_Beach.jpg"
            },
            {
        name: "Wonderla Amusement Park",
        localName: "വണ്ടർ ല",
        pronunciation: "Won-der-la",
        description: "South India's most popular amusement park with thrilling rides, wave pools, and water slides on Kochi's outskirts.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Veegaland_full_view.JPG/500px-Veegaland_full_view.JPG"
            },
            {
        name: "Jew Town",
        localName: "ജൂതത്തെരുവ്",
        pronunciation: "Jew Town",
        description: "A heritage street in Mattancherry with antique shops, spice merchants, and the famous Paradesi Synagogue — a cultural treasure trove.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Jew_Street_Mattancherry%2C_Fort_Kochi%2C_Ernakulam%2C_Kerala%2C_India_IMG_20190526_150112.jpg/500px-Jew_Street_Mattancherry%2C_Fort_Kochi%2C_Ernakulam%2C_Kerala%2C_India_IMG_20190526_150112.jpg"
            }
        ]
    },

  Chandigarh: {
    foods: [
            {
        name: "Chole Bhature",
        localName: "ਛੋਲੇ ਭਟੂਰੇ",
        pronunciation: "Cho-le Bha-tu-re",
        description: "Spicy chickpea curry with large puffy fried bread — a beloved Punjabi breakfast staple widely enjoyed in Chandigarh.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/500px-Chole_Bhature_from_Nagpur.JPG"
            },
            {
        name: "Amritsari Kulcha",
        localName: "ਅੰਮ੍ਰਿਤਸਰੀ ਕੁਲਚਾ",
        pronunciation: "Am-rit-sa-ri Kul-cha",
        description: "A layered, stuffed leavened bread baked in a tandoor and served with chole and butter — a classic Punjabi treat.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Chole_Kulcha_Meal_-_Order_Food_Online_in_Mumbai_%2831013272937%29.jpg/500px-Chole_Kulcha_Meal_-_Order_Food_Online_in_Mumbai_%2831013272937%29.jpg"
            },
            {
        name: "Makki di Roti with Sarson da Saag",
        localName: "ਮੱਕੀ ਦੀ ਰੋਟੀ ਅਤੇ ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ",
        pronunciation: "Mak-ki di Ro-ti Sar-son da Saag",
        description: "Cornmeal flatbread paired with slow-cooked mustard greens and dollops of white butter — the soul of a Punjabi winter meal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Saagroti.jpg/500px-Saagroti.jpg"
            },
            {
        name: "Butter Chicken",
        localName: "ਬਟਰ ਚਿਕਨ",
        pronunciation: "But-ter Chi-cken",
        description: "Tandoori chicken in a creamy, mildly spiced tomato-butter sauce, a globally beloved dish with Punjabi origins.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/500px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg"
            },
            {
        name: "Lassi",
        localName: "ਲੱਸੀ",
        pronunciation: "Las-si",
        description: "Thick, creamy churned yoghurt drink topped with cream and optionally flavoured with rose, mango, or served salted.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/500px-Salt_lassi.jpg"
            },
            {
        name: "Aloo Paratha",
        localName: "ਆਲੂ ਪਰਾਠਾ",
        pronunciation: "A-lu Pa-ra-tha",
        description: "Whole wheat flatbread stuffed with spiced mashed potatoes, cooked on a tawa with generous butter — a Punjabi breakfast classic.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/500px-Triangle_paratha_%28cropped%29.JPG"
            },
            {
        name: "Pinni",
        localName: "ਪਿੰਨੀ",
        pronunciation: "Pin-ni",
        description: "Dense round balls made from wheat flour, ghee, and sugar, fortified with nuts and dry fruits — a traditional Punjabi winter sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pinni_cropped.JPG/500px-Pinni_cropped.JPG"
            },
            {
        name: "Tandoori Chicken",
        localName: "ਤੰਦੂਰੀ ਚਿਕਨ",
        pronunciation: "Tan-doo-ri Chic-ken",
        description: "Whole chicken marinated in yoghurt and spices, roasted in a clay tandoor oven to give a smoky charred finish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Chickentandoori.jpg/500px-Chickentandoori.jpg"
            },
            {
        name: "Pindi Chana",
        localName: "ਪਿੰਡੀ ਛੋਲੇ",
        pronunciation: "Pin-di Cha-na",
        description: "Dried chickpeas cooked in a dark, rich, dry masala without gravy — a robust and flavourful Punjabi chickpea preparation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/500px-Chana_masala.jpg"
            },
            {
        name: "Gajar Ka Halwa",
        localName: "ਗਾਜਰ ਦਾ ਹਲਵਾ",
        pronunciation: "Ga-jar Ka Hal-wa",
        description: "Shredded carrots slow-cooked in milk, ghee, and sugar with cardamom and nuts — a beloved North Indian winter dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cuisine_%28268%29_44.jpg/500px-Cuisine_%28268%29_44.jpg"
            }
        ],
    places: [
            {
        name: "Rock Garden",
        localName: "ਰਾਕ ਗਾਰਡਨ",
        pronunciation: "Rock Gar-den",
        description: "A unique 40-acre sculpture garden by artist Nek Chand made entirely from recycled industrial and urban waste.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/500px-Chandigarh_Rock_Garden_4.jpg"
            },
            {
        name: "Sukhna Lake",
        localName: "ਸੁਖਨਾ ਝੀਲ",
        pronunciation: "Suk-hna Lake",
        description: "A serene man-made reservoir at the foothills of the Shivaliks, perfect for boating, morning walks, and birdwatching.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sukhna_Lake_Chandigarh_India.jpg/500px-Sukhna_Lake_Chandigarh_India.jpg"
            },
            {
        name: "Capitol Complex",
        localName: "ਕੈਪੀਟਲ ਕੰਪਲੈਕਸ",
        pronunciation: "Cap-i-tol Com-plex",
        description: "A UNESCO World Heritage masterpiece by Le Corbusier, featuring the High Court, Secretariat, and Assembly buildings.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palace_of_Assembly_Chandigarh_2006.jpg/500px-Palace_of_Assembly_Chandigarh_2006.jpg"
            },
            {
        name: "Rose Garden",
        localName: "ਜ਼ਾਕਿਰ ਹੁਸੈਨ ਰੋਜ਼ ਗਾਰਡਨ",
        pronunciation: "Za-kir Hu-sain Rose Gar-den",
        description: "Asia's largest rose garden with 1,600 varieties of roses over 30 acres, blooming spectacularly every February–March.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rose_Garden_%2CChandigarh%2CIndia.jpg/500px-Rose_Garden_%2CChandigarh%2CIndia.jpg"
            },
            {
        name: "Sector 17 Plaza",
        localName: "ਸੈਕਟਰ 17 ਪਲਾਜ਼ਾ",
        pronunciation: "Sec-tor 17 Pla-za",
        description: "Chandigarh's open-air pedestrian commercial and cultural hub designed by Le Corbusier, buzzing with shops and eateries.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Rooster_Fountain%2C_Sector_17_Chandigarh.jpg/500px-Rooster_Fountain%2C_Sector_17_Chandigarh.jpg"
            },
            {
        name: "Government Museum and Art Gallery",
        localName: "ਸਰਕਾਰੀ ਅਜਾਇਬਘਰ",
        pronunciation: "Gov-ern-ment Mu-se-um",
        description: "A fine museum housing Gandhara sculptures, Pahari miniature paintings, and a significant collection of modern Indian art.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Chandigarh_Museum_and_Art_Gallery.jpg/500px-Chandigarh_Museum_and_Art_Gallery.jpg"
            },
            {
        name: "Elante Mall",
        localName: "ਏਲਾਂਤੇ ਮਾਲ",
        pronunciation: "E-lante Mall",
        description: "North India's largest shopping mall with over 250 brands, a multiplex, food court, and entertainment zones.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Elante_Mall%2C_Chandigarh.jpg/500px-Elante_Mall%2C_Chandigarh.jpg"
            },
            {
        name: "Pinjore Garden",
        localName: "ਪਿੰਜੌਰ ਬਾਗ਼",
        pronunciation: "Pin-jore Gar-den",
        description: "A 17th-century Mughal terraced garden 20 km from Chandigarh, with fountains, pavilions, and a heritage museum.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Pinjore_Garden_Panchkula.jpg/500px-Pinjore_Garden_Panchkula.jpg"
            },
            {
        name: "Chhatbir Zoo",
        localName: "ਛੱਤਬੀੜ ਚਿੜੀਆਘਰ",
        pronunciation: "Chhat-bir Zoo",
        description: "A wildlife park 25 km from Chandigarh featuring a lion safari, white tiger enclosure, and spacious natural habitats.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Chhatbir_Zoo%2C_Chandigarh.jpeg/500px-Chhatbir_Zoo%2C_Chandigarh.jpeg"
            },
            {
        name: "Open Hand Monument",
        localName: "ਓਪਨ ਹੈਂਡ ਮੋਨੂਮੈਂਟ",
        pronunciation: "O-pen Hand Mon-u-ment",
        description: "Le Corbusier's iconic 26-metre spinning steel sculpture symbolising 'open to give, open to receive' — the official emblem of Chandigarh.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Chandigarh_Capitol_Complex_-_Le_Corbusier_-_Open_hand_monument.jpg/500px-Chandigarh_Capitol_Complex_-_Le_Corbusier_-_Open_hand_monument.jpg"
            }
        ]
    },

  Bhubaneswar: {
    foods: [
            {
        name: "Dalma",
        localName: "ଡାଲ୍ମା",
        pronunciation: "Dal-ma",
        description: "A wholesome Odia dish of lentils cooked with vegetables and tempered with panch phutana spices — served as prasad at Jagannath Temple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Dalma%28dish%29.jpg/500px-Dalma%28dish%29.jpg"
            },
            {
        name: "Pakhala Bhata",
        localName: "ପଖାଳ ଭାତ",
        pronunciation: "Pa-kha-la Bha-ta",
        description: "Fermented or watered rice left overnight, served with fried fish, badi, and pickle — Odisha's beloved summer staple.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pakhala_01.jpg/500px-Pakhala_01.jpg"
            },
            {
        name: "Chhena Poda",
        localName: "ଛେନା ପୋଡ଼ା",
        pronunciation: "Chhe-na Po-da",
        description: "A rustic caramelised cottage cheese cake baked on sal leaves — Odisha's beloved GI-tagged dessert, literally 'burnt cheese.'",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Bhubaneswar_Odia_Meetup_2013Jan29-23.JPG/500px-Bhubaneswar_Odia_Meetup_2013Jan29-23.JPG"
            },
            {
        name: "Manda Pitha",
        localName: "ମାଣ୍ଡ ପିଠା",
        pronunciation: "Man-da Pi-tha",
        description: "Steamed rice flour dumplings filled with coconut-jaggery stuffing — one of many traditional Odia pithas (rice cakes).",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/SIJHA_MANDA.jpg/500px-SIJHA_MANDA.jpg"
            },
            {
        name: "Rasabali",
        localName: "ରସବଲି",
        pronunciation: "Ra-sa-ba-li",
        description: "Deep-fried flattened cottage cheese discs soaked in thickened, cardamom-flavoured sweetened milk — a GI-tagged Odia sweet from Kendrapara.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rasabali%2C_Odisha_traditional_sweet.jpg/500px-Rasabali%2C_Odisha_traditional_sweet.jpg"
            },
            {
        name: "Machha Besara",
        localName: "ମାଛ ବେସର",
        pronunciation: "Ma-chha Be-sa-ra",
        description: "Fish cooked in a pungent mustard and cumin paste with turmeric and green chillies — a traditional Odia fish curry.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Traditional_Odial_Lunch_Thali.jpg/500px-Traditional_Odial_Lunch_Thali.jpg"
            },
            {
        name: "Santula",
        localName: "ସନ୍ତୁଳା",
        pronunciation: "San-tu-la",
        description: "A lightly boiled and tempered vegetable medley with minimal oil and spices, a healthy Odia everyday vegetable preparation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Traditional_Odial_Lunch_Thali.jpg/500px-Traditional_Odial_Lunch_Thali.jpg"
            },
            {
        name: "Khiri",
        localName: "ଖିରି",
        pronunciation: "Khi-ri",
        description: "Creamy Odia rice pudding cooked with milk, sugar, and coconut — offered as prasad at temples and served at festivals.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/500px-Kheer.jpg"
            },
            {
        name: "Dahi Bara Aloo Dum",
        localName: "ଦହି ବଡ଼ା ଆଳୁ ଦମ",
        pronunciation: "Da-hi Ba-ra A-lu Dum",
        description: "Lentil dumplings soaked in yoghurt served alongside spiced potato curry — a favourite Odia street food combo.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG/500px-Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG"
            },
            {
        name: "Chhena Jhili",
        localName: "ଛେନା ଝିଲ୍ଲି",
        pronunciation: "Chhe-na Jhi-li",
        description: "Deep-fried cottage cheese balls soaked in sugar syrup from Nimapara town — a crispy and syrupy GI-tagged Odia sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Food-chhanar-jilipi.jpg/500px-Food-chhanar-jilipi.jpg"
            }
        ],
    places: [
            {
        name: "Lingaraj Temple",
        localName: "ଲିଙ୍ଗରାଜ ମନ୍ଦିର",
        pronunciation: "Lin-ga-raj Tem-ple",
        description: "An 11th-century magnificent Kalinga architecture temple dedicated to Lord Shiva (Harihara), the largest temple in Bhubaneswar.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lingaraj_Temple_%2C_Bhubaneswar.jpg/500px-Lingaraj_Temple_%2C_Bhubaneswar.jpg"
            },
            {
        name: "Mukteshwar Temple",
        localName: "ମୁକ୍ତେଶ୍ୱର ମନ୍ଦିର",
        pronunciation: "Muk-tesh-war Tem-ple",
        description: "A gem of Kalinga architecture from the 10th century, famous for its exquisitely carved torana (ornamental archway).",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muktesvar_Temple.jpg/500px-Muktesvar_Temple.jpg"
            },
            {
        name: "Udayagiri and Khandagiri Caves",
        localName: "ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରି ଗୁଫା",
        pronunciation: "U-day-gi-ri Khand-gi-ri Caves",
        description: "Ancient Jain rock-cut caves from the 2nd century BCE with carved inscriptions and reliefs, offering panoramic city views.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Khandagari_and_Udaygiri_featured_image.jpg/500px-Khandagari_and_Udaygiri_featured_image.jpg"
            },
            {
        name: "Odisha State Museum",
        localName: "ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟ",
        pronunciation: "O-di-sha State Mu-se-um",
        description: "A comprehensive museum showcasing Odia tribal art, palm leaf manuscripts, ancient coins, and natural history collections.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bhubaneswar_State_Museum.jpg/500px-Bhubaneswar_State_Museum.jpg"
            },
            {
        name: "Nandankanan Zoo",
        localName: "ନନ୍ଦନକାନନ ପ୍ରାଣୀ ଉଦ୍ୟାନ",
        pronunciation: "Nan-dan-ka-nan Zoo",
        description: "A world-famous zoo and botanical garden known for successfully breeding rare white tigers and gharials in captivity.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg/500px-Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg"
            },
            {
        name: "Parasuramesvara Temple",
        localName: "ପରଶୁରାମେଶ୍ୱର ମନ୍ଦିର",
        pronunciation: "Pa-ra-su-ra-mesh-wa-ra Tem-ple",
        description: "Bhubaneswar's best-preserved 7th-century temple, with intricately carved panels depicting amorous couples and folk motifs.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Parsurameswara_temple_complex.jpg/500px-Parsurameswara_temple_complex.jpg"
            },
            {
        name: "Rajarani Temple",
        localName: "ରାଜରାଣୀ ମନ୍ଦିର",
        pronunciation: "Ra-ja-ra-ni Tem-ple",
        description: "An 11th-century temple renowned for its intricate erotic carvings and tower of interlocking miniature towers, now a garden monument.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rajarani_Temple_2.jpg/500px-Rajarani_Temple_2.jpg"
            },
            {
        name: "ISKCON Bhubaneswar",
        localName: "ଇସ୍କନ ଭୁବନେଶ୍ୱର",
        pronunciation: "IS-KON Tem-ple",
        description: "A beautifully designed Hare Krishna temple complex in Bhubaneswar with an exquisite shrine, gardens, and cultural centre.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Iskon_Temple%2C_Vrindawan.jpg/500px-Iskon_Temple%2C_Vrindawan.jpg"
            },
            {
        name: "Dhauli Peace Pagoda",
        localName: "ଧଉଳି ଶାନ୍ତି ସ୍ତୂପ",
        pronunciation: "Dhau-li Peace Pa-go-da",
        description: "A white Shanti Stupa built by Japanese Buddhists atop Dhauli Hill, commemorating Ashoka's transformation after the Kalinga War.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/ShantiSthupa_Dhauli.jpg/500px-ShantiSthupa_Dhauli.jpg"
            },
            {
        name: "Ekamra Haat",
        localName: "ଏକାମ୍ର ହାଟ",
        pronunciation: "E-kam-ra Haat",
        description: "A crafts village market showcasing Pattachitra paintings, Dokra metalwork, and tribal handicrafts from across Odisha.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Bhubaneswar_at_night_from_sky.jpg/500px-Bhubaneswar_at_night_from_sky.jpg"
            }
        ]
    },

  Guwahati: {
    foods: [
            {
        name: "Masor Tenga",
        localName: "মাছৰ টেঙা",
        pronunciation: "Ma-sor Ten-ga",
        description: "A light, sour fish curry made with tomatoes, elephant apple (ou tenga), or lemon — a hallmark of Assamese cuisine.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            },
            {
        name: "Pitha",
        localName: "পিঠা",
        pronunciation: "Pi-tha",
        description: "Traditional Assamese rice cakes made during Bihu festivals, available in steamed (bhapot diya), fried, or rolled forms.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg/500px-Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg"
            },
            {
        name: "Aloo Pitika",
        localName: "আলু পিটিকা",
        pronunciation: "A-lu Pi-ti-ka",
        description: "Mashed boiled potatoes mixed with mustard oil, onion, green chillies, and coriander — a simple Assamese everyday dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            },
            {
        name: "Duck Curry",
        localName: "হাঁহৰ মাংস",
        pronunciation: "Haah-or Maang-so",
        description: "Assamese roasted duck curry cooked with ash gourd (lau) and aromatic spices — a prized non-vegetarian delicacy.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            },
            {
        name: "Khar",
        localName: "খাৰ",
        pronunciation: "Khar",
        description: "An alkaline preparation cooked with raw papaya or pulses using filtered water from dried banana peel ash — unique to Assam.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            },
            {
        name: "Assam Tea",
        localName: "অসমীয়া চাহ",
        pronunciation: "As-sam Cha",
        description: "Bold, malty, full-bodied black tea grown in the Brahmaputra valley — one of the world's finest teas drunk with milk and sugar.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Assam-Tee_SFTGFOP1.jpg/500px-Assam-Tee_SFTGFOP1.jpg"
            },
            {
        name: "Poita Bhat",
        localName: "পইতা ভাত",
        pronunciation: "Poi-ta Bhat",
        description: "Fermented leftover rice soaked overnight in water, eaten with salt, mustard oil, and onion — an ancient Assamese breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            },
            {
        name: "Til Pitha",
        localName: "তিল পিঠা",
        pronunciation: "Til Pi-tha",
        description: "Thin rolled rice flour crepes stuffed with sesame seeds and jaggery — a special Bihu festival delicacy of Assam.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg/500px-Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg"
            },
            {
        name: "Sunga Pitha",
        localName: "চুঙা পিঠা",
        pronunciation: "Su-nga Pi-tha",
        description: "Glutinous rice cooked inside bamboo tubes over an open fire, a traditional Assamese tribal preparation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg/500px-Pitha_for_Wedding-_Pakan%2C_Patishapta%2C_Bharandash.jpg"
            },
            {
        name: "Eri Polu",
        localName: "এৰি পলু",
        pronunciation: "E-ri Po-lu",
        description: "Fried silkworm pupae — a protein-rich tribal delicacy popular among indigenous communities of Assam.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Assamese_Thali.jpg/500px-Assamese_Thali.jpg"
            }
        ],
    places: [
            {
        name: "Kamakhya Temple",
        localName: "কামাখ্যা মন্দিৰ",
        pronunciation: "Ka-mak-hya Tem-ple",
        description: "One of India's most important Shakti peethas, situated atop Nilachal Hill, dedicated to the goddess Kamakhya.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/500px-Kamakhya_Temple_-_DEV_8829.jpg"
            },
            {
        name: "Umananda Island",
        localName: "উমানন্দ দ্বীপ",
        pronunciation: "U-ma-nan-da Is-land",
        description: "A tiny peacock island on the Brahmaputra river housing a Shiva temple, accessible by ferry and home to rare golden langurs.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Chandrasekhar_Temple%2C_Umananda.jpg/500px-Chandrasekhar_Temple%2C_Umananda.jpg"
            },
            {
        name: "Kaziranga National Park",
        localName: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান",
        pronunciation: "Ka-zi-ran-ga Park",
        description: "A UNESCO World Heritage Site hosting two-thirds of the world's one-horned rhinoceros population, along with tigers and elephants.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/500px-Beauty_of_Kaziranga_National_Park.jpg"
            },
            {
        name: "Assam State Zoo",
        localName: "অসম ৰাজ্য চিৰিয়াখানা",
        pronunciation: "As-sam Zoo",
        description: "A zoo and botanical garden housing rare Northeast Indian wildlife including clouded leopards, pygmy hogs, and Hoolock gibbons.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/ASSAM_STATE_ZOO_CUM_BOTANICAL_GARDEN%2C_GUWAHATI%21_01.jpg/500px-ASSAM_STATE_ZOO_CUM_BOTANICAL_GARDEN%2C_GUWAHATI%21_01.jpg"
            },
            {
        name: "Brahmaputra River Cruise",
        localName: "ব্ৰহ্মপুত্ৰ নদী ভ্ৰমণ",
        pronunciation: "Brah-ma-pu-tra Cruise",
        description: "Evening cruises on India's mightiest river offering stunning sunset views of Guwahati's skyline and Umananda Island.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ganges-Brahmaputra-Meghna_basins.jpg/500px-Ganges-Brahmaputra-Meghna_basins.jpg"
            },
            {
        name: "Srimanta Sankardev Kalakshetra",
        localName: "শ্ৰীমন্ত শংকৰদেৱ কলাক্ষেত্ৰ",
        pronunciation: "Kal-ak-she-tra",
        description: "A cultural campus celebrating Assam's saint-reformer Srimanta Sankardev, with museums, open-air theatres, and craft centres.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Gatway_of_Kalakhetra%2C_Guwahati%2C_Assam.jpg/500px-Gatway_of_Kalakhetra%2C_Guwahati%2C_Assam.jpg"
            },
            {
        name: "Madan Kamdev",
        localName: "মদন কামদেৱ",
        pronunciation: "Ma-dan Kam-dev",
        description: "A ruined 9th-11th century temple complex 35 km from Guwahati, known as the 'Khajuraho of Assam' for its erotic sculptures.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Madan_Kamdev_8.jpg/500px-Madan_Kamdev_8.jpg"
            },
            {
        name: "Pobitora Wildlife Sanctuary",
        localName: "পবিতৰা অভয়াৰণ্য",
        pronunciation: "Po-bi-to-ra Sanc-tu-ary",
        description: "A compact sanctuary 50 km from Guwahati with the world's highest density of Indian one-horned rhinoceroses.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Indian_Rhino_in_Pobitora.jpg/500px-Indian_Rhino_in_Pobitora.jpg"
            },
            {
        name: "Navagraha Temple",
        localName: "নৱগ্ৰহ মন্দিৰ",
        pronunciation: "Na-va-gra-ha Tem-ple",
        description: "A unique hilltop temple dedicated to nine planetary deities, historically significant as Assam's ancient centre for astronomical study.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Navagraha_Temple%2C_Guwahati_01.jpg/500px-Navagraha_Temple%2C_Guwahati_01.jpg"
            },
            {
        name: "Fancy Bazaar",
        localName: "ফেন্সী বজাৰ",
        pronunciation: "Fan-cy Ba-zar",
        description: "Guwahati's busiest commercial hub selling everything from silk mekhela chadors to electronics, spices, and street food.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Guwahati_citysky.jpg/500px-Guwahati_citysky.jpg"
            }
        ]
    },

  Varanasi: {
    foods: [
            {
        name: "Banarasi Paan",
        localName: "बनारसी पान",
        pronunciation: "Ba-na-ra-si Paan",
        description: "Betel leaf stuffed with areca nut, gulkand, and various sweet or meetha fillings — a fragrant end to every Banaras meal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Betel_1.jpg/500px-Betel_1.jpg"
            },
            {
        name: "Kachori Sabzi",
        localName: "कचोरी सब्ज़ी",
        pronunciation: "Ka-cho-ri Sab-zi",
        description: "Crispy fried pastries with spiced lentil filling, served with spicy aloo sabzi and tamarind chutney — Varanasi's quintessential breakfast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rajasthani_Raj_Kachori.jpg/500px-Rajasthani_Raj_Kachori.jpg"
            },
            {
        name: "Banarasi Thandai",
        localName: "बनारसी ठंडाई",
        pronunciation: "Ba-na-ra-si Thand-ai",
        description: "A chilled milk drink blended with almonds, fennel, rose petals, pepper, and cardamom — a staple of Holi celebrations in Varanasi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thandai_%28Spiced_Indian_Milk_Drink%29.JPG/500px-Thandai_%28Spiced_Indian_Milk_Drink%29.JPG"
            },
            {
        name: "Malaiyo",
        localName: "मलैयो",
        pronunciation: "Ma-lai-yo",
        description: "An airy, frothy winter sweet made from whipped milk, saffron, and rose water — available only in winter mornings in Varanasi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Malaiyo_Pehalwaan_lassi_in_front_of_ravidas_gate_LANKA._Varanasi_Uttar_Pradesh.jpg/500px-Malaiyo_Pehalwaan_lassi_in_front_of_ravidas_gate_LANKA._Varanasi_Uttar_Pradesh.jpg"
            },
            {
        name: "Chena Dahi Vada",
        localName: "छेना दही वड़ा",
        pronunciation: "Chhe-na Da-hi Va-da",
        description: "Soft cottage cheese dumplings in yoghurt with tamarind chutney and spices — a distinctive Varanasi chaat item.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG/500px-Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG"
            },
            {
        name: "Rabri",
        localName: "रबड़ी",
        pronunciation: "Ra-bri",
        description: "Condensed sweetened milk with cardamom and rose water, served warm or chilled from Varanasi's famous milk sweet shops.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Homemade_Rabri.jpg/500px-Homemade_Rabri.jpg"
            },
            {
        name: "Tamatar Chaat",
        localName: "टमाटर चाट",
        pronunciation: "Ta-ma-tar Chaat",
        description: "A spicy, tangy chaat made with tomatoes, peas, and toppings unique to Varanasi's Vishwanath Gali street food lane.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/500px-Dahi_puri%2C_Doi_phuchka.jpg"
            },
            {
        name: "Aloo Tikki",
        localName: "आलू टिक्की",
        pronunciation: "A-lu Tik-ki",
        description: "Crispy spiced potato patties topped with chutneys and curd, a popular evening street snack along the Varanasi ghats.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/500px-Aloo_Tikki_served_with_chutneys.jpg"
            },
            {
        name: "Banarasi Lassi",
        localName: "बनारसी लस्सी",
        pronunciation: "Ba-na-ra-si Las-si",
        description: "Extra-thick creamy yoghurt drink served in a kulhad (clay cup) topped with malai and saffron strands.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/500px-Salt_lassi.jpg"
            },
            {
        name: "Malabar Halwa",
        localName: "मलाबार हलवा",
        pronunciation: "Ma-la-bar Hal-wa",
        description: "A dense, chewy saffron halwa made from maida and ghee, sold in Varanasi's sweet shops for centuries.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Orient_sweets_%28special_halva%29_Samarkand%2C_Siyab.jpg/500px-Orient_sweets_%28special_halva%29_Samarkand%2C_Siyab.jpg"
            }
        ],
    places: [
            {
        name: "Dashashwamedh Ghat",
        localName: "दशाश्वमेध घाट",
        pronunciation: "Da-shash-wa-medh Ghat",
        description: "The main ghat of Varanasi famous for the spectacular Ganga Aarti ceremony performed every evening by priests with fire lamps.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/500px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg"
            },
            {
        name: "Kashi Vishwanath Temple",
        localName: "काशी विश्वनाथ मंदिर",
        pronunciation: "Ka-shi Vish-wa-nath Tem-ple",
        description: "One of the 12 Jyotirlingas and the most sacred Shiva temple in India, recently renovated with an extensive temple corridor.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashi_Vishwanath.jpg/500px-Kashi_Vishwanath.jpg"
            },
            {
        name: "Manikarnika Ghat",
        localName: "मणिकर्णिका घाट",
        pronunciation: "Ma-ni-kar-ni-ka Ghat",
        description: "Varanasi's sacred cremation ghat where funeral pyres burn continuously — believed to grant liberation (moksha) to the departed.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Manikarnika_Ghat%2C_Varanasi%2C_Uttar_Pradesh%2C_India_%282011%29_5.jpg/500px-Manikarnika_Ghat%2C_Varanasi%2C_Uttar_Pradesh%2C_India_%282011%29_5.jpg"
            },
            {
        name: "Sarnath",
        localName: "सारनाथ",
        pronunciation: "Sar-nath",
        description: "A major Buddhist pilgrimage site 10 km from Varanasi where Buddha gave his first sermon after enlightenment, housing the Dhamek Stupa.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg/500px-Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg"
            },
            {
        name: "Banaras Hindu University",
        localName: "बनारस हिन्दू विश्वविद्यालय",
        pronunciation: "BHU",
        description: "Asia's largest residential university, founded in 1916 by Madan Mohan Malaviya, home to a famous Vishwanath temple and museum.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/BHU_Main_Gate%2C_Banaras_Hindu_University_enhanced.jpg/500px-BHU_Main_Gate%2C_Banaras_Hindu_University_enhanced.jpg"
            },
            {
        name: "Ramnagar Fort",
        localName: "रामनगर किला",
        pronunciation: "Ram-na-gar Fort",
        description: "An 18th-century fort of the Kashi Naresh on the opposite bank of the Ganga, housing a museum of vintage cars and weaponry.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Entrance_area_of_Ramnagar_Fort.jpg/500px-Entrance_area_of_Ramnagar_Fort.jpg"
            },
            {
        name: "Assi Ghat",
        localName: "अस्सी घाट",
        pronunciation: "As-si Ghat",
        description: "A vibrant ghat at the confluence of Assi and Ganga rivers, famous for morning yoga, classical music, and literary culture.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Assi_Ghat_Varanasi_morning_Aarti.jpg/500px-Assi_Ghat_Varanasi_morning_Aarti.jpg"
            },
            {
        name: "Tulsi Manas Temple",
        localName: "तुलसी मानस मंदिर",
        pronunciation: "Tul-si Ma-nas Tem-ple",
        description: "A white marble temple built in 1964 at the site where saint-poet Tulsidas wrote the Ramcharitmanas, with mechanical Ramayana dioramas.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Manas_Mandir.jpg/500px-Manas_Mandir.jpg"
            },
            {
        name: "Chunar Fort",
        localName: "चुनार किला",
        pronunciation: "Chu-nar Fort",
        description: "A strategic hilltop fort 23 km from Varanasi on the banks of the Ganga, occupied by Humayun, Sher Shah Suri, and the British.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/North_view_of_the_fort_of_Chunargarh_on_the_Ganges_from_across_the_river..jpg/500px-North_view_of_the_fort_of_Chunargarh_on_the_Ganges_from_across_the_river..jpg"
            },
            {
        name: "Ganga Boat Ride",
        localName: "गंगा नाव यात्रा",
        pronunciation: "Gan-ga Boat Ride",
        description: "A sunrise rowing boat journey along Varanasi's 84 ghats, revealing the ancient city's spiritual life, temples, and rituals.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/500px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg"
            }
        ]
    },

  Patna: {
    foods: [
            {
        name: "Litti Chokha",
        localName: "लिट्टी चोखा",
        pronunciation: "Lit-ti Cho-kha",
        description: "Roasted wheat balls stuffed with sattu (roasted gram flour) served with mashed fire-roasted brinjal and tomato — Bihar's iconic dish.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Litti_Chokha_2.jpg/500px-Litti_Chokha_2.jpg"
            },
            {
        name: "Sattu Sharbat",
        localName: "सत्तू शर्बत",
        pronunciation: "Sat-tu Shar-bat",
        description: "A cooling summer drink of roasted gram flour (sattu) mixed with water, mustard oil, and spices — Bihar's traditional energy drink.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Sattu_Ghol.jpg/500px-Sattu_Ghol.jpg"
            },
            {
        name: "Thekua",
        localName: "ठेकुआ",
        pronunciation: "The-ku-a",
        description: "Sweet fried cookies made from wheat flour, jaggery, and ghee, offered during Chhath Puja and sold across Bihar.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Thekua_-_Chhath_Festival_-_Kolkata_2013-11-09_4316.JPG/500px-Thekua_-_Chhath_Festival_-_Kolkata_2013-11-09_4316.JPG"
            },
            {
        name: "Bihari Kebab",
        localName: "बिहारी कबाब",
        pronunciation: "Bi-ha-ri Ke-bab",
        description: "Tender marinated mutton strips grilled on skewers with raw papaya tenderiser, a distinctive Bihari street barbecue.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lula_kebab_2.jpg/500px-Lula_kebab_2.jpg"
            },
            {
        name: "Makhana Kheer",
        localName: "मखाना खीर",
        pronunciation: "Mak-ha-na Kheer",
        description: "Creamy rice pudding made with Bihar's prized fox nuts (makhana) simmered in sweetened milk — a festive Bihar dessert.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/500px-Kheer.jpg"
            },
            {
        name: "Chana Ghugni",
        localName: "चना घुगनी",
        pronunciation: "Cha-na Ghu-gni",
        description: "Spiced boiled white peas served with chopped onion, ginger, and lime — a popular Patna street snack.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Ghugni.jpg/500px-Ghugni.jpg"
            },
            {
        name: "Dal Pithi",
        localName: "दाल पिठी",
        pronunciation: "Dal Pi-thi",
        description: "Soft wheat dumplings cooked directly in chana dal — a comforting one-pot Bihari home meal.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dal_dhokli.JPG/500px-Dal_dhokli.JPG"
            },
            {
        name: "Khaja",
        localName: "खाजा",
        pronunciation: "Kha-ja",
        description: "Flaky layered deep-fried sweet pastries made from refined flour and sugar syrup, a GI-tagged Silao Khaja from Bihar.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Baleswari_khaja_pheni_Oriya_cuisine.jpg/500px-Baleswari_khaja_pheni_Oriya_cuisine.jpg"
            },
            {
        name: "Tilkut",
        localName: "तिलकुट",
        pronunciation: "Til-kut",
        description: "A sweet brittle made from sesame seeds and sugar or jaggery, especially famous from Gaya — a Makar Sankranti specialty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Tilkut_Sweet.jpg/500px-Tilkut_Sweet.jpg"
            },
            {
        name: "Anarsa",
        localName: "अनरसा",
        pronunciation: "A-nar-sa",
        description: "Deep-fried rice flour and jaggery cookies coated in poppy seeds — a traditional Bihari festive sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anarsa.jpg/500px-Anarsa.jpg"
            }
        ],
    places: [
            {
        name: "Golghar",
        localName: "गोलघर",
        pronunciation: "Gol-ghar",
        description: "A beehive-shaped British-era granary built in 1786 with a 360-degree view of Patna and the Ganga from its spiralling staircase.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Golghar_%E0%A5%AA.jpg/500px-Golghar_%E0%A5%AA.jpg"
            },
            {
        name: "Patna Museum",
        localName: "पटना संग्रहालय",
        pronunciation: "Pat-na Mu-se-um",
        description: "One of India's finest museums housing a 200-million-year-old fossil tree, Mauryan relics, and the famous Didarganj Yakshi statue.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Patna_Museum_-_General_View_%289221515542%29.jpg/500px-Patna_Museum_-_General_View_%289221515542%29.jpg"
            },
            {
        name: "Takht Sri Patna Sahib",
        localName: "तख्त श्री पटना साहिब",
        pronunciation: "Takht Pat-na Sa-hib",
        description: "One of the five Takhts of Sikhism, the birthplace of Guru Gobind Singh Ji, a revered Gurdwara visited by devotees worldwide.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/TheJoyof350thAnniversary%40IncredibleIndia.jpg/500px-TheJoyof350thAnniversary%40IncredibleIndia.jpg"
            },
            {
        name: "Nalanda",
        localName: "नालंदा",
        pronunciation: "Na-lan-da",
        description: "Ruins of the world's first residential university (5th–12th century CE), a UNESCO World Heritage Site 95 km from Patna.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/500px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg"
            },
            {
        name: "Bodh Gaya",
        localName: "बोध गया",
        pronunciation: "Bodh Ga-ya",
        description: "The place where Siddhartha Gautama attained enlightenment under the Bodhi Tree — the holiest site in Buddhism, 100 km from Patna.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mahabodhi_temple_at_Bodhgaya_in_Bihar_21.jpg/500px-Mahabodhi_temple_at_Bodhgaya_in_Bihar_21.jpg"
            },
            {
        name: "Sanjay Gandhi Biological Park",
        localName: "संजय गांधी जैविक उद्यान",
        pronunciation: "Pat-na Zoo",
        description: "A zoo in the heart of Patna with tigers, gharials, and a famous white tiger pair — one of Bihar's most popular attractions.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sanjay_Gandhi_Jaivik_Udyan.jpg/500px-Sanjay_Gandhi_Jaivik_Udyan.jpg"
            },
            {
        name: "Kumhrar Archaeological Park",
        localName: "कुम्हरार",
        pronunciation: "Kum-hrar Park",
        description: "Excavated ruins of ancient Pataliputra, the Mauryan Empire capital, revealing wooden columns, Ashoka's assembly hall, and artefacts.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Ruins_of_Arogya_Vihar%2C_Kumhrar.jpg/500px-Ruins_of_Arogya_Vihar%2C_Kumhrar.jpg"
            },
            {
        name: "Eco Park Patna",
        localName: "ईको पार्क पटना",
        pronunciation: "E-co Park Pat-na",
        description: "A beautifully landscaped park on the Ganga riverside with a lake, musical fountain, and children's play areas.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Patna_high_court1.jpg/500px-Patna_high_court1.jpg"
            },
            {
        name: "Agam Kuan",
        localName: "अगम कुआँ",
        pronunciation: "A-gam Ku-an",
        description: "A mysterious ancient well from the Mauryan period, said to have been built by Emperor Ashoka and linked to the mythological netherworld.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Agam_Kuan.jpg/500px-Agam_Kuan.jpg"
            },
            {
        name: "Mahavir Mandir Patna",
        localName: "महावीर मंदिर",
        pronunciation: "Ma-ha-vir Man-dir",
        description: "One of North India's most visited Hanuman temples near Patna Junction railway station, known for its charitable hospital and prasad.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Mahavir_Mandir_from_Buddha_Smriti_Park.JPG/500px-Mahavir_Mandir_from_Buddha_Smriti_Park.JPG"
            }
        ]
    },

  Mysuru: {
    foods: [
            {
        name: "Mysore Pak",
        localName: "ಮೈಸೂರು ಪಾಕ್",
        pronunciation: "My-so-re Pak",
        description: "A rich, ghee-laden besan fudge invented by royal chef Kakasura Madappa in the Mysore palace kitchen — the city's most iconic sweet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mysore_pak.jpg/500px-Mysore_pak.jpg"
            },
            {
        name: "Mysore Masala Dosa",
        localName: "ಮೈಸೂರು ಮಸಾಲೆ ದೋಸೆ",
        pronunciation: "My-so-re Ma-sa-le Do-se",
        description: "A crispy dosa spread with a unique red garlic-chilli chutney inside before adding the potato masala — spicier than the standard dosa.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rameshwaram_Cafe_Dosa.jpg/500px-Rameshwaram_Cafe_Dosa.jpg"
            },
            {
        name: "Obbattu",
        localName: "ಒಬ್ಬಟ್ಟು",
        pronunciation: "Ob-bat-tu",
        description: "Sweet flatbread stuffed with a coconut-jaggery or chana dal filling — a Ugadi festival special in Karnataka.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Puran_Poli.jpg/500px-Puran_Poli.jpg"
            },
            {
        name: "Bisi Bele Bath",
        localName: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
        pronunciation: "Bi-si Be-le Bath",
        description: "Hot, spiced lentil and rice porridge cooked with tamarind and a special spice mix, topped with ghee and served with raita.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bisi_Bele_Bath_%28Bisibelebath%29.JPG/500px-Bisi_Bele_Bath_%28Bisibelebath%29.JPG"
            },
            {
        name: "Kesari Bath",
        localName: "ಕೇಸರಿ ಬಾತ್",
        pronunciation: "Ke-sa-ri Bath",
        description: "Saffron semolina pudding loaded with ghee, cashews, and raisins, a staple sweet served at Karnataka restaurants.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Rava_Kesari_hone_made.jpg/500px-Rava_Kesari_hone_made.jpg"
            },
            {
        name: "Nanjangud Rasabale",
        localName: "ನಂಜನಗೂಡ್ ರಸಬಾಳೆ",
        pronunciation: "Nan-jan-gud Ra-sa-ba-le",
        description: "A GI-tagged banana variety from Nanjangud near Mysuru, renowned for its distinctive medicinal flavour and aroma.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bananavarieties.jpg/500px-Bananavarieties.jpg"
            },
            {
        name: "Ragi Mudde",
        localName: "ರಾಗಿ ಮುದ್ದೆ",
        pronunciation: "Ra-gi Mud-de",
        description: "Dense finger millet balls eaten with spicy mutton or chicken saaru, a nutritious staple of rural Karnataka widely loved in Mysuru.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/RAGI_MUDDE.JPG/500px-RAGI_MUDDE.JPG"
            },
            {
        name: "Mysore Vada",
        localName: "ಮೈಸೂರು ವಡೆ",
        pronunciation: "My-so-re Va-de",
        description: "A softer, richer version of medu vada made with coconut and spices — a popular Mysuru breakfast item.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Medu_Vada.JPG/500px-Medu_Vada.JPG"
            },
            {
        name: "Payasam",
        localName: "ಪಾಯಸ",
        pronunciation: "Pa-ya-sa",
        description: "Mysuru royal-style rice or vermicelli kheer cooked in cardamom milk with saffron, a staple at the Dasara royal feast.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kheer.jpg/500px-Kheer.jpg"
            },
            {
        name: "Mysore Coffee",
        localName: "ಮೈಸೂರು ಕಾಫಿ",
        pronunciation: "My-so-re Cof-fee",
        description: "Decoction coffee made with Arabica beans grown in the nearby Kodagu hills, served with frothed milk in a traditional tumbler.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Filter_kaapi.JPG/500px-Filter_kaapi.JPG"
            }
        ],
    places: [
            {
        name: "Mysore Palace",
        localName: "ಮೈಸೂರು ಅರಮನೆ",
        pronunciation: "My-so-re Pal-ace",
        description: "India's second most visited monument, an opulent 1912 Indo-Saracenic royal palace illuminated by 97,000 bulbs on Sundays and Dasara.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/500px-Mysore_Palace_Morning.jpg"
            },
            {
        name: "Chamundi Hills",
        localName: "ಚಾಮುಂಡಿ ಬೆಟ್ಟ",
        pronunciation: "Cha-mun-di Hills",
        description: "A hill rising 1,000 metres above Mysuru, crowned with the Chamundeshwari Temple and a colossal Nandi bull statue on the way up.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/J.C.Nagar_Welcome_Board_to_Chamundi_Hills.jpg/500px-J.C.Nagar_Welcome_Board_to_Chamundi_Hills.jpg"
            },
            {
        name: "Brindavan Gardens",
        localName: "ಬೃಂದಾವನ ಗಾರ್ಡನ್ಸ್",
        pronunciation: "Brin-da-van Gar-dens",
        description: "Terraced ornamental gardens below the KRS Dam, famous for their musical fountain show with coloured lights in the evenings.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Brindavan_Gardens.JPG/500px-Brindavan_Gardens.JPG"
            },
            {
        name: "Mysore Zoo",
        localName: "ಮೈಸೂರು ಮೃಗಾಲಯ",
        pronunciation: "My-so-re Zoo",
        description: "One of India's oldest and best-maintained zoos, established in 1892 by the Mysore Maharaja, housing gorillas, giraffes, and white tigers.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Entrance_of_Mysore_Zoo.jpg/500px-Entrance_of_Mysore_Zoo.jpg"
            },
            {
        name: "St. Philomena's Cathedral",
        localName: "ಸೇಂಟ್ ಫಿಲೋಮೆನಾ ಚರ್ಚ್",
        pronunciation: "St. Phil-o-me-na Ca-the-dral",
        description: "A stunning neo-Gothic cathedral modelled on Germany's Cologne Cathedral, with twin spires and stained glass windows depicting Christ's life.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/India_-_St._Philomena%27s_Church_02.jpg/500px-India_-_St._Philomena%27s_Church_02.jpg"
            },
            {
        name: "Devaraja Market",
        localName: "ದೇವರಾಜ ಮಾರ್ಕೆಟ್",
        pronunciation: "De-va-ra-ja Mar-ket",
        description: "A vibrant 19th-century market selling jasmine garlands, Mysore agarbatti, sandalwood products, spices, and fruit.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Devaraja_Market%2C_Mysore_%28306989724%29.jpg/500px-Devaraja_Market%2C_Mysore_%28306989724%29.jpg"
            },
            {
        name: "Jaganmohan Palace",
        localName: "ಜಗನ್ಮೋಹನ ಅರಮನೆ",
        pronunciation: "Ja-gan-mo-han Pal-ace",
        description: "A 19th-century royal palace turned art gallery housing Ravi Varma paintings, musical instruments, and an extraordinary royal collection.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/A_view_of_Jaganmohan_Palace.jpg/500px-A_view_of_Jaganmohan_Palace.jpg"
            },
            {
        name: "Ranganathaswamy Temple Srirangapatna",
        localName: "ಶ್ರೀರಂಗನಾಥಸ್ವಾಮಿ ದೇವಾಲಯ",
        pronunciation: "Sri-ran-ga-pat-na Tem-ple",
        description: "An ancient Vaishnava temple on the river island of Srirangapatna, 16 km from Mysuru, an important Vaishnava pilgrimage centre.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Sri_Ranganathaswami_Temple%2C_Srirangaptna.jpg/500px-Sri_Ranganathaswami_Temple%2C_Srirangaptna.jpg"
            },
            {
        name: "Namdroling Monastery",
        localName: "ನಾಮ್‌ಡ್ರೊಲಿಂಗ್ ಮಠ",
        pronunciation: "Nam-dro-ling Mon-as-tery",
        description: "The Golden Temple of Tibetan Buddhism in Bylakuppe near Mysuru — one of the largest Nyingma teaching centres outside Tibet.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Namrodoling_Monastery_Bylakuppe2.jpg/500px-Namrodoling_Monastery_Bylakuppe2.jpg"
            },
            {
        name: "Karanji Lake Nature Park",
        localName: "ಕಾರಂಜಿ ಕೆರೆ",
        pronunciation: "Ka-ran-ji Lake",
        description: "A butterfly park and nature reserve around a lake in Mysuru, home to diverse birds and a walk-in aviary — perfect for nature lovers.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Karanji_lake_pic.jpg/500px-Karanji_lake_pic.jpg"
            }
        ]
    }
};