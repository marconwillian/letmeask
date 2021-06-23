import copyImg from '../assets/images/copy.svg';

import '../styles/components/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode ({code}: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" type="button" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{code}</span>
        </button>
    )
}