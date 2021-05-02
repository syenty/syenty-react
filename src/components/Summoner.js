import React from "react"
import "./Summoner.css"
import keys from "../keys.json"

function Summoner({ sectorId, participantId, teamId, championImage, summonerName, me }){
    if((teamId === sectorId && participantId <= 5) || (teamId === sectorId && participantId > 5)){
        return (
            <div className={`${me ? "me" : ""} summoner`}>
                <div className="championImage">
                    <img src={`${keys.riotCdn}/img/champion/${championImage}`} alt={championImage}/>
                </div>
                <div className="summonerName">{summonerName}</div>
            </div>
        )
    }else {
        return ""
    }
}

export default Summoner