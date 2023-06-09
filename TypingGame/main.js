// 사용 변수
const Game_Time = 9; // 게임 시간

let score = 0; // 점수
let time = Game_Time; // 남은 시간 (countDown() 함수에서 사용)
let isPlaying = false; // 게임 진행 여부
let timeInterval; // 시간 간격 설정을 위한 변수
let checkInterval; // 상태 확인 간격 설정을 위한 변수
let words = []; // 단어 목록

const wordInput = document.querySelector('.word-input'); // 단어 입력 필드
const wordDisplay = document.querySelector('.word-display'); // 단어 표시 영역
const scoreDisplay = document.querySelector('.score'); // 점수 표시 영역
const timeDisplay = document.querySelector('.time'); // 시간 표시 영역
const button = document.querySelector('.button'); // 게임 시작/로딩 버튼



init();

// 게임 실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = Game_Time;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus,50);
    buttonChange('게임중')
}

// 초기화
function init(){
    buttonChange('게임 로딩중 ...');
    getWords();
    wordInput.addEventListener('input',checkMatch);
    buttonChange('게임시작')
}

// 상태 확인 함수
function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange('게임시작')
        clearInterval(checkInterval)
        
    }
}

// 단어 불러오기
function getWords(){
    // ID로 사용자 요청
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
      // 응답(성공)
      .then(function (response) {
        response.data.forEach((word)=>{
            if(word.length < 10)
                words.push(word);
        })
        buttonChange('게임시작');   
     })
    
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      })
      // 응답(항상 실행)
      .then(function () {
        // ...
      });
}

// 단어 일치 확인
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){// 소문자로 비교
        wordInput.value="";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = Game_Time;
        const randomIndex = Math.floor(Math.random() * words.length); // 소숫점 자르면서 랜덤 인덱스 반환

        wordDisplay.innerText = words[randomIndex];
    } 
}




// 타이머 함수
function countDown(){
   time > 0 ? time-- : isPlaying = false;
   if(!isPlaying){
    clearInterval(timeInterval)
   }
   timeDisplay.innerText = time;
}


// 버튼 변경
function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}