import { Component } from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
       fetch("https://api.imgflip.com/get_memes")
       .then(response => response.json())
       .then(response => {
           const {memes} = response.data
           this.setState({
               allMemeImgs: memes
           })
       })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.allMemeImgs)
        //generate a random index from the allMemeImgs array:
        const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length);
        //extract the URL from the index:
        const randomURL = this.state.allMemeImgs[randomIndex].url;
        this.setState({
            randomImg: randomURL
         })
    }

    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        id="top" 
                        value={this.state.topText} 
                        placeholder="Top Text" 
                        onChange={this.handleChange} 
                    />
                    <input 
                        type="text"  
                        name="bottomText" 
                        id="bottom" 
                        value={this.state.bottomText} 
                        placeholder="Bottom Text" 
                        onChange={this.handleChange} 
                    />
                    <button>Change Image</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="randomImg"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>    
                </div>   
            </div>
        )
    }
}

export default MemeGenerator