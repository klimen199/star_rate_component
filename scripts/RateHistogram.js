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
        return (barWidth * parseInt(this.props.votesNum) /parseInt(this.props.maxVotes));
    }
    render(){
        return (
            <div className="histogramLine">
                <div className="histogramTitle">{this.props.title} Stars</div>
                <div className="histogramRate">
                    <div className="rateNumber">{this.props.votesNum}</div>
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
                votesNum:window.localStorage[(i+1)+'star']
            })
        }
        this.setState({histInfo:arr});
        this.checkForChange(this.state.newStarIndex)
    }
    getMaxVoteNum(){
        let maxVotes = 0;
        console.log(this.state.histInfo.length + ' len');
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
                                  votesNum = {parseInt(el.votesNum) || 0}
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
