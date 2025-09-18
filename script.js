const today = new Date();

const stations = [document.getElementById("s1"), document.getElementById("s2"), document.getElementById("s3"),
                  document.getElementById("s4"), document.getElementById("s5"), document.getElementById("s6")]

const progress = [0,0,0,0,0,0]

const keys = [document.getElementById("ek1"), document.getElementById("ek2"), document.getElementById("ek3"),
              document.getElementById("ek4"), document.getElementById("ek5"), document.getElementById("ek6")]

const adminKey = "HMB2025!"

const radios = [[[document.getElementById("11d"), document.getElementById("11p"), document.getElementById("11m")],
                 [document.getElementById("12d"), document.getElementById("12p"), document.getElementById("12m")],
                 [document.getElementById("13d"), document.getElementById("13p"), document.getElementById("13m")],
                 [document.getElementById("14d"), document.getElementById("14p"), document.getElementById("14m")]],
                [[document.getElementById("21d"), document.getElementById("21p"), document.getElementById("21m")],
                 [document.getElementById("22d"), document.getElementById("22p"), document.getElementById("22m")],
                 [document.getElementById("23d"), document.getElementById("23p"), document.getElementById("23m")]],
                [[document.getElementById("31d"), document.getElementById("31p"), document.getElementById("31m")],
                 [document.getElementById("32d"), document.getElementById("32p"), document.getElementById("32m")],
                 [document.getElementById("33d"), document.getElementById("33p"), document.getElementById("33m")],
                 [document.getElementById("34d"), document.getElementById("34p"), document.getElementById("34m")]],
                [[document.getElementById("41d"), document.getElementById("41p"), document.getElementById("41m")],
                 [document.getElementById("42d"), document.getElementById("42p"), document.getElementById("42m")],
                 [document.getElementById("43d"), document.getElementById("43p"), document.getElementById("43m")],
                 [document.getElementById("44d"), document.getElementById("44p"), document.getElementById("44m")]],
                [[document.getElementById("51d"), document.getElementById("51p"), document.getElementById("51m")],
                 [document.getElementById("52d"), document.getElementById("52p"), document.getElementById("52m")],
                 [document.getElementById("53d"), document.getElementById("53p"), document.getElementById("53m")],
                 [document.getElementById("54d"), document.getElementById("54p"), document.getElementById("54m")]],
                [[document.getElementById("61d"), document.getElementById("61p"), document.getElementById("61m")],
                 [document.getElementById("62d"), document.getElementById("62p"), document.getElementById("62m")],
                 [document.getElementById("63d"), document.getElementById("63p"), document.getElementById("63m")]]]

for (let i = 0; i < 4; i++) {
    radios[0][i][0].checked = true;
}

function sCheck(station) {
    let passed = true;
    let mastered = true;
    station--;

    if (keys[station].value == generateKey(1) || keys[station].value == adminKey) {
        keys[station].value = "";
        for (let i = 0; i < radios[station].length; i++) {
            if (radios[station][i][0].checked) {
                passed = false;
                mastered  = false;
                break;
            }
            if (radios[station][i][1].checked) {
                mastered = false;
            }
        }

        if (passed) {
            stations[station].querySelector("span").textContent = " - Passed!";
            progress[station] = 1;
            if (progress[station - 1] == 2) {
                const newSpan = document.createElement("span");
                newSpan.textContent = " Evaluator Key: " + generateKey(station);
                stations[station - 1].querySelector("span").appendChild(newSpan);
            }
        }

        if (mastered) {
            stations[station].querySelector("span").textContent = " - Mastered!";
            progress[station] = 2;
            if (progress[station + 1] > 0 || station == 5) {
                const newSpan = document.createElement("span");
                newSpan.textContent = " Evaluator Key: " + generateKey(station);
                stations[station].querySelector("span").appendChild(newSpan);
            }
        }

        if (station < 5) {
            station++;

            for (let i = 0; i < radios[station].length; i++) {
                for (let j = 0; j < radios[station][i].length; j++) {
                    radios[station][i][j].disabled = !passed;
                }
            }
        }
    }
}

function generateKey(station) {
    return "" + ((today.getMonth() + 1) * Math.pow(2, station) + today.getDate() * Math.pow(3, station));
}
