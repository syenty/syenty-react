import React from "react"
import "./GameInfo.css"
import Summoner from "./Summoner"
import keys from "../keys.json"

function GameInfo({ champions, summonerSpells, runes, matchDetail, teams, participants, participantIdentities, ingameInfo}){
    
    const queues = {420:"솔로 랭크",430:"일반",440:"자유 랭크",450:"무작위 총력전",850:"AI 대전"}

    return (
        <div className={`gameInfo ${teams.filter(team => team.teamId === ingameInfo.teamId)[0].win}`}>
            <div className="timeData">
                <div className="queue">{queues[matchDetail.queueId]}</div>
                <div className="date">
                    {((new Date().getTime() - new Date(matchDetail.gameCreation))/1000/60/60/24).toFixed()}일 전
                </div>
                <div className="bar"></div>
                <div className="result">
                    {teams.filter(team => team.teamId === ingameInfo.teamId)[0].win === "Win" ? "승리" : "패배"}
                </div>
                <div className="duration">{parseInt(matchDetail.gameDuration/60)}분 {matchDetail.gameDuration%60}초</div>
            </div>
            <div className="gameSetting">
                <div className="championImage">
                    <img src={`${keys.riotCdn}/img/champion/${champions.filter(champion => champion.key === ""+ingameInfo.championId)[0].image.full}`} alt={ingameInfo.championId}/>
                </div>
                <div className="spells">
                    <div className="spell">
                        <img src={`${keys.riotCdn}/img/spell/${summonerSpells.filter(summonerSpell => summonerSpell.key === ""+ingameInfo.spell1Id)[0].image.full}`} alt={ingameInfo.spell1Id}/>
                    </div>
                    <div className="spell">
                        <img src={`${keys.riotCdn}/img/spell/${summonerSpells.filter(summonerSpell => summonerSpell.key === ""+ingameInfo.spell2Id)[0].image.full}`} alt={ingameInfo.spell2Id}/>
                    </div>
                </div>
                <div className="runes">
                    <div className="rune">
                        <img src={`${keys.nonVersionCdn}/img/${runes.filter(rune => rune.id === ingameInfo.stats.perkPrimaryStyle)[0].slots
                        .map(slot => slot.runes)
                        .map(runes => runes.filter(rune => rune.id === ingameInfo.stats.perk0))
                            .filter(slot => slot.length > 0)[0]
                        [0].icon}`} className="primary" alt={ingameInfo.stats.perk0}/>
                    </div>
                    <div className="rune">
                        <img src={`${keys.nonVersionCdn}/img/${runes.filter(rune => rune.id === ingameInfo.stats.perkSubStyle)[0].icon}`} alt={ingameInfo.stats.perkSubStyle}/>
                    </div>
                </div>
                <div className="championName">{champions.filter(champion => champion.key === ""+ingameInfo.championId)[0].name}</div>
            </div>
            <div className="record">
                <div className="kda">
                    <span className="kill">{ingameInfo.stats.kills}</span>&nbsp;/&nbsp;
                    <span className="death">{ingameInfo.stats.deaths}</span>&nbsp;/&nbsp;
                    <span className="assist">{ingameInfo.stats.assists}</span>
                </div>
                <div className="ratio">
                    <span>{((ingameInfo.stats.kills + ingameInfo.stats.assists)
                    /(ingameInfo.stats.deaths === 0 ?  1 : ingameInfo.stats.deaths)).toFixed(2)}
                    </span>
                    &nbsp;평점
                </div>
                <div className="multiKill">
                    {ingameInfo.stats.pentaKills > 0 ? <span>펜타킬</span>
                    : ingameInfo.stats.quadraKills > 0 ? <span>쿼드라킬</span>
                    : ingameInfo.stats.tripleKills > 0 ? <span>트리플킬</span>
                    : ingameInfo.stats.doubleKills > 0 ? <span>더블킬</span>
                    : ""}
                </div>
            </div>
            <div className="growth">
                <div className="level">레벨 {ingameInfo.stats.champLevel}</div>
                <div className="cs">{ingameInfo.stats.totalMinionsKilled + ingameInfo.stats.neutralMinionsKilled} CS</div>
            </div>
            <div className="items">
                <div className="item">
                    {ingameInfo.stats.item0 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item0}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item1 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item1}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item2 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item2}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item6 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item6}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item3 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item3}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item4 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item4}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="item">
                    {ingameInfo.stats.item5 === 0 ? "" 
                    : <img src={`${keys.riotCdn}/img/item/${ingameInfo.stats.item5}.png`} alt={ingameInfo.stats.item0}/>}
                </div>
                <div className="rest"></div>
            </div>
            <div className="teams">
                {[100,200].map(sectorId => 
                    (<div className="team" key={sectorId}>
                        {participants.map(participant => (
                            <Summoner
                                sectorId={sectorId}
                                teamId={participant.teamId}
                                participantId={participant.participantId}
                                championImage={champions
                                .filter(champion => champion.key === ""+participant.championId)
                                [0].image.full}
                                summonerName={participantIdentities
                                .filter(participantId => participantId.participantId === participant.participantId)
                                [0].player.summonerName}
                                me={ingameInfo.participantId === participant.participantId ? true : false}
                                key={participant.participantId}
                            />
                        ))}
                    </div>)
                )}
            </div>
        </div>
    )

}

export default GameInfo