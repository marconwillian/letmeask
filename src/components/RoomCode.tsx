import copyImg from '../assets/images/copy.svg';

import '../styles/components/room-code.scss';

export function RoomCode (){

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #-McqZ0AdguXM0TmVZ5w1</span>
        </button>
    )
}