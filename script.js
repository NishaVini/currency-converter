let countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
  
}



// Function to change flag dynamically
function changeFlag(selectElement) {
  let countryCode = countryList[selectElement.value];
  let flagImage = selectElement.closest(".select-container").querySelector("img");
  flagImage.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Populate dropdowns
let dropdowns = document.querySelectorAll(".dropdown select");
//creat newoption and appen the countery name.....
for (let select of dropdowns) {

  for (let code in countryList) {
      let newOption = document.createElement("option");
      newOption.innerHTML = code;
      newOption.value = code;
      select.append(newOption);
  }

  // Event listener for dropdown changes
  select.addEventListener("change", (event) => {
      changeFlag(event.target);
  });
}

// Exchange rate function
const amount = document.querySelector("input[type='text']");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msgDiv = document.querySelector(".msg");

const getExchangeRate = async () => {

  let amountValue = amount.value;
  if (amountValue < 1 || amountValue === "") amount.value = 1;

  try {
      const fromCur = fromCurrency.value;
      const toCur = toCurrency.value;
      const url = `https://api.exchangerate-api.com/v4/latest/${fromCur}`;
     
      let response = await fetch(url);
      let data = await response.json();
   
      if (data && data.rates) {
          let exchangeRate = data.rates[toCur];
          console.log(exchangeRate);
          let convertedAmount = (amountValue * exchangeRate).toFixed(2);
          console.log(convertedAmount);

          msgDiv.innerHTML = `${amountValue} ${fromCur} = ${convertedAmount} ${toCur}`;
          }
       else {
          msgDiv.innerHTML = "Exchange rate not available.";
          }

    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      msgDiv.innerHTML = "Something went wrong. Please try again later.";
    }
};

// Event listener for button click
let clickBtn = document.querySelector("button");
clickBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchangeRate();
});





