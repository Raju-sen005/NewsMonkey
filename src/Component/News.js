import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  "articles"= [
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=72e42601c3954e76bccde1267f97afc2&page=1pageSize=20";
    let data = await fetch(url);
    let paresdData = await data.json();
    console.log(paresdData);
    this.setState({
      articles: paresdData.articles,
      totalResults: paresdData.totalResults,
    });
  }

  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=72e42601c3954e76bccde1267f97afc2&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let paresdData = await data.json();
      console.log(paresdData);
      this.setState({
        page: this.state.page + 1,
        articles: paresdData.articles,
      });
    }
  };
  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=72e42601c3954e76bccde1267f97afc2&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let paresdData = await data.json();
    console.log(paresdData);
    this.setState({
      page: this.state.page - 1,
      articles: paresdData.articles,
    });
  };
  render() {
    return (
      <div className="container my-4">
        <h1>NewsMonkey - Top Headline</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 44) : ""}
                  description={
                    element.description ? element.description.slice(0, 65) : ""
                  }
                  imageUrl={element.urlToImage}
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="contain d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
