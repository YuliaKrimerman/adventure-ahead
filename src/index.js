import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App/App';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

 const LoadingIndicator = props => {
	 const { promiseInProgress } = usePromiseTracker();
   return (
	   promiseInProgress && 
     <div
      style={{
        width: "100%",
        height: "100",
	  	position:"fixed",
	   	top:"50%",
	   	left:"50%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="TailSpin" color="#94C5D6" height="100" width="100" />
    </div>
  );  
 }
 
ReactDOM.render(
	<BrowserRouter>
	<LoadingIndicator/>
     <App />
	
   </BrowserRouter>, document.getElementById('root'));
