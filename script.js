document.addEventListener("DOMContentLoaded", function () {
    const dil1 = document.querySelector(".dil1");
    const dil2 = document.querySelector(".dil2");
    const dildegister = document.querySelector(".dildegister");
    const okudil1 = document.querySelector(".okudil1");
    const okudil2 = document.querySelector(".okudil2");
    const kopyaladil1 = document.querySelector(".kopyaladil1");
    const kopyaladil2 = document.querySelector(".kopyaladil2");
    const translate = document.querySelector(".translate2");
    const dilsec1 = document.querySelector(".dilsec1");
    const dilsec2 = document.querySelector(".dilsec2");

    const countries = {
        "am-ET": "Amharic", "ar-SA": "Arabic", "be-BY": "Bielarus", "bem-ZM": "Bemba", "bi-VU": "Bislama", "bjs-BB": "Bajan", "bn-IN": "Bengali", "bo-CN": "Tibetan", "br-FR": "Breton", "bs-BA": "Bosnian",
        "ca-ES": "Catalan", "cop-EG": "Coptic", "cs-CZ": "Czech", "cy-GB": "Welsh", "da-DK": "Danish", "dz-BT": "Dzongkha", "de-DE": "German", "dv-MV": "Maldivian", "el-GR": "Greek", "en-GB": "English", "es-ES": "Spanish", "et-EE": "Estonian", "eu-ES": "Basque",
        "fa-IR": "Persian", "fi-FI": "Finnish", "fn-FNG": "Fanagalo", "fo-FO": "Faroese", "fr-FR": "French", "gl-ES": "Galician", "gu-IN": "Gujarati", "ha-NE": "Hausa", "he-IL": "Hebrew", "hi-IN": "Hindi", "hr-HR": "Croatian", "hu-HU": "Hungarian",
        "id-ID": "Indonesian", "is-IS": "Icelandic", "it-IT": "Italian", "ja-JP": "Japanese", "kk-KZ": "Kazakh", "km-KM": "Khmer", "kn-IN": "Kannada", "ko-KR": "Korean", "ku-TR": "Kurdish", "ky-KG": "Kyrgyz", "la-VA": "Latin", "lo-LA": "Lao",
        "lv-LV": "Latvian", "men-SL": "Mende", "mg-MG": "Malagasy", "mi-NZ": "Maori", "ms-MY": "Malay", "mt-MT": "Maltese", "my-MM": "Burmese", "ne-NP": "Nepali", "niu-NU": "Niuean", "nl-NL": "Dutch", "no-NO": "Norwegian", "ny-MW": "Nyanja", "ur-PK": "Pakistani",
        "pau-PW": "Palauan", "pa-IN": "Panjabi", "ps-PK": "Pashto", "pis-SB": "Pijin", "pl-PL": "Polish", "pt-PT": "Portuguese", "rn-BI": "Kirundi", "ro-RO": "Romanian", "ru-RU": "Russian", "sg-CF": "Sango", "si-LK": "Sinhala", "sk-SK": "Slovak",
        "sm-WS": "Samoan", "sn-ZW": "Shona", "so-SO": "Somali", "sq-AL": "Albanian", "sr-RS": "Serbian", "sv-SE": "Swedish", "sw-SZ": "Swahili", "ta-LK": "Tamil", "te-IN": "Telugu", "tet-TL": "Tetum", "tg-TJ": "Tajik", "th-TH": "Thai", "ti-TI": "Tigrinya",
        "tk-TM": "Turkmen", "tl-PH": "Tagalog", "tn-BW": "Tswana", "to-TO": "Tongan", "tr-TR": "Türkçe", "uk-UA": "Ukrainian", "uz-UZ": "Uzbek", "vi-VN": "Vietnamese", "wo-SN": "Wolof", "xh-ZA": "Xhosa", "yi-YD": "Yiddish", "zu-ZA": "Zulu"
    }

    for (let country_code in countries) {
        let option1 = document.createElement("option");
        option1.value = country_code;
        option1.textContent = countries[country_code];
        let option2 = option1.cloneNode(true);
        dilsec1.appendChild(option1);
        dilsec2.appendChild(option2);
    }

    dilsec1.value = "tr-TR";
    dilsec2.value = "en-GB";

    dildegister.addEventListener("click", () => {
        let tempText = dil1.value,
            tempLang = dilsec1.value;
        dil1.value = dil2.value;
        dil2.value = tempText;
        dilsec1.value = dilsec2.value;
        dilsec2.value = tempLang;
    });

    dil1.addEventListener("keyup", () => {
        if (!dil1.value) {
            dil2.value = "";
        }
    });

    kopyaladil1.addEventListener("click", () => {
        dil1.select();
        document.execCommand("copy");
        alert("Metin kopyalandı: " + dil1.value);
    });

    kopyaladil2.addEventListener("click", () => {
        dil2.select();
        document.execCommand("copy");
        alert("Metin kopyalandı: " + dil2.value);
    });

    okudil1.addEventListener("click", () => {
        let utterance = new SpeechSynthesisUtterance(dil1.value);
        speechSynthesis.speak(utterance);
    });

    okudil2.addEventListener("click", () => {
        let utterance = new SpeechSynthesisUtterance(dil2.value);
        speechSynthesis.speak(utterance);
    });

    translate.addEventListener("click", () => {
        let text = dil1.value.trim(),
            translateFrom = dilsec1.value,
            translateTo = dilsec2.value;
        if (!text) return;
        dil2.setAttribute("placeholder", "Çevriliyor...");
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dil2.value = data.responseData.translatedText;
                dil2.setAttribute("placeholder", "Çıktı");
            })
            .catch(error => {
                alert('Error:', error);
                dil2.value = "Çeviri yapılırken bir hata oluştu.";
                dil2.setAttribute("placeholder", "Çeviri Hatası");
            });
    });


    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.key === "7") {
            alert("Code By Dnz / farligbjoern");
        }
    });
});

function yuklendi() {
    var weburl = window.location.host;

    document.getElementById("url").innerHTML = weburl;
}