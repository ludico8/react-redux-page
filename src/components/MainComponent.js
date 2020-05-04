import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';   // Uncomment this line if you have an API to fetch data.

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

// Use following mapDispatchToProps if you have a valid Node API to fetch data
// const mapDispatchToProps = dispatch => ({
//   addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
//   fetchDishes: () => { dispatch(fetchDishes())},
//   resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
//   fetchComments: () => dispatch(fetchComments()),
//   fetchPromos: () => dispatch(fetchPromos()),
//   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
// });

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();

    // Use the following lines to fetch data if you have a valid Node API to fetch data.
    // this.props.fetchDishes();
    // this.props.fetchComments();
    // this.props.fetchPromos();
  }

  render() {
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment} />
        
        //  Use the next DishDetail component version if you have a valid NODE API to fetch data.
        // <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        //   isLoading={this.props.dishes.isLoading}
        //   errMess={this.props.dishes.errMess}
        //   comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        //   commentsErrMess={this.props.comments.errMess}
        //   addComment={this.props.addComment},
        //   postComment={this.props.postComment}
        // />
      );
    };

    // Way #1 to supply a component.
    const HomePage = () => {
      return(
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]} />

        // Use the next Home component version if you have a valid NODE API to fetch data.
        // <Home 
        //   dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        //   dishesLoading={this.props.dishes.isLoading}
        //   dishErrMess={this.props.dishes.errMess}
        //   promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        //   promoLoading={this.props.promotions.isLoading}
        //   promoErrMess={this.props.promotions.errMess}
        //   leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        // />
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />     {/*  // Way #2 to supply a component. */}
              {/* <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} /> */}
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));