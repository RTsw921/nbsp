import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash'
import Table from './Table/Table'
import TableSearch from './TableSearch/TableSearch'
import Loader from './Loader/Loader'
import DetailRowWiev from './DetailRowView/DetailRowWiev'
import ModeSelector from './ModelSelector/ModeSelector'
class App extends Component {
  state={
    isModeSeleced:false,
    isLoading:false,
    data:[],
    sort:'asc',
    search:'',
    sortField:'id',
    row:null,
    arrow:'↑',
    abc:'a-z',
    currentPage:0,
    el:''
  }
  async fetchData(url){
    const response = await fetch(url)
    const data = await response.json();
    this.setState({
      isLoading:false,
      data: _.orderBy(data,this.state.sortField,this.state.sort)
    })
  }
  onSort = sortField =>{
    const clonedData = this.state.data.concat();
    const sort = this.state.sort === 'asc'?'desc':'asc'
    const arrow = this.state.sort === 'asc' ? this.setState({arrow:'↑'}):this.setState({arrow:'↓'})
    const abc = this.state.sort === 'asc' ? this.setState({abc:'z-a'}):this.setState({abc:'a-z'})
    const data = _.orderBy(clonedData,sortField,sort)
    this.setState({data,sort,sortField})
  }
  modeSelectHandler = url =>{
    this.setState({
      isModeSeleced:true,
      isLoading:true
    })
    this.fetchData(url)
  }
  onRowSelect = row =>{
    this.setState({row})
  }
  PageChangeHandler = ({selected}) =>{
    this.setState({currentPage:selected})
  }
  searchHandler = search =>{
    this.setState({search,currentPage:0})
  }
  getFilteredData(){
    const {data,search}=this.state
    if(!search){
      return data
    }
    return data.filter(item=>{
      return (item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
      || item['phone'].toLowerCase().includes(search.toLowerCase())
    )})
  }
    render() {
    const datal= this.state.data.length
    const pageSize= 50
    if(!this.state.isModeSeleced){
      return (
        <div className='container'>
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
    const filteredData = this.getFilteredData()
    const pageCount = Math.ceil(filteredData.length/pageSize)
    const displayData = _.chunk(filteredData,pageSize)[this.state.currentPage]
    if(filteredData.length<1){
      return <div><Loader/><div style={{marginTop:'90vh'}}>Возможно такого элемента нет<br/><a href='http://localhost:3000/'>Пробовать снова</a></div></div> 
     }
    return (
      <div className="container">
        {
          this.state.isLoading
           ? <Loader/>
           : <React.Fragment>
           <TableSearch onSearch={this.searchHandler}/>
           <Table
           data={displayData}
           onSort={this.onSort}
           sort={this.state.sort}
           arrow={this.state.arrow}
           abc={this.state.abc}
           sortField={this.state.sortField}
           onRowSelect={this.onRowSelect}
           />
           </React.Fragment>
        }
        {
            datal > pageSize 
          ?   
          <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.PageChangeHandler}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          forcePage={this.state.currentPage}
          /> 
          : null
        }
        {
          this.state.row
           ? <DetailRowWiev person={this.state.row}/>
           : null
        }
      </div>
    );
  }
}

export default App;
