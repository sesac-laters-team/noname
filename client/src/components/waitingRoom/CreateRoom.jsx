import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TimerRadio from "./TimerRadio";
import TimerRadioGroup from "./TimerRadioGroup";


export default function CreateRoom({ socket, setCreateModal }) {
    const navigate = useNavigate();
    const [pwInput, setPwInput] = useState("");

    // submit event
    const handleNewRoom = (e) => {
        e.preventDefault();

        const title = e.target.roomTitle.value;
        const timer = e.target.time.value;
        const roomPw = e.target.roomPw.value;

        // roomIndex 임의 지정
        let roomIndex = 2;

        if (title.trim() == 0) {
            alert("방 제목은 공백일 수 없습니다.");
            return;
        }

        roomIndex = roomIndex + 1;

        e.target.roomTitle.value = "";
        e.target.roomPw.value = "";

        // 방 아이디 = 소켓 아이디
        const roomId = socket.id;
        console.log(roomId);

        socket.emit(
            "createRoom",
            title,
            timer,
            roomPw.trim(),
            roomId,
            roomIndex
        ); // 방 생성자 socket.id

        navigate("/game");
    };

    const checkSpacebar = (e) => {
        if (e.code === "Space") {
            setPwInput("");
            alert("비밀번호는 space입력이 불가능합니다.");
        }
    };

    return (
        <div className="CreateRoom">
            {/* 모달 */}
            <div className="modal">
                <div className="modal-body">
              

                    <form className="newRoom" onSubmit={handleNewRoom}>
                    <div className="form-item">
                            <label htmlFor="roomTitle">방 제목</label>
                                <input
                                    type="text"
                                    id="roomTitle"
                                    className="roomTitle"
                                    name="roomTitle"
                                     placeholder="방 제목 입력"
                                 />
                        </div>
                       
                        <label>
                           
                             <TimerRadioGroup label="시간선택">
                                <TimerRadio
                                    name="time"
                                    value="sec30"
                                    defaultChecked
                                >
                                    00:30
                                </TimerRadio>
                                <TimerRadio name="time" value="sec60">
                                    01:00
                                </TimerRadio>
                                <TimerRadio name="time" value="sec90">
                                    01:30
                                </TimerRadio>
                            </TimerRadioGroup> 
                        </label>
                    
                        <div className="form-item">
                            <label htmlFor="roomPw">비밀번호</label>
                            <input
                                type="text"
                                id="roomPw"
                                name="roomPw"
                                value={pwInput.trim()}
                                onKeyDown={checkSpacebar}
                                onChange={(e) => setPwInput(e.target.value)}
                                placeholder="비밀번호"
                            />
                            </div>

                        <label>
                            <button type="submit" className="newRoomSubmit">
                                방 만들기
                            </button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
