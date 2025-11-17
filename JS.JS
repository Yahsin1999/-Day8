function calculateDogAge() {
    const dob = new Date(document.getElementById("dob").value);
    const breed = document.getElementById("breed").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const result = document.getElementById("result");

    if (!dob || !weight) {
        alert("請輸入完整資料！");
        return;
    }

    // 計算狗狗實際年齡
    const today = new Date();
    const diff = today - dob;
    const dogYears = diff / (1000 * 60 * 60 * 24 * 365);
    const dogAge = dogYears.toFixed(2);

    // 推算人類年齡（依犬種體型）
    let ratio;

    if (breed === "small") ratio = 4.8;
    else if (breed === "medium") ratio = 5.2;
    else if (breed === "large") ratio = 6.0;
    else if (breed === "giant") ratio = 7.0;

    let humanAge;
    if (dogYears <= 2) {
        humanAge = dogYears * 12; // 前2年等於快速成長
    } else {
        humanAge = 24 + (dogYears - 2) * ratio;
    }

    humanAge = humanAge.toFixed(1);

    // 顯示結果
    result.style.display = "block";
    result.innerHTML = `
        <strong>狗狗實際年齡：</strong> ${dogAge} 歲<br>
        <strong>推估相當於人類年齡：</strong> ${humanAge} 歲
    `;

    // 年齡階段判定
    const puppy = document.getElementById("puppy");
    const adult = document.getElementById("adult");
    const mature = document.getElementById("mature");
    const senior = document.getElementById("senior");
    document.querySelectorAll(".stage").forEach(s => s.classList.remove("active"));

    if (dogYears < 1) {
        puppy.classList.add("active");
    } else if (dogYears < 4) {
        adult.classList.add("active");
    } else if (dogYears < 8) {
        mature.classList.add("active");
    } else {
        senior.classList.add("active");
    }
}
