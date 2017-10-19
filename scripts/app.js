class StarInactive extends React.Component{
    render(){
        return <li className="star"> </li>
    }
}
class StarActive extends React.Component{
    render(){
        return <li className="star selected"> </li>
    }
}
class RateMaking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            starNum: 5,
            rate: 0,
            clicked:false
        };
        this.actionInfo = this.actionInfo.bind(this);
    }
    actionInfo(e) {
        const type = e.type;
        if(!this.state.clicked || type == 'click'){
            if(type == 'click')
                this.setState({clicked:true});
            const selectedStar = $('.stars .star').index($(e.target))+1;
            this.setState({rate:selectedStar});
        }
    }
    render(){
        let active = [],
            inactive = [],
            i;
        const actNum = this.state.rate,
            inactNum = this.state.starNum - this.state.rate;
        for (i =0; i < actNum;i++){
            active.push(<StarActive/>);
        }
        for(i =0; i < inactNum; i++){
            inactive.push(<StarInactive/>);
        }
        return(
            <div className="container" >
                <ul className="stars" onClick={this.actionInfo} onMouseMove={this.actionInfo}>
                    {active}
                    {inactive}
                </ul>
                <p>lol</p>
                <input type="text" />
            </div>
        )
    }
}

class RateHistogram extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                histogram
            </div>
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <RateMaking />
                <br/>
                <RateHistogram />
            </div>

        )
    }
}


class App2 extends React.Component {
    constructor() {
        super();
        this.state = {items: [1, 2, 3, 4, 5]};

        this.deleteItem = this.deleteItem.bind(this)
    }
    deleteItem(ind) {
        let that = this;
        return function () {
            that.state.items.splice(ind,1);
            that.setState({items: that.state.items});
        }

    }
    render() {
        const list = this.state.items.map((item, index) => {
            return <li key={index}>
                {item}
                <button onClick={this.deleteItem(index)}>
                    удалить{item}
                </button>
            </li>;
        });
        return (<div>
                    <ul>
                        {list}
                    </ul>
                </div>
        );
    }
}




let place = document.getElementById('root');

ReactDOM.render(<App/>,place);

