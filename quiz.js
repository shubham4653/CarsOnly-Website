document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const answers = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"].map(q =>
      document.querySelector(`input[name="${q}"]:checked`)?.value
    );
  
    if (answers.includes(undefined)) {
      document.getElementById("quizResult").innerHTML = `<p>Please answer all questions!</p>`;
      return;
    }
  
    const counts = { sporty: 0, luxury: 0, rugged: 0, family: 0 };
    answers.forEach(answer => counts[answer]++);
  
    let result = "";
    if (counts.sporty >= 5) {
      result = "🏎️ You’re a Lamborghini Huracán – bold, fast, and built for the thrill!";
    } else if (counts.luxury >= 5) {
      result = "🚘 You’re a Mercedes-Benz S-Class – refined, smooth, and elegant.";
    } else if (counts.rugged >= 5) {
      result = "🚙 You’re a Jeep Wrangler – adventurous, tough, and ready for any terrain.";
    } else if (counts.family >= 5) {
      result = "🚗 You’re a Toyota Highlander – practical, spacious, and family-friendly.";
    } else {
      result = "🚗 You have a balanced personality – there’s a bit of everything in you!";
    }
  
    document.getElementById("quizResult").innerHTML = `
      <div class="result-box">
        <h3>Your Match:</h3>
        <p>${result}</p>
      </div>
    `;
  });
  