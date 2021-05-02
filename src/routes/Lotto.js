import React from "react"
import "./Lotto.css"
import axios from "axios"
import keys from "../keys.json"
import PickNumbers from "../components/PickNumbers"

class Lotto extends React.Component{

    state = {
        isLoading: true,
        winData: {},
        allNumbers: [],
        pickNumbersArray: [],
        favoriteNumbers: [],
        favoriteCss: {display: "none"},
        hateNumbers: [],
        hateCss: {display: "none"}
    }

    getWinData = async () => {
        await axios.get(`${keys.middleware}/lotto/recent`)
        .then(res => {
            // console.log(res.data)
            this.setState({winData: res.data})
            this.setState({isLoading: false})
        })
    }

    setAllNumbers = () => {
        let arr = []
        for(let i=1; i<=45; i++){
            arr.push(i)
        }
        this.setState({ allNumbers: arr})
    }

    getRandomNumbers = count => {

        if(typeof count === "undefined" || count < 1) return

        let selected
        let refinedNumbers
        let tmpNumbers
        let selectedNumbers

        let tmpPickNumbersArray = []
        let randomPickCount = 6

        refinedNumbers = [...this.state.allNumbers]

        // 넣고싶은 번호가 있을 때
        if(this.state.favoriteNumbers.length > 0) {
            randomPickCount -= this.state.favoriteNumbers.length
            this.state.favoriteNumbers.forEach(item => {
                this.deleteNumber(refinedNumbers, item)
            })
        }

        // 넣기싫은 번호가 있을 때
        if(this.state.hateNumbers.length > 0) {
            this.state.hateNumbers.forEach(item => {
                this.deleteNumber(refinedNumbers, item)
            })
        }

        for(let i=0; i<count; i++){

            tmpNumbers = [...refinedNumbers]
            selectedNumbers = [...this.state.favoriteNumbers]

            for(let i=0; i<randomPickCount; i++){
                selected = Math.floor(Math.random()*tmpNumbers.length)
                selectedNumbers.push(tmpNumbers.splice(selected,1)[0])
            }
            
            // console.log(selectedNumbers.sort((a,b) => a-b))
            tmpPickNumbersArray.push(selectedNumbers.sort((a,b) => a-b))
            
        }

        this.setState({ pickNumbersArray: tmpPickNumbersArray})
        
    }

    deleteNumber = (array, number) => {
        array.splice(array.indexOf(parseInt(number)),1)
    }

    handleClickOutside = event => {

        // console.log(event.target.parentNode.className)

        if( !(["favorite_popup","hate_popup"].includes(event.target.parentNode.className) || event.target.className === "reset" ) ){
            this.setState({ favoriteCss: {display: "none"}})
            this.setState({ hateCss: {display: "none"}})
        }

    }    

    openPopup = (cssName, css) => {
        this.setState({ [cssName]: {display: css.display === "grid" ? "none" : "grid"}})
    }

    resetPopupNumbers = (arrayName) => {
        this.setState({ [arrayName]: []})
    }

    setPopupNumbers = (e, array, oppositeArray, arrayName) => {

        if(e.target.innerText.length > 2){
            alert("잘못된 선택입니다")
            return
        }
        
        const num = e.target.innerText

        if(array.includes(num) || oppositeArray.includes(num)) {
            alert("이미 선택한 번호입니다")
            return
        }

        if(array.length >= 5){
            alert("최대 5개까지 선택할 수 있습니다")
            return
        }

        this.setState({ [arrayName]: [...array, num] })
        
    }

    getNumberColor = number => {
        if(number <= 10) return "yellow"
        else if(number <= 20) return "blue"
        else if(number <= 30) return "red"
        else if(number <= 40) return "gray"
        else return "green"
    }

    render() {
        const { isLoading, winData, allNumbers, favoriteNumbers, favoriteCss, hateNumbers, hateCss, pickNumbersArray } = this.state
        return (
            <section className="container">
                {isLoading ? (
                    <div></div>
                ) : (
                <div className="main">

                    <div className="recent">
                        <span className="bigger"><span className="round">{winData.drwNo}</span>회차 당첨번호</span><br/>
                        <span className="smaller">({winData.drwNoDate})</span>
                    </div>

                    <div className="win_numbers">
                        <div className={this.getNumberColor(winData.drwtNo1)}>{winData.drwtNo1}</div>
                        <div className={this.getNumberColor(winData.drwtNo2)}>{winData.drwtNo2}</div>
                        <div className={this.getNumberColor(winData.drwtNo3)}>{winData.drwtNo3}</div>
                        <div className={this.getNumberColor(winData.drwtNo4)}>{winData.drwtNo4}</div>
                        <div className={this.getNumberColor(winData.drwtNo5)}>{winData.drwtNo5}</div>
                        <div className={this.getNumberColor(winData.drwtNo6)}>{winData.drwtNo6}</div>
                        <div className="white">+</div>
                        <div className={this.getNumberColor(winData.bnusNo)}>{winData.bnusNo}</div>
                    </div>

                    <div className="custom_numbers">
                        <div className="custom">
                            <div className="favorite">
                                <span>넣고싶은 번호</span><br/>
                                <input type="text" value={favoriteNumbers.join(", ")} readOnly onClick={() => this.openPopup("favoriteCss", favoriteCss)}/>
                                <button type="button" className="reset" onClick={() => this.resetPopupNumbers("favoriteNumbers")}>초기화</button>
                            </div>
                            <div className="favorite_popup prevent_drag" onClick={(e) => this.setPopupNumbers(e, favoriteNumbers, hateNumbers, "favoriteNumbers")} style={favoriteCss}>
                                { allNumbers.map((item, idx) => (<div key={idx}>{item}</div>)) }
                            </div>

                            <div className="hate">
                                <span>넣기싫은 번호</span><br/>
                                <input type="text" value={hateNumbers.join(", ")} readOnly onClick={() => this.openPopup("hateCss", hateCss)}/>
                                <button type="button" className="reset" onClick={() => this.resetPopupNumbers("hateNumbers")}>초기화</button>
                            </div>
                            <div className="hate_popup prevent_drag" onClick={(e) => this.setPopupNumbers(e, hateNumbers, favoriteNumbers, "hateNumbers")} style={hateCss}>
                                { allNumbers.map((item, idx) => (<div key={idx+50}>{item}</div>)) }
                            </div>

                        </div>
                        <div className="buttons">
                            <button type="button" onClick={() => this.getRandomNumbers(1)}>1개</button>
                            <button type="button" onClick={() => this.getRandomNumbers(5)}>5개</button>
                            <button type="button" onClick={() => this.getRandomNumbers(10)}>10개</button>
                        </div>
                        <div className="numbers">
                            {pickNumbersArray.map((pickNumbers, index) => (
                                <PickNumbers key={index} pickNumbers={pickNumbers} />
                            ))}
                        </div>
                        
                    </div>

                </div>
                )}
            </section>

        )
        
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside, true)
        this.getWinData()
        this.setAllNumbers()
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true)
    }

}

export default Lotto