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
        function modifyRate(key) {
            let k = key+'star';
            if(window.localStorage[k] == undefined){
                window.localStorage[k] = 1;
            }
            else{
                let val = parseInt(window.localStorage[k]);
                window.localStorage[k] = ++val;
            }
        }
        switch (rate){
            case 1:{
                modifyRate(1);
                break;
            }
            case 2:{
                modifyRate(2);
                break;
            }
            case 3:{
                modifyRate(3);
                break;
            }
            case 4:{
                modifyRate(4);
                break;
            }
            case 5:{
                modifyRate(5);
                break;
            }
        }
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
