import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call, signout } from "./service/ApiService"
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items : [
        // {id : 0, title: "Hello World 1", done : true}
        // ,{id : 1, title: "Hello World 2", done : false}
      ],
      loading: true,
    }
  }

  // (1) 함수 추가
  add = (item) => {
    /*
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; // key를 위한 id추가
    item.done = false; // done 초기화
    thisItems.push(item); // 리스트에 아이템 추가
    this.setState({ items : thisItems }); // 업데이트는 반드시 this.setState로 해야됨
    console.log("items : ", this.state.items );
    */
    call("/todo", "POST", item).then((response) => 
      this.setState({ items : response.data })
    );
  }

  // 삭제 함수 추가
  delete = (item) => {
    /*
    const thisItems = this.state.items;
    console.log("Before Update Items : ", this.state.items);
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems } , () => {
      console.log("Update Items : ", this.state.items);
    });
    */
    call("/todo", "DELETE", item).then((response) => 
      this.setState({ items : response.data })
    );
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) => 
    this.setState({ items : response.data })
  );
  }

  componentDidMount() {
    // const requestOptions = {
    //   method : "GET",
    //   headers : { "Content-Type" : "application/json"},
    // };

    // fetch("http://localhost:8080/todo", requestOptions)
    // .then((response) => response.json())
    // .then(
    //   (response) => {
    //     this.setState({
    //       items: response.data,
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       error,
    //     });
    //   }
    // );

    call("/todo", "GET", null).then((response) =>
      this.setState({items:response.data, loading: false})
    );

  }

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin : 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    /* 네비게이션 바 */
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    /* 로딩 중이 아닐 때 렌더링할 부분*/
    var todolistPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    /* 로딩 중일 때 렌더링할 부분 */
    var loadingPage = <h1> 로딩중 ... </h1>
    
    var content = loadingPage;

    if(!this.state.loading){
      content = todolistPage;
    }

    return <div className="App"> {content} </div>
    
  };
}

export default App;