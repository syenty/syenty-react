import React from "react"
import "./Modal.css"
import keys from "../keys.json"
import GameInfo from "./GameInfo"

function Modal({ onClose, champions, summonerSpells, runes, matchDetailArray, userProfile, progress }){

    if(progress){
        return (
            <div className="modal">
                <div className="progress">
                    <img src="progress.gif" alt="progress" title="progress"/>
                </div>
            </div>
        )
    }

    if(typeof champions === "undefined") return ""
    else if(typeof summonerSpells === "undefined") return ""
    else if(typeof runes === "undefined") return ""
    else if(typeof userProfile === "undefined") return ""

    return (
        <div className="modal">
            <div className="content">
                <div className="user">
                    <div className="user_head">
                        <button className="close_btn" onClick={onClose}></button>
                    </div>
                    <div className="user_profile">
                        <img src={`${keys.riotCdn}/img/profileicon/${userProfile.profileIconId}.png`} alt={`${userProfile.profileIconId}`}/>
                    </div>
                    <div className="user_name">{userProfile.name}</div>
                    
                </div>
                <div className="gameInfoList">
                    {matchDetailArray.map((matchDetail, idx) => (
                    <GameInfo
                        champions={champions}
                        summonerSpells={summonerSpells}
                        runes={runes}
                        matchDetail={matchDetail}
                        teams={matchDetail.teams}
                        participants={matchDetail.participants}
                        participantIdentities={matchDetail.participantIdentities}
                        ingameInfo={matchDetail.participants
                            .filter(participant => participant.participantId === matchDetail.participantIdentities.filter(participantIdentity => 
                            participantIdentity.player.summonerName.replace(/ /g,"") === userProfile.name.replace(/ /g,""))[0].participantId)[0]}
                        key={idx}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
    
}

export default Modal