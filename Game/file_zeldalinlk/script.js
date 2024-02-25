// 1. 캐릭터 요소 선택 및 확인
const $userCharacter = document.getElementById('user-character');
// console.log($userCharacter);
document.addEventListener('DOMContentLoaded', () => {

    characterMove();
    $userCharacter.setAttribute('style', 'background-image: url("../img_zeldarink/front_stand.png")')
    }
)
const imgDir = "../img_zeldarink/"
const postureTypes = ['back', 'front', 'left', 'right']

for (let direction of postureTypes) {
    let charImgs = Array.from({length:10},
        (_, idx) => {
        return `${imgDir}${direction}_walks${idx}.png`;
    });

}
// 2. 캐릭터 이동을 위한 주요 변수 및 메서드 선언
const characterLocation = {
    x: 0, // x 좌표 위치
    y: 0
}
const stepSize = 20;
const mapSizeX = 1660;
const mapSizeY = 760;
const allowedKeys = [ 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight' ]
const animationKeyMap = {
    ArrowDown: 'forward',
    ArrowUp: 'backward',
    ArrowLeft: 'left',
    ArrowRight: 'right'
}
const background_map =  document.getElementById('map');
const background_map_name = document.getElementById("map-name")
function moveToCoordinate(x, y) {
    characterLocation.x = x;
    characterLocation.y = y;
    characterMove();  // 캐릭터 이동 함수 호출하여 좌표 업데이트 및 화면에 반영
    console.log(characterLocation);  // 좌표 출력
}
function characterMove() {
    const maxX = mapSizeX - $userCharacter.clientWidth; // Consider the width of the character
    const maxY = mapSizeY - $userCharacter.clientHeight; // Consider the height of the character

    // Update the character's position, allowing it to move below the initial values
    characterLocation.x = Math.max(-350, Math.min(characterLocation.x, maxX));
    characterLocation.y = Math.max(-100, Math.min(characterLocation.y, maxY));

    // Apply the updated position to the character element
    $userCharacter.style.transform = `translate(${characterLocation.x}px, ${characterLocation.y}px)`;
}
// Function Map 사용의 메리트 : 각각의 키에 대한 동작이 복잡해져도, 서로 영향을 주지 않게끔, 분리되는 효과 => 코드가 간결해지고 유지보수성이 상승
const animationFunctionMap = {
    ArrowDown: function() {
        characterLocation.y += stepSize;
        characterMove();
    },
    ArrowUp: function() {
        characterLocation.y -= stepSize;
        characterMove();
    },
    ArrowLeft: function() {
        characterLocation.x -= stepSize;
        characterMove();
    },
    ArrowRight: function() {
        characterLocation.x += stepSize;
        characterMove();
    }
}


// 3. 애니메이션 적용
document.addEventListener('keydown', (evt) => {
        // 3-1. 이벤트 키 검사
        if (!allowedKeys.includes(evt.key)) {
            return;
        }
        // 3-2. 애니메이션 적용
        // //// pause 가 남아있는 것을 제거해야 함 => 어떤 방향의 pause 가 남아있을 지 알 수가 없음 => 모든 방향의 pause 제거
        for (let direction of Object.values(animationKeyMap)) {
            $userCharacter.classList.remove(`pause-${direction}`);
        }
        // //// 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
        $userCharacter.classList.add(`walking-${animationKeyMap[evt.key]}`);

        // 3-3. 위치 이동을 위한 로직 입력
        //     - 위치 이동을 위한 characterLocation 값 조정 필요
        // 위치 이동 로직


    if (evt.key === 'ArrowUp') {
        // ArrowUp 키를 눌렀을 때 특정 좌표로 이동
        if (characterLocation.x === 240 && characterLocation.y === 520) {
            moveToCoordinate(1180, 20);
        // } else if (characterLocation.x === 1420 && characterLocation.y === 520) {
        } else if (characterLocation.x === 1420 && characterLocation.y === 520) {
            background_map.classList.remove('town-map');
            background_map.classList.add('dark-town-map');
            background_map_name.textContent = '축복시티'
            moveToCoordinate(0,0)
        }
    } else {
        // ArrowUp 이외의 키에 대한 이동 함수 호출
        animationFunctionMap[evt.key]();
    }

    console.log(characterLocation);
    }
)
document.addEventListener('keyup', (evt) => {
        // 이벤트 키 검사
        if (!allowedKeys.includes(evt.key)) {
            return;
        }
        // 3-2. 애니메이션 중단
        $userCharacter.classList.remove(`walking-${animationKeyMap[evt.key]}`);
        // 특정 키에 특정 방향 애니메이션 매칭하도록 클래스 추가
        $userCharacter.classList.add(`pause-${animationKeyMap[evt.key]}`);
    }
)