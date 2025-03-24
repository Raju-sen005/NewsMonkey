import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "genral",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async UpdateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72e42601c3954e76bccde1267f97afc2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({ loading: true });
    let paresdData = await data.json();
    console.log(paresdData);
    this.setState({
      articles: paresdData.articles,
      totalResults: paresdData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.UpdateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72e42601c3954e76bccde1267f97afc2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let paresdData = await data.json();
    console.log(paresdData);
    this.setState({
      articles: this.state.articles.concat(paresdData.articles),
      totalResults: paresdData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headline
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles?.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles &&
                this.state.articles.map((element, index) => {
                  return (
                    <div
                      className="col-md-4"
                      key={element.url ? element.url + index : index}
                    >
                      <NewsItem
                        title={element.title ? element.title.slice(0, 44) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 65)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
