class Star extends React.Component{
    constructor(props){
        super(props);
        this.testWork = this.testWork.bind(this);
    }
    testWork(){

    }
    render(){
        return <li className="star" />
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
    actionInfo() {
        this.star2.testWork(); // Как получить объект, по которому был совершен клик?
    }
    render(){



        let ar = [1,2,3,4,5];
        let newar = ar.map((el, ind)=>{
            let ke = 'star'+i;
            return <Star key={i} ref={(el) => {this[ke] = el}}/>
        });






        return(
            <div className="container" >

                <ul className="stars" onClick={this.actionInfo}>
                    <Star ind={1} ref={(el) => {this.star1 = el}}/>
                    <Star ind={2} ref={(el) => {this.star2 = el}}/>
                    <Star ind={3} ref={(el) => {this.star3 = el}}/>
                    <Star ind={4} ref={(el) => {this.star4 = el}}/>
                    <Star ind={5} ref={(el) => {this.star5 = el}}/>
                </ul>
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


let place = document.getElementById('root');

ReactDOM.render(<App/>,place);

