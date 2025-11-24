// 重新整理後載入上次結果
window.onload = function () {
    const saved = JSON.parse(localStorage.getItem("dogData"));

    if (saved) {
        document.getElementById("dob").value = saved.dob;
        document.getElementById("breed").value = saved.breed;
        document.getElementById("weight").value = saved.weight;

        // 自動顯示結果
        renderResult(saved.dogAge, saved.humanAge, saved.dogYears);
    }
};

function calculateDogAge() {
    const dob = document.getElementById("dob").value;
    const breed = document.getElementById("breed").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const result = document.getElementById("result");

    if (!dob || !weight) {
        alert("請輸入完整資料！");
        return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const diff = today - dobDate;

    const dogYears = diff / (1000 * 60 * 60 * 24 * 365);
    const dogAge = dogYears.toFixed(2);

    let ratio;
    if (breed === "small") ratio = 4.8;
    else if (breed === "medium") ratio = 5.2;
    else if (breed === "large") ratio = 6.0;
    else if (breed === "giant") ratio = 7.0;

    let humanAge;
    if (dogYears <= 2) {
        humanAge = dogYears * 12;
    } else {
        humanAge = 24 + (dogYears - 2) * ratio;
    }
    humanAge = humanAge.toFixed(1);

    // 存進 localStorage
    localStorage.setItem("dogData", JSON.stringify({
        dob,
        breed,
        weight,
        dogAge,
        humanAge,
        dogYears
    }));

    renderResult(dogAge, humanAge, dogYears);
}

// 顯示結果 & 年齡階段動畫
function renderResult(dogAge, humanAge, dogYears) {
    const result = document.getElementById("result");

    result.style.display = "block";
    result.innerHTML = `
        <strong>🐾 狗狗實際年齡：</strong> ${dogAge} 歲<br>
        <strong>🐶 推估相當於人類年齡：</strong> ${humanAge} 歲
    `;

    const puppy = document.getElementById("puppy");
    const adult = document.getElementById("adult");
    const mature = document.getElementById("mature");
    const senior = document.getElementById("senior");
    document.querySelectorAll(".stage").forEach(s => s.classList.remove("active"));

    if (dogYears < 1) puppy.classList.add("active");
    else if (dogYears < 4) adult.classList.add("active");
    else if (dogYears < 8) mature.classList.add("active");
    else senior.classList.add("active");
}
