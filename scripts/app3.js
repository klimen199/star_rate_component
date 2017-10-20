class Star extends React.Component{
    constructor(props){
        super(props);
        this.getIndex = this.getIndex.bind(this);
    }
    getIndex(){
        this.props.change(this.props.ind+1);
        this.props.getRate(this.props.ind+1)
    }
    render(){
        let classes = 'star ' + (this.props.select?'selected':'');
        return <li className={classes} onClick={this.getIndex}/>
    }
}


class RateMaking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rate: 0,
            clicked:false
        };
        this.changeRate = this.changeRate.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(val){
        this.props.change(val);
    }
    changeRate(newRate) {
        this._submitRate(newRate);
        this.setState((prev) => {
            return {rate:newRate}
        })
    }
    _submitRate(rate){
        let a = rate;
        (function () {
            let k = a+'star';
            if(window.localStorage[k] == undefined){
                window.localStorage[k] = 1;
            }
            else{
                let val = parseInt(window.localStorage[k]);
                window.localStorage[k] = ++val;
            }
        })();
    }
    render(){
        let active = [],
            inactive = [],
            i;
        const actNum = this.state.rate,
            starNum = this.props.starNum;
        for (i =0; i < actNum;i++){
            active.push(<Star ind={i}
                              select={true}
                              change = {this.onChange}
                              getRate={this.changeRate}/>);
        }
        for(i =actNum; i < starNum; i++){
            inactive.push(<Star ind={i}
                                select={false}
                                change = {this.onChange}
                                getRate={this.changeRate}/>);
        }
        return(
            <div className="container" >
                <ul className="stars">
                    {active}
                    {inactive}
                </ul>
            </div>
        )
    }
}





class HistogramLine extends React.Component{
    constructor(props){
        super(props);
        this.getScaleStyle = this.getScaleStyle.bind(this)
    }
    getScaleStyle(){
        let barWidth;
        if(document.getElementsByClassName('rateIndicatorBack')[0] != undefined){
            let indicatorBar = document.getElementsByClassName('rateIndicatorBack')[0];
            barWidth = getComputedStyle(indicatorBar).width.slice(0,-2);
        }
        else{
            barWidth = 140;
        }
        return (barWidth * parseInt(this.props.vNum) /parseInt(this.props.maxVotes));
    }
    render(){
        return (
            <div className="histogramLine">
                <div className="histogramTitle">{this.props.title} Stars</div>
                <div className="histogramRate">
                    <div className="rateNumber">{this.props.vNum}</div>
                    <div className="rateIndicatorBack">
                        <div className="rateIndicatorBar" style={{width:this.getScaleStyle()}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

class RateHistogram extends React.Component{
    constructor(props){
        super(props);
        this.state={
            histInfo: [],
            newStarIndex: 0
        };
        this.checkForChange = this.checkForChange.bind(this);
        this.getMaxVoteNum = this.getMaxVoteNum.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({newStarIndex:nextProps.newStarIndex});
        this.checkForChange(nextProps.newStarIndex);
    }
    checkForChange(index){
        if (index!=0){
            let curState = this.state.histInfo;
            curState[index-1].votesNum = parseInt(curState[index-1].votesNum)+1;
            this.setState({histInfo:curState})
        }
    }
    componentWillMount(){
        let arr = [],
            i;
        for (i=0; i<this.props.starNum;i++){
            arr.push({
                title:i+1,
                votesNum:(window.localStorage[(i+1)+'star']||0)
            })
        }
        this.setState({histInfo:arr});
        this.checkForChange(this.state.newStarIndex)
    }
    getMaxVoteNum(){
        let maxVotes = 0;
        this.state.histInfo.forEach((el,i) =>{
            if(parseInt(el.votesNum) > maxVotes){
                maxVotes = el.votesNum;
            }
        });
        return maxVotes;
    }
    render(){
        let hists = [],
            i,
            maxVotes = this.getMaxVoteNum();
        hists = this.state.histInfo.map((el, i) =>
        {
            return <HistogramLine key={i}
                                  vNum = {parseInt(el.votesNum) || 0}
                                  maxVotes = {maxVotes}
                                  title={el.title}/>;
        });
        return (
            <div>
                <h2>Histograms</h2>
                {hists.reverse()}
            </div>
        )
    }
}




class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            starNum:5,
            newStarIndex: 0
        };
        this.onChange = this.onChange.bind(this)
    }
    onChange(val){
        this.setState({newStarIndex: val});     //сделать правильно
    }
    render(){
        return (
            <div>
                <RateMaking starNum={this.state.starNum}
                            change={this.onChange} />
                <br/>
                <RateHistogram starNum={this.state.starNum}
                               newStarIndex={this.state.newStarIndex}/>
            </div>

        )
    }
}



let place = document.getElementById('root');

ReactDOM.render(<App/>,place);

