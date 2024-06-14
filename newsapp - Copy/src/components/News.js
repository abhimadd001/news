import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  
  constructor() {
    super();
    console.log("hello this is constructor");
    this.state = ({
      articles: [],
      loading: false,
      page:1
      
    });
  }
  async updatenews(){
   let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9ff5f76e76dd4dd1b5842a5ec8b7fa3c&page=${this.state.page}&pageSize=11`;
  this.setState({loading:true});
	 let data = await fetch(url);
	 let parsedData = await data.json()
	 console.log(parsedData);
	 this.setState({articles:parsedData.articles ,totalResults: parsedData.totalResults});
  }
  async componentDidMount(){ 
	 console.log("news");
	 let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=9ff5f76e76dd4dd1b5842a5ec8b7fa3c&page=1&pageSize=10";
   this.setState({loading:true});
	 let data = await fetch(url);
	 let parsedData = await data.json()
	 console.log(parsedData);
	 this.setState({articles:parsedData.articles ,totalResults: parsedData.totalResults,loading:false});
  }
  handlePrevClick =async()=>{
    this.setState({page:this.state.page - 1 ,loading:false})
    this.updatenews();
  }
  handleNextClick =async()=>{
    this.setState({page:this.state.page  +1,loading:false})
    this.updatenews();
  }
 /*  handlePrevClick = async()=>{
    let url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9ff5f76e76dd4dd1b5842a5ec8b7fa3c&page=${this.state.page -1}&pageSize=10`;
    let data= await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState=({
          page: this.state.page - 1,
          articles: parsedData.articles
    })
  };
  handleNextClick = async()=>{
    console.log("cdm");
   if(this.state.page + 1> Math.ceil(this.state.totalResults/10)){

   }
   else{
    let url=`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9ff5f76e76dd4dd1b5842a5ec8b7fa3c&page=${this.state.page +1}&pageSize=10`;
	  let data= await fetch(url);
	  let parsedData=await data.json()
	  console.log(parsedData);
	//this.setState({articles:parsedData.articles})
    this.setState=({
        page:this.state.page  + 1,
        articles:parsedData.articles,
      }
)
   }
	
  }; */
  render() {
    return (
      <>
        <div className="container my-3">
			<div className="headlines-my-3">
			<h2>News-top headlines</h2>
      {this.state.loading &&<spinner/>}
      
			</div>
          

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title?element.title.slice(0, 45):""}
                    description={element.description?element.description.slice(0, 88):""}
                    imgurl={element.urlToImage}
					          newsUrl={element.url}
                  />
                </div>
                
              );
            })}
          </div>
          <div className="container d-flex justify-content-between my-3">
            <button type="button"  disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
            <button type="button"  disabled={this.state.page + 1> Math.ceil(this.state.totalResults/11 )} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
