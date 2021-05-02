import React from "react"
import axios from "axios"
import Hangul from "hangul-js"
import Champion from "../components/Champion"
import ModalPortal from '../components/ModalPortal'
import Modal from '../components/Modal'
import "./Search.css"
import keys from "../keys.json"
import messages from "../message.json"

class Search extends React.Component {

    state = {
        isLoading: true,
        consonants: ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],
        champions: [],
        summonerSpells: [],
        runes: [],
        exposedChampions: [],
        inputNickname: "",
        inputChampionName: "",
        inputChampionKey: "",
        inputQueueType: "",
        matchDetailArray: [],
        userProfile: {},
        modal: false,
        progress: false
    }

    handleCloseModal = () => {
        this.setState({
            modal: false
        })
    }

    // 챔피언 목록 불러오기
    setChampions = async () => {
        const {
            data: {
                data: champions
            }
        } = await axios.get(`${keys.riotCdn}/data/ko_KR/champion.json`)

        this.setState({champions : this.sortByKoreanAsc(Object.values(champions))})
        this.setState({exposedChampions : this.sortByKoreanAsc(Object.values(champions))})
    }

    // 소환사 주문 목록 불러오기
    setSummonerSpells = async () => {
        const {
            data: {
                data: summonerSpells
            }
        } = await axios.get(`${keys.riotCdn}/data/ko_KR/summoner.json`)

        this.setState({summonerSpells : Object.values(summonerSpells)})
    }

    // 룬 목록 불러오기
    setRunes = async () => {
        const {
            data: runes
        } = await axios.get(`${keys.riotCdn}/data/ko_KR/runesReforged.json`)

        this.setState({runes : Object.values(runes)})
    }

    // 자음으로 챔피언 검색
    getChampionsByConsonant = consonant => {

        const championArray = this.state.champions
        let array = []

        // 한글 오름차순
        this.sortByKoreanAsc(championArray)

        championArray.forEach(champion => {
            if(Hangul.d(champion.name,false)[0] === consonant) {
                array.push(champion)
            }
        })
        
        this.setState({exposedChampions : array})

    }

    // 한글 오름차순 정렬
    sortByKoreanAsc = array => {
        array.sort(function(a, b) { 
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        })
        return array
    }

    // 챔피언 입력 event
    handleChange = e => {
        this.setState({inputNickname: e.target.value})
    }

    // 챔피언 클릭 event
    clickChampion = (name, key) => {
        this.setState({inputChampionName: name})
        this.setState({inputChampionKey: key})
    }

    // 큐타입 클릭 event
    clickQueue = (e) => {
        this.setState({inputQueueType: e.target.value})
    }

    // 초기화 event
    clearData = () => {
        this.setState({inputChampionName: ""})
        this.setState({inputChampionKey: ""})
        this.setState({exposedChampions : this.state.champions})
    }

    // 검색
    getUserData = async () => {

        // this.setState({exposedChampions: []})

        const nickname = this.state.inputNickname.replace(/ /g,"")
        
        if(nickname === "") {
            alert(messages["no.nickname"])
            return
        }
        
        this.setState({progress: true})
        this.setState({modal: true})

        console.log(nickname)
        console.log(this.state.inputChampionKey)
        console.log(this.state.inputQueueType)

        await axios.get(`${keys.middleware}/search/name?name=${nickname}&champion=${this.state.inputChampionKey}&queue=${this.state.inputQueueType}`)
        .then(res => {
            // console.log(res.data.matchDetailArray)
            this.setState({userProfile: res.data.userProfile})
            this.setState({matchDetailArray: res.data.matchDetailArray})
            this.setState({progress: false})
        })
        
    }

    render() {
        
        const { isLoading } = this.state
        
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader_text">Loading...</span>
                    </div>
                ) : (
                    <div className="main">

                        <div className="nickname">
                            <span className="main_header">닉네임</span>
                            <label>
                                <input type="text" placeholder="닉네임" maxLength="20" onChange={this.handleChange}/>
                            </label>
                            <button type="button" className="search main_search_btn" onClick={() => this.getUserData()}>검색</button>
                        </div>

                        <div className="queue">
                            <span className="main_header">구분</span>
                            <label>
                                <input type="radio" name="queue_type" value="" defaultChecked onClick={event => this.clickQueue(event)}/>전체
                            </label>
                            <label>
                                <input type="radio" name="queue_type" value="420" onClick={event => this.clickQueue(event)}/>솔로 랭크
                            </label>
                            <label>
                                <input type="radio" name="queue_type" value="430" onClick={event => this.clickQueue(event)}/>일반
                            </label>
                            <label>
                                <input type="radio" name="queue_type" value="440" onClick={event => this.clickQueue(event)}/>자유 랭크
                            </label>
                            <label>
                                <input type="radio" name="queue_type" value="450" onClick={event => this.clickQueue(event)}/>칼바람
                            </label>
                        </div>

                        <div className="champion_name">
                            <span className="main_header">챔피언</span>
                            <input type="text" placeholder="전체" value={this.state.inputChampionName} readOnly />
                            <button type="button" className="search" onClick={() => this.clearData()}>초기화</button>
                        </div>

                        <div className="consonant">
                            {this.state.consonants.map(consonant => {
                                return (
                                    <span
                                        key={consonant} 
                                        onClick={() => this.getChampionsByConsonant(consonant)}
                                    >{consonant}
                                    </span>
                                )
                            })}
                        </div>

                        <div className="champions">    
                            {this.state.exposedChampions.map(champion => (
                                <Champion 
                                    key={parseInt(champion.key)}
                                    number={parseInt(champion.key)}
                                    id={champion.id}
                                    name={champion.name}
                                    image={champion.image.full}
                                    clickHandler={() => this.clickChampion(champion.name, champion.key)}
                                />
                            ))}
                        </div>

                        {this.state.modal && !this.state.progress ? (
                            <ModalPortal>
                                <Modal 
                                    onClose={this.handleCloseModal}
                                    champions={this.state.champions}
                                    summonerSpells={this.state.summonerSpells}
                                    runes={this.state.runes}
                                    matchDetailArray={this.state.matchDetailArray}
                                    userProfile={this.state.userProfile}
                                    progress={false}
                                />
                            </ModalPortal>
                        ) : ""}
                        {this.state.modal && this.state.progress ? (
                            <ModalPortal>
                                <Modal progress={true}/>
                            </ModalPortal>
                        ) : ""}

                    </div>
                )}
                
            </section>
        )

    }

    componentDidMount() {
        this.setChampions()
        this.setSummonerSpells()
        this.setRunes()
        this.setState({isLoading: false})
    }

}

export default Search